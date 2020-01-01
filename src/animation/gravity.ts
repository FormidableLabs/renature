import { vector as Vector, subf, normf } from '../core/Vector.gen';
import { Entity, applyForce } from '../forces/Force.gen';
import { gravityForceV } from '../forces/Gravity.gen';
import { rAF } from '../rAF';
import { VectorSetter } from './types';

interface GravityState {
  mover: Entity;
  attractor: Entity;
}

/**
 * A function to apply the gravitational force on each step in the course
 * of the animation. First, we derive the force vector applied by the
 * attractor on the mover using gravityForceV. Then we apply that vector to the
 * mover to determine its next acceleration, velocity, and position.
 */
const applyForceForStep = (
  { mover, attractor }: GravityState,
  threshold?: { min: number; max: number }
): Entity => {
  const force = gravityForceV({
    mover: mover.position,
    moverMass: mover.mass,
    attractor: attractor.position,
    attractorMass: attractor.mass,
    threshold: threshold && [threshold.min, threshold.max],
  });

  return applyForce({
    force,
    entity: mover,
  });
};

/**
 * The gravity function. This function tracks the internal state of the
 * attractor and the mover and starts the frame loop to apply the gravitational
 * force. Finally, it returns the stop function to imperatively stop the
 * animation at any time. The animation will stop when the mover has reached the
 * attractor as well.
 */

export interface Gravity1DParams {
  config: {
    moverMass: number;
    attractorMass: number;
    r: number;
    initialVelocity?: number;
  };
  onUpdate: VectorSetter;
  onComplete: () => void;
}

export const gravity1D = (params: Gravity1DParams) => {
  const state: GravityState = {
    mover: {
      mass: params.config.moverMass,
      acceleration: [0, 0],
      velocity: [params.config.initialVelocity || 0, 0],
      position: [0, 0],
    },
    attractor: {
      mass: params.config.attractorMass,
      acceleration: [0, 0],
      velocity: [0, 0],
      position: [params.config.r, 0],
    },
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
      state.mover = applyForceForStep(state);
    }

    /**
     * Conditions for stopping the physics animation. For single animations with
     * a discrete from / to pair, we want to stop the animation once the mover has
     * reached the attractor. We can know it's done by checking that the mover has
     * overshot the attractor.
     */

    // Obtain the horizontal component of the vector pointing from mover to attractor.
    const [dir] = normf(
      subf({ v1: state.mover.position, v2: state.attractor.position })
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
  });

  return [stop];
};

export interface Gravity2DParams {
  config: {
    attractorMass: number;
    moverMass: number;
    attractorPosition: Vector<number>;
    initialMoverPosition?: Vector<number>;
    initialMoverVelocity?: Vector<number>;
    threshold?: {
      min: number;
      max: number;
    };
  };
  onUpdate: VectorSetter;
}

export const gravity2D = (
  params: Gravity2DParams
): [() => void, VectorSetter] => {
  const state: GravityState = {
    mover: {
      mass: params.config.moverMass,
      acceleration: [0, 0],
      velocity: params.config.initialMoverVelocity || [0, 0],
      position: params.config.initialMoverPosition || [0, 0],
    },
    attractor: {
      mass: params.config.attractorMass,
      acceleration: [0, 0],
      velocity: [0, 0],
      position: params.config.attractorPosition,
    },
  };

  const { stop } = rAF().start((timestamp, lastFrame) => {
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
      state.mover = applyForceForStep(state, params.config.threshold);
    }

    params.onUpdate({
      position: state.mover.position,
      velocity: state.mover.velocity,
    });
  });

  const updateAttractor: VectorSetter = ({ position, velocity }) => {
    state.attractor = {
      ...state.attractor,
      position,
    };

    if (velocity) {
      state.attractor = {
        ...state.attractor,
        velocity,
      };
    }
  };

  return [stop, updateAttractor];
};
