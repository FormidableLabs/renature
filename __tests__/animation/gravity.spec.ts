import { createRef } from 'react';

import { MockRAF } from '../test-utils/mockRAF';
import {
  AnimatingElement,
  GravityConfig,
  gravityGroup,
} from '../../src/animation';

describe('gravity', () => {
  const baseElement: AnimatingElement<GravityConfig, HTMLElement> = {
    ref: createRef(),
    config: {
      moverMass: 10000,
      attractorMass: 1000000000000,
      r: 7.5,
    },
    onUpdate: jest.fn(),
    onComplete: jest.fn(),
  };

  it('should create a group of animating elements and return functions for starting, stopping, and pausing the animation group', () => {
    const mockElements: AnimatingElement<
      GravityConfig,
      HTMLElement
    >[] = new Array(3).fill(baseElement);

    const { start, stop, pause, elements } = gravityGroup(mockElements);

    expect(typeof start).toBe('function');
    expect(typeof stop).toBe('function');
    expect(typeof pause).toBe('function');

    expect(elements).toHaveLength(3);
  });

  it('should return a start function that starts the frameloop', () => {
    const requestAnimationFrameSpy = jest.spyOn(
      window,
      'requestAnimationFrame'
    );

    const mockElements: AnimatingElement<
      GravityConfig,
      HTMLElement
    >[] = new Array(3).fill(baseElement);

    const { start } = gravityGroup(mockElements);

    start();

    expect(requestAnimationFrameSpy).toHaveBeenCalled();
  });

  it('should apply the gravitational force on each step', () => {
    const mockRAF = new MockRAF();

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(mockRAF.rAF);

    const mockElements: AnimatingElement<
      GravityConfig,
      HTMLElement
    >[] = new Array(3).fill(baseElement);

    const { start, elements } = gravityGroup(mockElements);

    start();

    let prevState = elements.map(({ state }) => state.mover);

    /**
     * Animate 10 frames, verifying that the physics state has changed on each frame.
     * Discard the first frame, which initializes animation state but doesn't begin
     * applying the force.
     */
    for (let i = 0; i < 10; i++) {
      mockRAF.step({ count: i === 0 ? 2 : 1 });

      elements.forEach((element, i) => {
        expect(prevState[i].acceleration[0]).not.toEqual(
          element.state.mover.acceleration[0]
        );
        expect(prevState[i].velocity[0]).not.toEqual(
          element.state.mover.velocity[0]
        );
        expect(prevState[i].position[0]).not.toEqual(
          element.state.mover.position[0]
        );
      });

      // Set the prevState to the current state at the end of each iteration.
      prevState = elements.map(({ state }) => state.mover);
    }
  });

  it('should check and modify the play state of a repeated animation', () => {
    const mockRAF = new MockRAF();

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(mockRAF.rAF);

    const mockElements: AnimatingElement<
      GravityConfig,
      HTMLElement
    >[] = new Array(3).fill({ ...baseElement, repeat: Infinity });

    const { start, elements } = gravityGroup(mockElements);

    start();

    /**
     * Animate 180 frames, equivalent to 3 seconds.
     * With the default physics configuration, we should
     * reach the reversal state at approximately this time.
     */
    mockRAF.step({ count: 180 });

    expect(elements.every(({ state }) => state.playState === 'reverse')).toBe(
      true
    );
  });

  it('should continually reverse repeated animations when they reach their ending physics conditions', () => {
    const mockRAF = new MockRAF();

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(mockRAF.rAF);

    const mockElements: AnimatingElement<
      GravityConfig,
      HTMLElement
    >[] = new Array(3).fill({ ...baseElement, repeat: Infinity });

    const { start, elements } = gravityGroup(mockElements);

    start();

    /**
     * Animate 180 frames, equivalent to 3 seconds.
     * With the default physics configuration, we should
     * reach the reversal state at approximately this time.
     */
    mockRAF.step({ count: 180 });

    expect(elements.every(({ state }) => state.playState === 'reverse')).toBe(
      true
    );

    // Animate another 180 frames and verify that we've switched to the Forward play state.
    mockRAF.step({ count: 180 });

    expect(elements.every(({ state }) => state.playState === 'forward')).toBe(
      true
    );
  });

  it('should end a repeated animation when the specified number of repeats has been eclipsed', () => {
    const mockRAF = new MockRAF();

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(mockRAF.rAF);

    const mockElements: AnimatingElement<
      GravityConfig,
      HTMLElement
    >[] = new Array(3).fill({ ...baseElement, repeat: 2 });

    const { start, elements } = gravityGroup(mockElements);

    start();

    /**
     * Animate 180 frames, equivalent to 3 seconds.
     * With the default physics configuration, we should
     * reach the reversal state at approximately this time.
     */
    mockRAF.step({ count: 180 });

    expect(
      elements.every(
        ({ state }) => state.playState === 'reverse' && state.repeatCount === 0
      )
    ).toBe(true);

    // Animate another 180 frames and verify that we've switched to the Forward play state.
    mockRAF.step({ count: 180 });

    expect(
      elements.every(
        ({ state }) => state.playState === 'forward' && state.repeatCount === 1
      )
    ).toBe(true);

    // Animate another 180 frames to trigger the final repeat.
    mockRAF.step({ count: 180 });

    expect(
      elements.every(
        ({ state }) => state.playState === 'reverse' && state.repeatCount === 2
      )
    ).toBe(true);

    // Verify that all animations are complete.
    expect(elements.every(({ state }) => state.complete)).toBe(true);
  });
});
