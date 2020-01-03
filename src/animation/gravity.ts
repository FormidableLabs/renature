import { subf, normf } from '../core';
import { Entity, applyForce, gravityForceV } from '../forces';
import { rAF } from '../rAF';
import {
  VectorSetter,
  Listener,
  AnimationInitializer,
  AnimationParams,
} from './types';

interface Gravity1DState {
  mover: Entity;
}

/**
 * A function to apply the gravitational force on each step in the course
 * of the animation. First, we derive the force vector applied by the
 * attractor on the mover using gravityForceV. Then we apply that vector to the
 * mover to determine its next acceleration, velocity, and position.
 */
const applyGravitationalForceForStep = (
  { mover }: Gravity1DState,
  config: Gravity1DParams['config']
): Entity => {
  const force = gravityForceV({
    mover: mover.position,
    moverMass: mover.mass,
    attractor: [config.r, 0],
    attractorMass: config.attractorMass,
  });

  return applyForce({
    force,
    entity: mover,
  });
};

export interface Gravity1DParams extends AnimationParams {
  config: {
    moverMass: number;
    attractorMass: number;
    r: number;
    initialVelocity?: number;
  };
  onUpdate: VectorSetter;
  onComplete: () => void;
}

/**
 * The gravity function. This function tracks the internal state of the
 * attractor and the mover and starts the frame loop to apply the gravitational
 * force.
 */
export const gravity1D = (
  params: Gravity1DParams
): { controller: AnimationInitializer } => {
  const state: Gravity1DState = {
    mover: {
      mass: params.config.moverMass,
      acceleration: [0, 0],
      velocity: [params.config.initialVelocity || 0, 0],
      position: [0, 0],
    },
  };

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

    // Apply the gravitational force once for each step.
    for (let i = 0; i < steps; i++) {
      state.mover = applyGravitationalForceForStep(state, params.config);
    }

    /**
     * Conditions for stopping the physics animation. For single animations with
     * a discrete from / to pair, we want to stop the animation once the mover has
     * reached the attractor. We can know it's done by checking that the mover has
     * overshot the attractor.
     */

    // Obtain the horizontal component of the vector pointing from mover to attractor.
    const [dir] = normf(
      subf({ v1: state.mover.position, v2: [params.config.r, 0] })
    );

    // If it's positive, we can be confident that the mover has overshot the attractor.
    const isOvershooting = Math.sign(dir) === 1;

    if (isOvershooting) {
      params.onComplete();
      stop();
    } else {
      params.onUpdate({
        position: state.mover.position,
        velocity: state.mover.velocity,
      });
    }
  };

  const { start } = rAF();
  const runAnimation = () => start(listener);

  return { controller: { start: runAnimation } };
};
