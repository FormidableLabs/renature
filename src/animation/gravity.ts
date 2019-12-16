import { vector as Vector, subf, normf } from '../core/Vector.gen';
import { Entity, applyForce } from '../forces/Force.gen';
import { forceV } from '../forces/Gravity.gen';
import { rAF } from '../rAF';

interface GravityState {
  mover: Entity;
  attractor: Entity;
}

/**
 * A function to apply the gravitational force on each step in the course
 * of the animation. First, we derive the force vector applied by the
 * attractor on the mover using forceV. Then we apply that vector to the
 * mover to determine its next acceleration, velocity, and position.
 */
const applyForceForStep = (
  { mover, attractor }: GravityState,
  threshold?: { min: number; max: number }
): Entity => {
  const force = forceV({
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

interface Gravity1DParams {
  config: {
    moverMass: number;
    attractorMass: number;
    r: number;
    initialVelocity?: number;
  };
  onUpdate: (values: {
    position: Vector<number>;
    velocity: Vector<number>;
  }) => void;
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
    const diffTime = timestamp > lastFrame + 64 ? 0 : lastFrame;
    const steps = Math.floor(timestamp - diffTime);

    if (steps > 0) {
      // Apply the gravitational force once for each step.
      for (let i = 0; i < steps; i++) {
        state.mover = applyForceForStep(state);
      }
    } else {
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

interface Gravity2DParams {
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
  onUpdate: (values: {
    position: Vector<number>;
    velocity: Vector<number>;
  }) => void;
}

export const gravity2D = (params: Gravity2DParams): [() => void] => {
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
    const diffTime = timestamp > lastFrame + 64 ? 0 : lastFrame;
    const steps = Math.floor(timestamp - diffTime);

    if (steps > 0) {
      // Apply the gravitational force once for each step.
      for (let i = 0; i < steps; i++) {
        state.mover = applyForceForStep(state, params.config.threshold);
      }
    } else {
      state.mover = applyForceForStep(state, params.config.threshold);
    }

    params.onUpdate({
      position: state.mover.position,
      velocity: state.mover.velocity,
    });
  });

  return [stop];
};
