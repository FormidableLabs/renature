import { createRef } from 'react';

import {
  AnimatingElement,
  StatefulAnimatingElement,
  AnimationCallbacks,
  PlayState,
} from '../../src/animation';
import { group } from '../../src/animation/group';
import * as updater from '../../src/rAF/update';

describe('group', () => {
  const baseState: StatefulAnimatingElement<
    Record<string, unknown>,
    HTMLElement
  >['state'] = {
    mover: {
      position: [0, 0],
      velocity: [0, 0],
      acceleration: [0, 0],
      mass: 10,
    },
    playState: PlayState.Forward,
    maxDistance: 50,
    complete: false,
    paused: false,
    delayed: false,
    repeatCount: 0,
  };

  const baseElement: AnimatingElement<Record<string, unknown>, HTMLElement> = {
    ref: createRef(),
    config: {},
    onUpdate: jest.fn(),
    onComplete: jest.fn(),
  };

  const mockCallbacks: AnimationCallbacks<Record<string, unknown>> = {
    checkReversePlayState: jest.fn(),
    checkStoppingCondition: jest.fn(),
    applyForceForStep: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a group of animating elements and return functions for starting, stopping, and pausing the animation group', () => {
    const mockElements: AnimatingElement<
      Record<string, unknown>,
      HTMLElement
    >[] = new Array(3).fill(baseElement);

    const mockInitialState = jest.fn(() => baseState);

    const { start, stop, pause, elements } = group(
      mockElements,
      mockInitialState,
      mockCallbacks
    );

    expect(mockInitialState).toHaveBeenCalledTimes(3);
    expect(typeof start).toBe('function');
    expect(typeof stop).toBe('function');
    expect(typeof pause).toBe('function');

    expect(elements).toHaveLength(3);
    expect(elements.every(({ state }) => state === baseState)).toBe(true);
  });

  it('should modify the delayed state of an element after its delay timeout has elapsed', () => {
    jest.useFakeTimers();

    const mockElements: AnimatingElement<
      Record<string, unknown>,
      HTMLElement
    >[] = new Array(3).fill(undefined).map((_, i) => ({
      ...baseElement,
      delay: (i + 1) * 1000,
    }));

    const mockInitialState = jest.fn(
      (element: AnimatingElement<Record<string, unknown>, HTMLElement>) => ({
        ...baseState,
        delayed: (element.delay && element.delay > 0) || false,
      })
    );

    const { elements } = group(mockElements, mockInitialState, mockCallbacks);

    expect(elements.every(({ state: { delayed } }) => delayed === true)).toBe(
      true
    );

    // Advance time by 1 second.
    jest.advanceTimersByTime(1000);

    // The first element should no longer be delayed, but remaining elements should.
    expect(elements[0].state.delayed).toBe(false);
    expect(
      elements.slice(1).every(({ state: { delayed } }) => delayed === true)
    ).toBe(true);

    // Advance time by 1 second.
    jest.advanceTimersByTime(1000);

    // The first two elements should no longer be delayed, but the remaining element should.
    expect(
      elements.slice(0, 2).every(({ state: { delayed } }) => delayed === false)
    ).toBe(true);
    expect(elements[2].state.delayed).toBe(true);

    // Advance time by 1 second.
    jest.advanceTimersByTime(1000);

    // All elements should no longer be marked as delayed.
    expect(elements.every(({ state: { delayed } }) => delayed === false)).toBe(
      true
    );

    jest.useRealTimers();
  });

  it('should return a start function that starts the frameloop', () => {
    const requestAnimationFrameSpy = jest.spyOn(
      window,
      'requestAnimationFrame'
    );

    const mockElements: AnimatingElement<
      Record<string, unknown>,
      HTMLElement
    >[] = new Array(3).fill(baseElement);

    const mockInitialState = jest.fn(() => baseState);

    const { start } = group(mockElements, mockInitialState, mockCallbacks);

    start();

    expect(requestAnimationFrameSpy).toHaveBeenCalled();
  });

  it('should mark all initially paused elements as unpaused if called with the isImperativeStart flag', () => {
    const requestAnimationFrameSpy = jest.spyOn(
      window,
      'requestAnimationFrame'
    );

    const mockElements: AnimatingElement<
      Record<string, unknown>,
      HTMLElement
    >[] = new Array(3).fill(baseElement);

    const mockInitialState = jest.fn(() => ({
      ...baseState,
      paused: true,
    }));

    const { start, elements } = group(
      mockElements,
      mockInitialState,
      mockCallbacks
    );

    start({ isImperativeStart: true });

    expect(requestAnimationFrameSpy).toHaveBeenCalled();
    expect(elements.every(({ state: { paused } }) => paused === false)).toBe(
      true
    );
  });

  it('should start delayed elements on a delay even when started imperatively', () => {
    jest.useFakeTimers();

    const mockElements: AnimatingElement<
      Record<string, unknown>,
      HTMLElement
    >[] = new Array(3).fill(undefined).map((_, i) => ({
      ...baseElement,
      delay: (i + 1) * 1000,
    }));

    const mockInitialState = jest.fn(
      (element: AnimatingElement<Record<string, unknown>, HTMLElement>) => ({
        ...baseState,
        paused: true,
        delayed: (element.delay && element.delay > 0) || false,
      })
    );

    const { start, elements } = group(
      mockElements,
      mockInitialState,
      mockCallbacks
    );

    expect(
      elements.every(
        ({ state: { paused, delayed } }) => paused === true && delayed === true
      )
    ).toBe(true);

    start({ isImperativeStart: true });

    // All elements should no longer be paused, although some may still be delayed.
    expect(elements.every(({ state: { paused } }) => paused === false)).toBe(
      true
    );

    // Advance time by 1 second.
    jest.advanceTimersByTime(1000);

    // The first element should no longer be delayed, but remaining elements should.
    expect(elements[0].state.delayed).toBe(false);
    expect(
      elements.slice(1).every(({ state: { delayed } }) => delayed === true)
    ).toBe(true);

    // Advance time by 1 second.
    jest.advanceTimersByTime(1000);

    // The first two elements should no longer be delayed, but the remaining element should.
    expect(
      elements.slice(0, 2).every(({ state: { delayed } }) => delayed === false)
    ).toBe(true);
    expect(elements[2].state.delayed).toBe(true);

    // Advance time by 1 second.
    jest.advanceTimersByTime(1000);

    // All elements should no longer be marked as delayed.
    expect(elements.every(({ state: { delayed } }) => delayed === false)).toBe(
      true
    );

    jest.useRealTimers();
  });

  it('should return a pause function that pauses the frameloop', () => {
    const requestAnimationFrameSpy = jest.spyOn(
      window,
      'requestAnimationFrame'
    );
    const cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame');

    const mockElements: AnimatingElement<
      Record<string, unknown>,
      HTMLElement
    >[] = new Array(3).fill(baseElement);

    const mockInitialState = jest.fn(() => baseState);

    const { start, pause } = group(
      mockElements,
      mockInitialState,
      mockCallbacks
    );

    // Start the animation.
    start();
    expect(requestAnimationFrameSpy).toHaveBeenCalled();
    // Pause the animation.
    pause();

    expect(cancelAnimationFrameSpy).toHaveBeenCalledTimes(1);

    // Restart the animation.
    start();
    expect(requestAnimationFrameSpy).toHaveBeenCalled();
    // Pause the animation.
    pause();

    expect(cancelAnimationFrameSpy).toHaveBeenCalledTimes(2);
  });

  it('should return a stop function that stops the frameloop', () => {
    const requestAnimationFrameSpy = jest.spyOn(
      window,
      'requestAnimationFrame'
    );
    const cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame');

    const mockElements: AnimatingElement<
      Record<string, unknown>,
      HTMLElement
    >[] = new Array(3).fill(baseElement);

    const mockInitialState = jest.fn(() => baseState);

    const { start, stop } = group(
      mockElements,
      mockInitialState,
      mockCallbacks
    );

    // Start the animation.
    start();
    expect(requestAnimationFrameSpy).toHaveBeenCalled();
    // Stop the animation.
    stop();

    expect(cancelAnimationFrameSpy).toHaveBeenCalledTimes(1);

    // Restart the animation.
    start();
    expect(requestAnimationFrameSpy).toHaveBeenCalled();
    // Stop the animation.
    stop();

    expect(cancelAnimationFrameSpy).toHaveBeenCalledTimes(2);
  });

  it('should return no-ops for start, stop, and pause and an empty elements array if called with no elements', () => {
    const requestAnimationFrameSpy = jest.spyOn(
      window,
      'requestAnimationFrame'
    );
    const cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame');

    const mockElements: AnimatingElement<
      Record<string, unknown>,
      HTMLElement
    >[] = [];

    const mockInitialState = jest.fn(() => baseState);

    const { start, stop, pause, elements } = group(
      mockElements,
      mockInitialState,
      mockCallbacks
    );

    expect(elements).toHaveLength(0);

    start();
    expect(requestAnimationFrameSpy).not.toHaveBeenCalled();

    pause();
    expect(cancelAnimationFrameSpy).not.toHaveBeenCalled();

    stop();
    expect(cancelAnimationFrameSpy).not.toHaveBeenCalled();
  });

  it('should not start a new frameloop if an active frameloop is in process', () => {
    const requestAnimationFrameSpy = jest.spyOn(
      window,
      'requestAnimationFrame'
    );
    const updateSpy = jest.spyOn(updater, 'update');

    const mockElements: AnimatingElement<
      Record<string, unknown>,
      HTMLElement
    >[] = new Array(3).fill(baseElement);

    const mockInitialState = jest.fn(() => baseState);

    const { start } = group(mockElements, mockInitialState, mockCallbacks);

    start();

    expect(requestAnimationFrameSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalledTimes(1);

    // Call start 10 more times. The update function, which returns the loop
    // function for drawing, should only have been called once if we're reusing
    // the same rAF scope.
    for (let i = 0; i < 10; i++) {
      start();
    }
    expect(updateSpy).toHaveBeenCalledTimes(1);
  });
});
