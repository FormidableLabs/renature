import { rAF } from '../rAF';
import {
  Entity,
  applyForce,
  frictionForceV,
  getMaxDistanceFriction,
} from '../forces';
import { Listener, AnimationParams, PlayState, Controller } from './types';

export interface Friction1DParams extends AnimationParams {
  config: {
    mu: number;
    mass: number;
    initialVelocity: number;
  };
}

interface FrictionState {
  mover: Entity;
  playState: PlayState;
}

/**
 * A function to apply the frictional force on each step in the course
 * of the animation. First, we derive the force vector exerted by the
 * surface on the mover. Then we apply that vector to the mover to determine
 * its next acceleration, velocity, and position.
 */
function applyFrictionForceForStep(
  { mover }: FrictionState,
  config: Friction1DParams['config']
) {
  const force = frictionForceV({
    mu: config.mu,
    mass: config.mass,
    velocity: mover.velocity,
  });

  return applyForce({ force, entity: mover, time: 0.001 });
}

function reversePlayState(
  state: FrictionState,
  config: Friction1DParams['config'],
  maxDistance: number
) {
  if (state.mover.velocity[0] <= 0 && state.playState === PlayState.Forward) {
    state.mover = {
      ...state.mover,
      acceleration: [0, 0],
      velocity: [config.initialVelocity * -1, 0],
      position: [maxDistance, 0],
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

/**
 * The friction function. This function tracks the internal state of the
 * mover and starts the frame loop to apply the frictional force as it moves.
 */
export function friction1D({
  config,
  onUpdate,
  onComplete,
  infinite,
}: Friction1DParams): { controller: Controller } {
  const state: FrictionState = {
    mover: {
      mass: config.mass,
      acceleration: [0, 0],
      velocity: [config.initialVelocity, 0],
      position: [0, 0],
    },
    playState: PlayState.Forward,
  };

  const maxDistance = getMaxDistanceFriction({
    mu: config.mu,
    initialVelocity: config.initialVelocity,
  });

  const listener: Listener = (timestamp, lastFrame, stop) => {
    /**
     * Determine the number of milliseconds elapsed between the current frame
     * and the last frame. If more than four frames have been dropped, assuming
     * a 60fps interval, just use the timestamp of the current frame.
     */

    // Obtain the timestamp of the last frame. If this is the first frame, use the current frame timestamp.
    let lastTime = lastFrame !== undefined ? lastFrame : timestamp;

    /**
     * If more than four frames have been dropped since the last frame,
     * just use the current frame timestamp.
     */
    if (timestamp > lastTime + 64) {
      lastTime = timestamp;
    }

    // Determine the number of steps between the current frame and last recorded frame.
    const steps = Math.floor(timestamp - lastTime);

    // Apply the force of friction once for each step.
    for (let i = 0; i < steps; i++) {
      if (infinite) {
        reversePlayState(state, config, maxDistance);
      }

      state.mover = applyFrictionForceForStep(state, config);
    }

    /**
     * Conditions for stopping the physics animation. For single animations with
     * a discrete from / to pair, we want to stop the animation once the moving
     * object has a velocity of 0 (has come to rest).
     */
    if (!infinite && state.mover.velocity[0] <= 0) {
      onComplete();
      stop();
    } else {
      onUpdate({
        velocity: state.mover.velocity,
        position: state.mover.position,
      });
    }
  };

  const { start, stop } = rAF();
  const run = () => start(listener);

  return { controller: { start: run, stop } };
}
