import { createRef } from 'react';

import { update } from '../../src/rAF';
import type { StatefulAnimatingElement } from '../../src/animation';
import { entity as Entity } from '../../src/forces';

describe('update', () => {
  const animatingElements = new Set<
    StatefulAnimatingElement<Record<string, unknown>, HTMLElement>
  >();

  const baseElement: StatefulAnimatingElement<
    Record<string, unknown>,
    HTMLElement
  > = {
    ref: createRef(),
    config: {},
    onUpdate: jest.fn(),
    onComplete: jest.fn(),
    state: {
      mover: {
        position: [0, 0],
        velocity: [0, 0],
        acceleration: [0, 0],
        mass: 10,
      },
      playState: 'forward',
      maxDistance: 50,
      complete: false,
      paused: false,
      delayed: false,
      repeatCount: 0,
    },
  };

  afterEach(() => {
    animatingElements.clear();
    jest.clearAllMocks();
  });

  it('should return an updater function to be run inside of rAF', () => {
    animatingElements.add(baseElement);

    const result = update({
      animatingElements,
      checkReversePlayState: jest.fn(),
      applyForceForStep: jest.fn(),
      checkStoppingCondition: jest.fn(),
    });

    expect(typeof result).toBe('function');
  });

  it.each([[{ complete: true }], [{ delayed: true }], [{ paused: true }]])(
    'should ignore elements with state %o',
    (
      state: Partial<
        StatefulAnimatingElement<Record<string, unknown>, HTMLElement>['state']
      >
    ) => {
      const element: StatefulAnimatingElement<
        Record<string, unknown>,
        HTMLElement
      > = {
        ...baseElement,
        state: {
          ...baseElement.state,
          ...state,
        },
      };

      animatingElements.add(element);

      const checkReversePlayState = jest.fn();
      const applyForceForStep = jest.fn();
      const checkStoppingCondition = jest.fn();
      const stop = jest.fn();

      const loop = update({
        animatingElements,
        checkReversePlayState,
        applyForceForStep,
        checkStoppingCondition,
      });

      const timestamp = performance.now();
      // Increment timestamp by (1000 / 60)ms to mimic one frame elapsing
      loop(timestamp + 1000 / 60, timestamp, stop);

      expect(checkReversePlayState).not.toHaveBeenCalled();
      expect(applyForceForStep).not.toHaveBeenCalled();
      expect(checkStoppingCondition).not.toHaveBeenCalled();

      if (state.complete) {
        expect(stop).toHaveBeenCalled();
      }
    }
  );

  it('should check the play state for repeated animations', () => {
    const onUpdate = jest.fn();
    const mockMoverState: Partial<Entity> = {
      velocity: [2, 0],
      position: [5, 0],
      acceleration: [-1.5, -2],
    };

    const element: StatefulAnimatingElement<
      Record<string, unknown>,
      HTMLElement
    > = {
      ...baseElement,
      onUpdate,
      repeat: Infinity,
      state: {
        ...baseElement.state,
        mover: {
          ...baseElement.state.mover,
          ...mockMoverState,
        },
      },
    };

    animatingElements.add(element);

    const checkReversePlayState = jest.fn();
    const applyForceForStep = jest.fn().mockImplementation(() => ({
      ...baseElement.state.mover,
      ...mockMoverState,
    }));
    const checkStoppingCondition = jest.fn();
    const stop = jest.fn();

    const loop = update({
      animatingElements,
      checkReversePlayState,
      applyForceForStep,
      checkStoppingCondition,
    });

    const timestamp = performance.now();
    // Increment timestamp by (1000 / 60)ms to mimic one frame elapsing
    loop(timestamp + 1000 / 60, timestamp, stop);

    expect(checkReversePlayState).toHaveBeenCalledTimes(16);
    expect(applyForceForStep).toHaveBeenCalledTimes(16);
    expect(onUpdate).toHaveBeenCalledTimes(1);
    expect(onUpdate).toHaveBeenCalledWith(mockMoverState);
  });

  it('should call onComplete if the animating element has repeated the specified number of times', () => {
    const onComplete = jest.fn();

    const element: StatefulAnimatingElement<
      Record<string, unknown>,
      HTMLElement
    > = {
      ...baseElement,
      repeat: 2,
      onComplete,
      state: {
        ...baseElement.state,
        mover: {
          ...baseElement.state.mover,
          velocity: [2, 0],
          position: [5, 0],
        },
        repeatCount: 2,
      },
    };

    animatingElements.add(element);

    const checkReversePlayState = jest.fn();
    const applyForceForStep = jest.fn();
    const checkStoppingCondition = jest.fn();
    const stop = jest.fn();

    const loop = update({
      animatingElements,
      checkReversePlayState,
      applyForceForStep,
      checkStoppingCondition,
    });

    const timestamp = performance.now();
    // Increment timestamp by 1000 / 60ms to mimic one frame elapsing
    loop(timestamp + 1000 / 60, timestamp, stop);

    expect(applyForceForStep).toHaveBeenCalledTimes(16);
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(stop).toHaveBeenCalledTimes(1);
  });

  it('should call onComplete if the repeatCount is not a positive integer (invariant)', () => {
    const onComplete = jest.fn();

    const element: StatefulAnimatingElement<
      Record<string, unknown>,
      HTMLElement
    > = {
      ...baseElement,
      repeat: -5,
      onComplete,
      state: {
        ...baseElement.state,
        mover: {
          ...baseElement.state.mover,
          velocity: [2, 0],
          position: [5, 0],
        },
        repeatCount: -1,
      },
    };

    animatingElements.add(element);

    const checkReversePlayState = jest.fn();
    const applyForceForStep = jest.fn();
    const checkStoppingCondition = jest.fn().mockImplementation(() => true);
    const stop = jest.fn();

    const loop = update({
      animatingElements,
      checkReversePlayState,
      applyForceForStep,
      checkStoppingCondition,
    });

    const timestamp = performance.now();
    // Increment timestamp by 1000 / 60ms to mimic one frame elapsing
    loop(timestamp + 1000 / 60, timestamp, stop);

    expect(applyForceForStep).toHaveBeenCalledTimes(16);
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(stop).toHaveBeenCalledTimes(1);
  });

  it('should call onComplete if the animating element has reached its stopping condition', () => {
    const onComplete = jest.fn();

    const element: StatefulAnimatingElement<
      Record<string, unknown>,
      HTMLElement
    > = {
      ...baseElement,
      onComplete,
      state: {
        ...baseElement.state,
        mover: {
          ...baseElement.state.mover,
          velocity: [2, 0],
          position: [5, 0],
        },
      },
    };

    animatingElements.add(element);

    const checkReversePlayState = jest.fn();
    const applyForceForStep = jest.fn();
    const checkStoppingCondition = jest.fn().mockImplementation(() => true);
    const stop = jest.fn();

    const loop = update({
      animatingElements,
      checkReversePlayState,
      applyForceForStep,
      checkStoppingCondition,
    });

    const timestamp = performance.now();
    // Increment timestamp by 1000 / 60ms to mimic one frame elapsing
    loop(timestamp + 1000 / 60, timestamp, stop);

    expect(checkReversePlayState).not.toHaveBeenCalled();
    expect(applyForceForStep).toHaveBeenCalledTimes(16);
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(stop).toHaveBeenCalledTimes(1);
  });

  it('should not apply the force if more than four frames have been dropped', () => {
    animatingElements.add(baseElement);

    const applyForceForStep = jest.fn();

    const loop = update({
      animatingElements,
      checkReversePlayState: jest.fn(),
      applyForceForStep,
      checkStoppingCondition: jest.fn(),
    });

    const timestamp = performance.now();
    loop(timestamp + 65, timestamp, jest.fn());

    expect(applyForceForStep).not.toHaveBeenCalled();
  });
});
