import { PlayState, AnimatingElement, StatefulAnimatingElement } from './types';
import { gravityForceV, applyForce } from '../forces';
import { rAF, update } from '../rAF';
import { subf, normf } from '../core';

export interface GravityConfig {
  moverMass: number;
  attractorMass: number;
  r: number;
  G?: number;
}

interface GravityAnimatingElement extends AnimatingElement {
  config: GravityConfig;
}

interface StatefulGravityAnimatingElement extends StatefulAnimatingElement {
  config: GravityConfig;
}

/**
 * A function to apply the gravitational force on each step in the course
 * of the animation. First, we derive the force vector applied by the
 * attractor on the mover using gravityForceV. Then we apply that vector to the
 * mover to determine its next acceleration, velocity, and position.
 */
function applyGravitationalForceForStep({
  state: { mover, attractor },
  config,
}: StatefulGravityAnimatingElement) {
  const force = gravityForceV({
    mover: mover.position,
    moverMass: mover.mass,
    attractor: attractor?.position || [config.r, 0],
    attractorMass: config.attractorMass,
    g: config.G,
  });

  return applyForce({
    force,
    entity: mover,
    time: 0.001,
  });
}

/**
 * A function to check the current play state of the gravity animation
 * and potentially reverse it.
 *
 * If a gravity animation has infinite specified in its config _and_
 * has reached its physics stopping condition (mover has reached attreactor),
 * we reset the initial parameters and reverse the direction of the animation.
 */
function checkReverseGravityPlayState({
  state,
  config,
}: StatefulGravityAnimatingElement) {
  if (state.mover.position[0] >= config.r) {
    state.mover = {
      ...state.mover,
      acceleration: [0, 0],
      velocity: [0, 0],
      position: [config.r, 0],
    };

    if (state.attractor) {
      state.attractor = {
        ...state.attractor,
        position: [0, 0],
      };
    }

    state.playState = PlayState.Reverse;
  } else if (state.mover.position[0] <= 0) {
    state.mover = {
      ...state.mover,
      acceleration: [0, 0],
      velocity: [0, 0],
      position: [0, 0],
    };

    if (state.attractor) {
      state.attractor = {
        ...state.attractor,
        position: [config.r, 0],
      };
    }

    state.playState = PlayState.Forward;
  }
}

function checkGravityStoppingCondition({
  state,
  config,
}: StatefulGravityAnimatingElement) {
  // Obtain the horizontal component of the vector pointing from mover to attractor.
  const [dir] = normf(subf({ v1: state.mover.position, v2: [config.r, 0] }));

  // If it's positive, we can be confident that the mover has overshot the attractor.
  const isOvershooting = Math.sign(dir) === 1;

  return isOvershooting;
}

let isFrameloopActive = false;
const animatingElements = new Set<StatefulGravityAnimatingElement>();

/**
 * A function to take in a newly animating element and add it to the current Set of
 * animating elements. Delayed and paused elements are flagged so that they won't
 * be animated until their delay has elapsed or pause evlauates to true.
 */
export function gravityGroup(animatingElement: GravityAnimatingElement) {
  // Take the initial animating element configuration and extend it with some state properties.
  const statefulAnimatingElement: StatefulGravityAnimatingElement = {
    ...animatingElement,
    state: {
      mover: {
        mass: animatingElement.config.moverMass,
        acceleration: [0, 0],
        velocity: [0, 0],
        position: [0, 0],
      },
      attractor: {
        mass: animatingElement.config.attractorMass,
        acceleration: [0, 0],
        velocity: [0, 0],
        position: [animatingElement.config.r, 0],
      },
      playState: PlayState.Forward,
      maxDistance: animatingElement.config.r,
      complete: false,
      paused: !!animatingElement.pause,
      delayed: !!animatingElement.delay,
    },
  };

  // If the element is not in the Set...
  if (!animatingElements.has(statefulAnimatingElement)) {
    // If it has a delay and is not paused, set a timer to clear delayed state.
    if (
      statefulAnimatingElement.state.delayed &&
      !statefulAnimatingElement.state.paused
    ) {
      setTimeout(() => {
        statefulAnimatingElement.state.delayed = false;
      }, statefulAnimatingElement.delay);
    }

    animatingElements.add(statefulAnimatingElement);
  }

  let startFn: () => void = () => {};
  let pauseFn: () => void = () => {};
  let stopFn: (element: StatefulGravityAnimatingElement) => void = () => {};

  // Only start the frameloop if there are elements to animate.
  if (animatingElements.size > 0) {
    const { start, stop } = rAF();

    startFn = () => {
      if (!isFrameloopActive) {
        isFrameloopActive = true;
        start(
          update<StatefulGravityAnimatingElement>({
            animatingElements,
            checkReversePlayState: checkReverseGravityPlayState,
            applyForceForStep: applyGravitationalForceForStep,
            checkStoppingCondition: checkGravityStoppingCondition,
          })
        );

        // Handle starting paused elements on delay if both properties are specified.
        for (const element of animatingElements) {
          if (element.state.paused) {
            if (element.state.delayed) {
              setTimeout(() => {
                element.state.delayed = false;
              }, element.delay);
            }

            element.state.paused = false;
          }
        }
      }
    };

    pauseFn = () => {
      stop();
      isFrameloopActive = false;
    };

    stopFn = (element: StatefulGravityAnimatingElement) => {
      if (animatingElements.has(element)) {
        animatingElements.delete(element);
      }

      stop();
      isFrameloopActive = false;
    };
  }

  return {
    start: startFn,
    stop: stopFn,
    pause: pauseFn,
    element: statefulAnimatingElement,
  };
}
