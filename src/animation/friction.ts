import { PlayState, AnimatingElement, StatefulAnimatingElement } from './types';
import { getMaxDistanceFriction, frictionForceV, applyForce } from '../forces';
import { rAF, update } from '../rAF';

export interface FrictionConfig {
  mu: number;
  mass: number;
  initialVelocity: number;
}

interface FrictionAnimatingElement extends AnimatingElement {
  config: FrictionConfig;
}

interface StatefulFrictionAnimatingElement extends StatefulAnimatingElement {
  config: FrictionConfig;
}

// A function to apply the force of friction on each step in requestAnimationFrame.
function applyFrictionForceForStep({
  state: { mover },
  config,
}: StatefulFrictionAnimatingElement) {
  const force = frictionForceV({
    mu: config.mu,
    mass: config.mass,
    velocity: mover.velocity,
  });

  return applyForce({ force, entity: mover, time: 0.001 });
}

/**
 * A function to check the current play state of the friction animation
 * and potentially reverse it.
 *
 * If a friction animation has infinite specified in its config _and_
 * has reached its physics stopping condition of velocity 0, we reset
 * the initial parameters and reverse the direction of the animation.
 */
function checkReverseFrictionPlayState({
  state,
  config,
}: StatefulFrictionAnimatingElement) {
  if (state.mover.velocity[0] <= 0 && state.playState === PlayState.Forward) {
    state.mover = {
      ...state.mover,
      acceleration: [0, 0],
      velocity: [config.initialVelocity * -1, 0],
      position: [state.maxDistance, 0],
    };
    state.playState = PlayState.Reverse;
  } else if (
    state.mover.velocity[0] >= 0 &&
    state.playState === PlayState.Reverse
  ) {
    state.mover = {
      ...state.mover,
      acceleration: [0, 0],
      velocity: [config.initialVelocity, 0],
      position: [0, 0],
    };
    state.playState = PlayState.Forward;
  }
}

function checkFrictionStoppingCondition({
  state,
}: StatefulFrictionAnimatingElement) {
  return state.mover.velocity[0] <= 0;
}

let isFrameloopActive = false;
const animatingElements = new Set<StatefulFrictionAnimatingElement>();

/**
 * A function to take in a newly animating element and add it to the current Set of
 * animating elements. Delayed and paused elements are flagged so that they won't
 * be animated until their delay has elapsed or pause evlauates to true.
 */
export function frictionGroup(animatingElement: FrictionAnimatingElement) {
  // Take the initial animating element configuration and extend it with some state properties.
  const statefulAnimatingElement: StatefulFrictionAnimatingElement = {
    ...animatingElement,
    state: {
      mover: {
        mass: animatingElement.config.mass,
        acceleration: [0, 0],
        velocity: [animatingElement.config.initialVelocity, 0],
        position: [0, 0],
      },
      playState: PlayState.Forward,
      maxDistance: getMaxDistanceFriction({
        mu: animatingElement.config.mu,
        initialVelocity: animatingElement.config.initialVelocity,
      }),
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
  let stopFn: (element: StatefulFrictionAnimatingElement) => void = () => {};

  // Only start the frameloop if there are elements to animate.
  if (animatingElements.size > 0) {
    const { start, stop } = rAF();

    startFn = () => {
      if (!isFrameloopActive) {
        isFrameloopActive = true;
        start(
          update<StatefulFrictionAnimatingElement>({
            animatingElements,
            checkReversePlayState: checkReverseFrictionPlayState,
            applyForceForStep: applyFrictionForceForStep,
            checkStoppingCondition: checkFrictionStoppingCondition,
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

    stopFn = (element: StatefulFrictionAnimatingElement) => {
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
