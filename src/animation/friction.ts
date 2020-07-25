import { PlayState, AnimatingElement, StatefulAnimatingElement } from './types';
import { getMaxDistanceFriction, frictionForceV, applyForce } from '../forces';
import { group } from './group';

export interface FrictionConfig {
  mu: number;
  mass: number;
  initialVelocity: number;
}

// A function to apply the force of friction on each step in requestAnimationFrame.
function applyFrictionForceForStep({
  state: { mover },
  config,
}: StatefulAnimatingElement<FrictionConfig>) {
  const force = frictionForceV({
    mu: config.mu,
    mass: config.mass,
    velocity: mover.velocity,
  });

  return applyForce({ force, entity: mover, time: 0.001 });
}

/**
 * A function to check the current play state of the friction animation
 * and potentially reverse it.
 *
 * If a friction animation has infinite specified in its config _and_
 * has reached its physics stopping condition of velocity 0, we reset
 * the initial parameters and reverse the direction of the animation.
 */
function checkReverseFrictionPlayState({
  state,
  config,
}: StatefulAnimatingElement<FrictionConfig>) {
  if (state.mover.velocity[0] <= 0 && state.playState === PlayState.Forward) {
    state.mover = {
      ...state.mover,
      acceleration: [0, 0],
      velocity: [config.initialVelocity * -1, 0],
      position: [state.maxDistance, 0],
    };
    state.playState = PlayState.Reverse;
  } else if (
    state.mover.velocity[0] >= 0 &&
    state.playState === PlayState.Reverse
  ) {
    state.mover = {
      ...state.mover,
      acceleration: [0, 0],
      velocity: [config.initialVelocity, 0],
      position: [0, 0],
    };
    state.playState = PlayState.Forward;
  }
}

function checkFrictionStoppingCondition({
  state: { mover },
}: StatefulAnimatingElement<FrictionConfig>) {
  return mover.velocity[0] <= 0;
}

export function frictionGroup(elements: AnimatingElement<FrictionConfig>[]) {
  const initialState = (
    element: AnimatingElement<FrictionConfig>
  ): StatefulAnimatingElement<FrictionConfig>['state'] => ({
    mover: {
      mass: element.config.mass,
      acceleration: [0, 0],
      velocity: [element.config.initialVelocity, 0],
      position: [0, 0],
    },
    playState: PlayState.Forward,
    maxDistance: getMaxDistanceFriction({
      mu: element.config.mu,
      initialVelocity: element.config.initialVelocity,
    }),
    complete: false,
    paused: !!element.pause,
    delayed: !!element.delay,
  });

  return group(elements, initialState, {
    checkReversePlayState: checkReverseFrictionPlayState,
    applyForceForStep: applyFrictionForceForStep,
    checkStoppingCondition: checkFrictionStoppingCondition,
  });
}
