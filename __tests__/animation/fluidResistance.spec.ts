import { createRef } from 'react';

import { MockRAF } from '../test-utils/mockRAF';
import {
  AnimatingElement,
  FluidResistanceConfig,
  fluidResistanceGroup,
  PlayState,
} from '../../src/animation';

describe('fluidResistance', () => {
  const baseElement: AnimatingElement<FluidResistanceConfig, HTMLElement> = {
    ref: createRef(),
    config: {
      mass: 25,
      rho: 10,
      area: 20,
      cDrag: 0.1,
    },
    onUpdate: jest.fn(),
    onComplete: jest.fn(),
  };

  it('should create a group of animating elements and return functions for starting, stopping, and pausing the animation group', () => {
    const mockElements: AnimatingElement<
      FluidResistanceConfig,
      HTMLElement
    >[] = new Array(3).fill(baseElement);

    const { start, stop, pause, elements } = fluidResistanceGroup(mockElements);

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
      FluidResistanceConfig,
      HTMLElement
    >[] = new Array(3).fill(baseElement);

    const { start } = fluidResistanceGroup(mockElements);

    start();

    expect(requestAnimationFrameSpy).toHaveBeenCalled();
  });

  it('should apply the fluid resistance force on each step', () => {
    const mockRAF = new MockRAF();

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(mockRAF.rAF);

    const mockElements: AnimatingElement<
      FluidResistanceConfig,
      HTMLElement
    >[] = new Array(3).fill(baseElement);

    const { start, elements } = fluidResistanceGroup(mockElements);

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
        expect(prevState[i].acceleration[1]).not.toEqual(
          element.state.mover.acceleration[1]
        );
        expect(prevState[i].velocity[1]).not.toEqual(
          element.state.mover.velocity[1]
        );
        expect(prevState[i].position[1]).not.toEqual(
          element.state.mover.position[1]
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
      FluidResistanceConfig,
      HTMLElement
    >[] = new Array(3).fill({ ...baseElement, repeat: Infinity });

    const { start, elements } = fluidResistanceGroup(mockElements);

    start();

    /**
     * Animate 440 frames, equivalent to 5.5 seconds.
     * With the baseline physics configuration, we should
     * reach the reversal state at approximately this time.
     */
    mockRAF.step({ count: 440 });

    expect(
      elements.every(({ state }) => state.playState === PlayState.Reverse)
    ).toBe(true);
  });

  it('should continually reverse repeated animations when they reach their ending physics conditions', () => {
    const mockRAF = new MockRAF();

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(mockRAF.rAF);

    const mockElements: AnimatingElement<
      FluidResistanceConfig,
      HTMLElement
    >[] = new Array(3).fill({ ...baseElement, repeat: Infinity });

    const { start, elements } = fluidResistanceGroup(mockElements);

    start();

    /**
     * Animate 440 frames, equivalent to 5.5 seconds.
     * With the baseline physics configuration, we should
     * reach the reversal state at approximately this time.
     */
    mockRAF.step({ count: 440 });

    expect(
      elements.every(({ state }) => state.playState === PlayState.Reverse)
    ).toBe(true);

    // Animate another 440 frames and verify that we've switched to the Forward play state.
    mockRAF.step({ count: 440 });

    expect(
      elements.every(({ state }) => state.playState === PlayState.Forward)
    ).toBe(true);
  });

  it('should end a repeated animation when the specified number of repeats has been eclipsed', () => {
    const mockRAF = new MockRAF();

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(mockRAF.rAF);

    const mockElements: AnimatingElement<
      FluidResistanceConfig,
      HTMLElement
    >[] = new Array(3).fill({ ...baseElement, repeat: 3 });

    const { start, elements } = fluidResistanceGroup(mockElements);

    start();

    /**
     * Animate 440 frames, equivalent to 5.5 seconds.
     * With the baseline physics configuration, we should
     * reach the reversal state at approximately this time.
     */
    mockRAF.step({ count: 440 });

    expect(
      elements.every(
        ({ state }) =>
          state.playState === PlayState.Reverse && state.repeatCount === 1
      )
    ).toBe(true);

    // Animate another 440 frames and verify that we've switched to the Forward play state.
    mockRAF.step({ count: 440 });

    expect(
      elements.every(
        ({ state }) =>
          state.playState === PlayState.Forward && state.repeatCount === 2
      )
    ).toBe(true);

    // Animate another 440 frames to trigger the final repeat.
    mockRAF.step({ count: 440 });

    expect(
      elements.every(
        ({ state }) =>
          state.playState === PlayState.Reverse && state.repeatCount === 3
      )
    ).toBe(true);

    // Verify that all animations are complete.
    expect(elements.every(({ state }) => state.complete)).toBe(true);
  });

  it('should apply a settling effect to the animation if specified in the physics config', () => {
    const mockRAF = new MockRAF();

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(mockRAF.rAF);

    const mockElements: AnimatingElement<
      FluidResistanceConfig,
      HTMLElement
    >[] = new Array(3).fill({
      ...baseElement,
      config: { ...baseElement.config, repeat: Infinity, settle: true },
    });

    const { start, elements } = fluidResistanceGroup(mockElements);

    start();

    // Animate to the last frame before crossing the maxDistance threshold.
    mockRAF.step({ count: 511 });

    expect(
      elements.every(({ state }) => state.playState === PlayState.Forward)
    ).toBe(true);
    expect(elements.every(({ state }) => state.mover.velocity[1] > 0)).toBe(
      true
    );

    /**
     * Animate another frame, enough to have triggered the settling effect.
     * At this point, the velocity vector should be negative, but the play
     * state should still be forward.
     */
    mockRAF.step({ count: 1 });
    expect(elements.every(({ state }) => state.mover.velocity[1] < 0)).toBe(
      true
    );
    expect(
      elements.every(({ state }) => state.playState === PlayState.Forward)
    ).toBe(true);
  });
});
