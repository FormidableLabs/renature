import { rAF } from '../rAF';
import { Entity, applyForce } from '../forces/Force.gen';
import { frictionForceV } from '../forces/Friction.gen';
import { VectorSetter } from './types';

export interface Friction1DParams {
  config: {
    mu: number;
    normal?: number;
    velocity: number;
  };
  onUpdate: VectorSetter;
  onComplete: () => void;
}

type FrictionState = Entity;

const applyForceForStep = (
  entity: FrictionState,
  mu: number,
  normal?: number
) => {
  const force = frictionForceV({ mu, normal, velocity: entity.velocity });

  return applyForce({ force, entity });
};

export const friction1D = (params: Friction1DParams) => {
  let state: FrictionState = {
    mass: 1,
    acceleration: [0, 0],
    velocity: [params.config.velocity, 0],
    position: [0, 0],
  };

  const { stop } = rAF().start((timestamp, lastFrame, stop) => {
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
      state = applyForceForStep(state, params.config.mu, params.config.normal);
    }

    /**
     * Conditions for stopping the physics animation. For single animations with
     * a discrete from / to pair, we want to stop the animation once the moving
     * object has a velocity of 0 (has come to rest).
     */
    if (state.velocity[0] <= 0) {
      params.onComplete();
      stop();
    } else {
      params.onUpdate({
        position: state.position,
        velocity: state.velocity,
      });
    }
  });

  return [stop];
};
