import {
  applyForce,
  fluidResistanceForceV,
  gE,
  getFluidPositionAtTerminalVelocity,
} from '../forces';
import { vector as Vector, addf, multf } from '../core';

import {
  PlayState,
  AnimatingElement,
  StatefulAnimatingElement,
  AnimationGroup,
} from './types';
import { group } from './group';

export interface FluidResistanceConfig {
  mass: number;
  rho: number;
  area: number;
  cDrag: number;
  settle?: boolean;
}

// A function to apply the drag force on each step in requestAnimationFrame.
function applyFluidResistanceForceForStep({
  state,
  config,
}: StatefulAnimatingElement<FluidResistanceConfig>) {
  // If applying a settle effect, reverse the mover's velocity.
  if (
    config.settle &&
    state.mover.position[1] >= state.maxDistance &&
    state.playState === PlayState.Forward
  ) {
    state.mover = {
      ...state.mover,
      velocity: multf({ v: state.mover.velocity, s: -1 }),
      position: [0, state.maxDistance],
    };
  } else if (
    config.settle &&
    state.mover.position[1] <= 0 &&
    state.playState === PlayState.Reverse
  ) {
    state.mover = {
      ...state.mover,
      velocity: multf({ v: state.mover.velocity, s: -1 }),
      position: [0, 0],
    };
  }

  const dragForce = fluidResistanceForceV({
    rho: config.rho,
    area: config.area,
    velocity: state.mover.velocity,
    cDrag: config.cDrag,
  });

  const gravitationalForce: Vector<number> = [0, state.mover.mass * gE];
  const netForce = addf({
    v1: dragForce,
    v2:
      state.playState === PlayState.Forward
        ? gravitationalForce
        : multf({ v: gravitationalForce, s: -1 }),
  });

  return applyForce({
    force: netForce,
    entity: state.mover,
    time: 0.001,
  });
}

/**
 * A function to check the current play state of the fluid resistance
 * animation and potentially reverse it.
 *
 * If a fluid resistance animation has repeat specified in its config
 * _and_ has reached its physics stopping condition of position >= position
 * at terminal velocity, we reset the initial parameters and reverse the
 * direction of the animation.
 */
function checkReverseFluidResistancePlayState({
  state,
  config,
}: StatefulAnimatingElement<FluidResistanceConfig>) {
  const isOvershootingForward =
    state.playState === PlayState.Forward &&
    state.mover.position[1] >= state.maxDistance;
  const isOvershootingReverse =
    state.playState === PlayState.Reverse && state.mover.position[1] <= 0;

  // If applying a settle effect with looping, allow the settling to
  // finish before reversing the animation. We arbitrarily set this
  // for now as a velocity <= 0.5 m / s.
  const isSettled = config.settle
    ? Math.abs(state.mover.velocity[1]) <= 0.5
    : true;

  if ((isOvershootingForward || isOvershootingReverse) && isSettled) {
    if (state.playState === PlayState.Forward) {
      state.mover = {
        ...state.mover,
        acceleration: [0, 0],
        velocity: [0, 0],
        position: [0, state.maxDistance],
      };
      state.playState = PlayState.Reverse;
      state.repeatCount++;
    } else if (state.playState === PlayState.Reverse) {
      state.mover = {
        ...state.mover,
        acceleration: [0, 0],
        velocity: [0, 0],
        position: [0, 0],
      };
      state.playState = PlayState.Forward;
      state.repeatCount++;
    }
  }
}

// A function to check whether or not the mover has achieved terminal velocity.
function checkFluidResistanceStoppingCondition({
  state,
}: StatefulAnimatingElement<FluidResistanceConfig>) {
  return state.mover.position[1] >= state.maxDistance;
}

// A function to take in a set of elements and begin animating them
// according to the force of fluid resistance.
export function fluidResistanceGroup(
  elements: AnimatingElement<FluidResistanceConfig>[]
): AnimationGroup<FluidResistanceConfig> {
  const initialState = (
    element: AnimatingElement<FluidResistanceConfig>
  ): StatefulAnimatingElement<FluidResistanceConfig>['state'] => ({
    mover: {
      mass: element.config.mass,
      acceleration: [0, 0],
      velocity: [0, 0],
      position: [0, 0],
    },
    playState: PlayState.Forward,
    maxDistance: getFluidPositionAtTerminalVelocity(element.config),
    complete: false,
    paused: !!element.pause,
    delayed: !!element.delay,
    repeatCount: -1,
  });

  return group(elements, initialState, {
    checkReversePlayState: checkReverseFluidResistancePlayState,
    applyForceForStep: applyFluidResistanceForceForStep,
    checkStoppingCondition: checkFluidResistanceStoppingCondition,
  });
}
