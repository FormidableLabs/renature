import { gravityForceV, applyForce } from '../forces';
import { subf, normf } from '../core';

import {
  PlayState,
  AnimatingElement,
  StatefulAnimatingElement,
  AnimationGroup,
} from './types';
import { group } from './group';

export interface GravityConfig {
  moverMass: number;
  attractorMass: number;
  r: number;
  G?: number;
}

/// A function to apply the gravitational force on each step in requestAnimationFrame.
function applyGravitationalForceForStep({
  state: { mover, attractor },
  config,
}: StatefulAnimatingElement<GravityConfig>) {
  const force = gravityForceV({
    mover: mover.position,
    moverMass: mover.mass,
    attractor: attractor?.position || [config.r, 0],
    attractorMass: config.attractorMass,
    g: config.G,
  });

  return applyForce({
    force,
    entity: mover,
    time: 0.001,
  });
}

/**
 * A function to check the current play state of the gravity animation
 * and potentially reverse it.
 *
 * If a gravity animation has repeat specified in its config _and_
 * has reached its physics stopping condition (mover has reached attreactor),
 * we reset the initial parameters and reverse the direction of the animation.
 */
function checkReverseGravityPlayState({
  state,
  config,
}: StatefulAnimatingElement<GravityConfig>) {
  if (
    state.mover.position[0] >= config.r &&
    state.playState === PlayState.Forward
  ) {
    state.mover = {
      ...state.mover,
      acceleration: [0, 0],
      velocity: [0, 0],
      position: [config.r, 0],
    };

    if (state.attractor) {
      state.attractor = {
        ...state.attractor,
        position: [0, 0],
      };
    }

    state.playState = PlayState.Reverse;
    state.repeatCount++;
  } else if (
    state.mover.position[0] <= 0 &&
    state.playState === PlayState.Reverse
  ) {
    state.mover = {
      ...state.mover,
      acceleration: [0, 0],
      velocity: [0, 0],
      position: [0, 0],
    };

    if (state.attractor) {
      state.attractor = {
        ...state.attractor,
        position: [config.r, 0],
      };
    }

    state.playState = PlayState.Forward;
    state.repeatCount++;
  }
}

// A function to check whether or not the mover has reached the attractor.
function checkGravityStoppingCondition({
  state,
  config,
}: StatefulAnimatingElement<GravityConfig>) {
  // Obtain the horizontal component of the vector pointing from mover to attractor.
  const [dir] = normf(subf({ v1: state.mover.position, v2: [config.r, 0] }));

  // If it's positive, we can be confident that the mover has overshot the attractor.
  const isOvershooting = Math.sign(dir) === 1;

  return isOvershooting;
}

// A function to take in a set of elements and begin animating them
// according to the gravitational force.
export function gravityGroup(
  elements: AnimatingElement<GravityConfig>[]
): AnimationGroup<GravityConfig> {
  const initialState = (
    element: AnimatingElement<GravityConfig>
  ): StatefulAnimatingElement<GravityConfig>['state'] => ({
    mover: {
      mass: element.config.moverMass,
      acceleration: [0, 0],
      velocity: [0, 0],
      position: [0, 0],
    },
    attractor: {
      mass: element.config.attractorMass,
      acceleration: [0, 0],
      velocity: [0, 0],
      position: [element.config.r, 0],
    },
    playState: PlayState.Forward,
    maxDistance: element.config.r,
    complete: false,
    paused: !!element.pause,
    delayed: !!element.delay,
    repeatCount: 0,
  });

  return group(elements, initialState, {
    checkReversePlayState: checkReverseGravityPlayState,
    applyForceForStep: applyGravitationalForceForStep,
    checkStoppingCondition: checkGravityStoppingCondition,
  });
}
