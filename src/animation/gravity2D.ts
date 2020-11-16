import { vector as Vector } from '../core';
import { entity as Entity, applyForce, gravityForceV } from '../forces';
import { rAF } from '../rAF';
import { VectorSetter, Listener, AnimationParams, Controller } from './types';

interface Gravity2DState {
  mover: Entity;
  attractor: Entity;
}

export interface Gravity2DParams extends AnimationParams {
  config: {
    attractorMass: number;
    moverMass: number;
    attractorPosition: Vector<number>;
    initialMoverPosition?: Vector<number>;
    initialMoverVelocity?: Vector<number>;
    timeScale?: number;
    threshold?: {
      min: number;
      max: number;
    };
    G?: number;
  };
  onUpdate: VectorSetter;
}

export interface Gravity2DController extends Controller {
  updateAttractor: VectorSetter;
}

/**
 * A function to apply the gravitational force on each step in the course
 * of the animation. First, we derive the force vector applied by the
 * attractor on the mover using gravityForceV. Then we apply that vector to the
 * mover to determine its next acceleration, velocity, and position.
 */
function applyGravitationalForceForStep(
  { mover, attractor }: Gravity2DState,
  config: Gravity2DParams['config']
) {
  const force = gravityForceV({
    mover: mover.position,
    moverMass: mover.mass,
    attractor: attractor.position,
    attractorMass: attractor.mass,
    threshold: config.threshold && [config.threshold.min, config.threshold.max],
    g: config.G,
  });

  return applyForce({
    force,
    entity: mover,
    time: (config.timeScale || 1) * 0.001,
  });
}

/**
 * The gravity function. This function tracks the internal state of the
 * attractor and the mover and starts the frame loop to apply the gravitational
 * force.
 */
export function gravity2D({
  config,
  onUpdate,
}: Gravity2DParams): {
  controller: Gravity2DController;
} {
  const state: Gravity2DState = {
    mover: {
      mass: config.moverMass,
      acceleration: [0, 0],
      velocity: config.initialMoverVelocity || [0, 0],
      position: config.initialMoverPosition || [0, 0],
    },
    attractor: {
      mass: config.attractorMass,
      acceleration: [0, 0],
      velocity: [0, 0],
      position: config.attractorPosition,
    },
  };

  const listener: Listener = (timestamp, lastFrame) => {
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
      state.mover = applyGravitationalForceForStep(state, config);
    }

    onUpdate({
      position: state.mover.position,
      velocity: state.mover.velocity,
    });
  };

  const { start, stop } = rAF();
  const run = () => start(listener);

  const updateAttractor: VectorSetter = ({ position }) => {
    state.attractor = {
      ...state.attractor,
      position,
    };
  };

  return {
    controller: {
      start: run,
      stop,
      pause: () => {},
      updateAttractor,
    },
  };
}
