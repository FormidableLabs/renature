import { vector as Vector, subf, magf } from "../core/Vector.gen";
import { Entity, applyForce } from "../forces/Force.gen";
import { forceV } from "../forces/Gravity.gen";
import { rAF } from "../rAF";

export interface GravityParams {
  config: {
    moverMass: number;
    attractorMass: number;
    attractor: Vector<number>;
    initialVelocity?: Vector<number>;
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
  threshold: { min: number; max: number }
): Entity => {
  const force = forceV({
    mover: mover.position,
    moverMass: mover.mass,
    attractor: attractor.position,
    attractorMass: attractor.mass,
    threshold: [threshold.min, threshold.max]
  });

  return applyForce({
    force,
    entity: mover
  });
};

/**
 * The gravity function. This function tracks the internal state of the
 * attractor and the mover and starts the frame loop to apply the gravitational
 * force. Finally, it returns the stop function to imperatively stop the
 * animation at any time. The animation will stop when the mover has reached the
 * attractor as well.
 */
const DEFAULT_THRESHOLD = { min: 10, max: 1000 };

export const gravity = (params: GravityParams): [() => void] => {
  const state: GravityState = {
    mover: {
      mass: params.config.moverMass,
      acceleration: [0, 0],
      velocity: params.config.initialVelocity || [0, 0],
      position: [0, 0]
    },
    attractor: {
      mass: params.config.attractorMass,
      acceleration: [0, 0],
      velocity: [0, 0],
      position: params.config.attractor
    }
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
        state.mover = applyForceForStep(
          state,
          params.config.threshold || DEFAULT_THRESHOLD
        );
      }
    } else {
      state.mover = applyForceForStep(
        state,
        params.config.threshold || DEFAULT_THRESHOLD
      );
    }

    /**
     * Conditions for stopping the animation. If the mover is within a specified
     * threshold of the attractor, the gravitational force will become so strong
     * that its acceleration will increase by orders of magnitude each frame. Similarly,
     * a mover may still get catapulted by the gravitational
     */
    const { min, max } = params.config.threshold || DEFAULT_THRESHOLD;

    const distance = magf(
      subf({ v1: params.config.attractor, v2: state.mover.position })
    );

    if (distance <= min || distance >= max) {
      // Mover has reached attractor or mover has exceeded the limits, stop animation.
      stop();
    } else {
      params.onUpdate({
        position: state.mover.position,
        velocity: state.mover.velocity
      });
    }
  });

  return [stop];
};
