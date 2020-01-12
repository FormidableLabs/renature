import { subf, normf } from '../core';
import { Entity, applyForce, gravityForceV } from '../forces';
import { rAF } from '../rAF';
import {
  VectorSetter,
  Listener,
  AnimationInitializer,
  AnimationParams,
  PlayState,
} from './types';

interface Gravity1DState {
  mover: Entity;
  attractor: Entity;
  playState: PlayState;
}

export interface Gravity1DParams extends AnimationParams {
  config: {
    moverMass: number;
    attractorMass: number;
    r: number;
  };
  onUpdate: VectorSetter;
  onComplete: () => void;
}

/**
 * A function to apply the gravitational force on each step in the course
 * of the animation. First, we derive the force vector applied by the
 * attractor on the mover using gravityForceV. Then we apply that vector to the
 * mover to determine its next acceleration, velocity, and position.
 */
const applyGravitationalForceForStep = (
  { mover, attractor }: Gravity1DState,
  config: Gravity1DParams['config']
): Entity => {
  const force = gravityForceV({
    mover: mover.position,
    moverMass: mover.mass,
    attractor: attractor.position,
    attractorMass: config.attractorMass,
  });

  return applyForce({
    force,
    entity: mover,
    time: 0.001,
  });
};

const reversePlayState = (
  state: Gravity1DState,
  config: Gravity1DParams['config']
) => {
  if (state.mover.position[0] >= config.r) {
    state.mover = {
      ...state.mover,
      acceleration: [0, 0],
      velocity: [0, 0],
      position: [config.r, 0],
    };
    state.attractor = {
      ...state.attractor,
      position: [0, 0],
    };
    state.playState = PlayState.Reverse;
  } else if (state.mover.position[0] <= 0) {
    state.mover = {
      ...state.mover,
      acceleration: [0, 0],
      velocity: [0, 0],
      position: [0, config.r],
    };
    state.attractor = {
      ...state.attractor,
      position: [config.r, 0],
    };
    state.playState = PlayState.Forward;
  }
};

/**
 * The gravity function. This function tracks the internal state of the
 * attractor and the mover and starts the frame loop to apply the gravitational
 * force.
 */
export const gravity1D = ({
  config,
  onUpdate,
  onComplete,
  infinite,
}: Gravity1DParams): { controller: AnimationInitializer } => {
  const state: Gravity1DState = {
    mover: {
      mass: config.moverMass,
      acceleration: [0, 0],
      velocity: [0, 0],
      position: [0, 0],
    },
    attractor: {
      mass: config.attractorMass,
      acceleration: [0, 0],
      velocity: [0, 0],
      position: [config.r, 0],
    },
    playState: PlayState.Forward,
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
      if (infinite) {
        reversePlayState(state, config);
      }

      state.mover = applyGravitationalForceForStep(state, config);
    }

    /**
     * Conditions for stopping the physics animation. For single animations with
     * a discrete from / to pair, we want to stop the animation once the mover has
     * reached the attractor. We can know it's done by checking that the mover has
     * overshot the attractor.
     */

    // Obtain the horizontal component of the vector pointing from mover to attractor.
    const [dir] = normf(subf({ v1: state.mover.position, v2: [config.r, 0] }));

    // If it's positive, we can be confident that the mover has overshot the attractor.
    const isOvershooting = Math.sign(dir) === 1;

    if (!infinite && isOvershooting) {
      onComplete();
      stop();
    } else {
      onUpdate({
        position: state.mover.position,
        velocity: state.mover.velocity,
      });
    }
  };

  const { start } = rAF();
  const runAnimation = () => start(listener);

  return { controller: { start: runAnimation } };
};
