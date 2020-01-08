import { rAF } from '../rAF';
import {
  Entity,
  applyForce,
  fluidResistanceForceV,
  gE,
  getFluidPositionAtTerminalVelocity,
} from '../forces';
import { vector as Vector, addf, multf } from '../core';
import { Listener, AnimationParams, AnimationInitializer } from './types';

export interface FluidResistance1DParams extends AnimationParams {
  config: {
    mass: number;
    rho: number;
    area: number;
    cDrag: number;
    settle?: boolean;
  };
}

interface FluidResistanceState {
  mover: Entity;
}

/**
 * A function to apply the drag force on each step in the course
 * of the animation. First, we derive the force vector exerted by the
 * fluid on the mover. Then we apply that vector to the mover to determine
 * its next acceleration, velocity, and position.
 */
const applyFluidResistanceForceForStep = (
  { mover }: FluidResistanceState,
  config: FluidResistance1DParams['config']
) => {
  const dragForce = fluidResistanceForceV({
    rho: config.rho,
    area: config.area,
    velocity: mover.velocity,
    cDrag: config.cDrag,
  });

  const gravitationalForce: Vector<number> = [0, mover.mass * gE];
  const netForce = addf({ v1: dragForce, v2: gravitationalForce });

  return applyForce({ force: netForce, entity: mover, time: 0.001 });
};

/**
 * The fluid resistance function. This function tracks the internal state of the
 * mover and starts the frame loop to apply the drag force as it moves.
 */
export const fluidResistance1D = ({
  config,
  onUpdate,
  onComplete,
}: FluidResistance1DParams): { controller: AnimationInitializer } => {
  const state: FluidResistanceState = {
    mover: {
      mass: config.mass,
      acceleration: [0, 0],
      velocity: [0, 0],
      position: [0, 0],
    },
  };

  const tvPosition = getFluidPositionAtTerminalVelocity(config);

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

    // Apply the drag force once for each step.
    for (let i = 0; i < steps; i++) {
      // If applying a settle effect, reverse and scale down the mover's velocity.
      if (config.settle && state.mover.position[1] >= tvPosition) {
        state.mover = {
          ...state.mover,
          velocity: multf({ v: state.mover.velocity, s: -1 }),
          position: [0, tvPosition],
        };
      }

      state.mover = applyFluidResistanceForceForStep(state, config);
    }

    /**
     * Conditions for stopping the physics animation. For single animations with
     * a discrete from / to pair, we want to stop the animation once the moving
     * object has achieved terminal velocity. If the animation has been set to use
     * a settling effect, we'll wait until the velocity has neared 0.
     */
    if (!config.settle && state.mover.position[1] >= tvPosition) {
      onComplete();
      stop();
    } else if (
      config.settle &&
      state.mover.position[1] >= tvPosition &&
      state.mover.velocity[1] <= 0.01
    ) {
      onComplete();
      stop();
    } else {
      onUpdate({
        velocity: state.mover.velocity,
        position: state.mover.position,
      });
    }
  };

  const { start } = rAF();
  const runAnimation = () => start(listener);

  return { controller: { start: runAnimation } };
};
