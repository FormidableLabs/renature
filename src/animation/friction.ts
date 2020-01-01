import { rAF } from '../rAF';
import { Entity, applyForce, frictionForceV } from '../forces';
import { VectorSetter, Controller } from './types';

export interface Friction1DParams {
  config: {
    mu: number;
    mass: number;
    initialVelocity: number;
  };
  onUpdate: VectorSetter;
  onComplete: () => void;
}

interface FrictionState {
  mover: Entity;
}

/**
 * A function to apply the frictional force on each step in the course
 * of the animation. First, we derive the force vector exerted by the
 * surface on the mover. Then we apply that vector to the mover to determine
 * its next acceleration, velocity, and position.
 */
const applyFrictionForceForStep = (
  { mover }: FrictionState,
  config: Friction1DParams['config']
) => {
  const force = frictionForceV({
    mu: config.mu,
    mass: config.mass,
    velocity: mover.velocity,
  });

  return applyForce({ force, entity: mover });
};

/**
 * The friction function. This function tracks the internal state of the
 * mover and starts the frame loop to apply the frictional force as it moves.
 */
export const friction1D = (
  params: Friction1DParams
): { controller: Controller } => {
  const state: FrictionState = {
    mover: {
      mass: params.config.mass,
      acceleration: [0, 0],
      velocity: [params.config.initialVelocity, 0],
      position: [0, 0],
    },
  };

  const { start } = rAF();
  const { stop } = start((timestamp, lastFrame, stop) => {
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

    // Apply the gravitational force once for each step.
    for (let i = 0; i < steps; i++) {
      state.mover = applyFrictionForceForStep(state, params.config);
    }

    /**
     * Conditions for stopping the physics animation. For single animations with
     * a discrete from / to pair, we want to stop the animation once the moving
     * object has a velocity of 0 (has come to rest).
     */
    if (state.mover.velocity[0] <= 0) {
      params.onComplete();
      stop();
    } else {
      params.onUpdate({
        velocity: state.mover.velocity,
        position: state.mover.position,
      });
    }
  });

  return { controller: { start, stop } };
};
