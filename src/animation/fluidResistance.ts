import { rAF, update } from '../rAF';
import {
  applyForce,
  fluidResistanceForceV,
  gE,
  getFluidPositionAtTerminalVelocity,
} from '../forces';
import { vector as Vector, addf, multf } from '../core';
import { PlayState, AnimatingElement, StatefulAnimatingElement } from './types';

export interface FluidResistanceConfig {
  mass: number;
  rho: number;
  area: number;
  cDrag: number;
  settle?: boolean;
}

interface FluidResistanceAnimatingElement extends AnimatingElement {
  config: FluidResistanceConfig;
}

interface StatefulFluidResistanceAnimatingElement
  extends StatefulAnimatingElement {
  config: FluidResistanceConfig;
}

// A function to apply the drag force on each step in requestAnimationFrame.
function applyFluidResistanceForceForStep({
  state,
  config,
}: StatefulFluidResistanceAnimatingElement) {
  // If applying a settle effect, reverse the mover's velocity.
  if (
    config.settle &&
    state.playState === PlayState.Forward &&
    state.mover.position[1] >= state.maxDistance
  ) {
    state.mover = {
      ...state.mover,
      velocity: multf({ v: state.mover.velocity, s: -1 }),
      position: [0, state.maxDistance],
    };
  } else if (
    config.settle &&
    state.playState === PlayState.Reverse &&
    state.mover.position[1] <= 0
  ) {
    state.mover = {
      ...state.mover,
      velocity: multf({ v: state.mover.velocity, s: -1 }),
      position: [0, 0],
    };
  }

  const dragForce = fluidResistanceForceV({
    rho: config.rho,
    area: config.area,
    velocity: state.mover.velocity,
    cDrag: config.cDrag,
  });

  const gravitationalForce: Vector<number> = [0, state.mover.mass * gE];
  const netForce = addf({
    v1: dragForce,
    v2:
      state.playState === PlayState.Forward
        ? gravitationalForce
        : multf({ v: gravitationalForce, s: -1 }),
  });

  return applyForce({
    force: netForce,
    entity: state.mover,
    time: 0.001,
  });
}

/**
 * A function to check the current play state of the fluid resistance
 * animation and potentially reverse it.
 *
 * If a fluid resistance animation has infinite specified in its config
 * _and_ has reached its physics stopping condition of position >= position
 * at terminal velocity, we reset the initial parameters and reverse the
 * direction of the animation.
 */
function checkReverseFluidResistancePlayState({
  state,
  config,
}: StatefulFluidResistanceAnimatingElement) {
  const isOvershootingForward =
    state.playState === PlayState.Forward &&
    state.mover.position[1] >= state.maxDistance;
  const isOvershootingReverse =
    state.playState === PlayState.Reverse && state.mover.position[1] <= 0;
  // If applying a settle effect with looping, allow the settling to finish before reversing the animation.
  // We arbitrarily set this for now as a velocity <= 0.5 m/s.
  const isSettled = config.settle
    ? Math.abs(state.mover.velocity[1]) <= 0.5
    : true;

  if ((isOvershootingForward || isOvershootingReverse) && isSettled) {
    if (state.playState === PlayState.Forward) {
      state.mover = {
        ...state.mover,
        acceleration: [0, 0],
        velocity: [0, 0],
        position: [0, state.maxDistance],
      };
      state.playState = PlayState.Reverse;
    } else if (state.playState === PlayState.Reverse) {
      state.mover = {
        ...state.mover,
        acceleration: [0, 0],
        velocity: [0, 0],
        position: [0, 0],
      };
      state.playState = PlayState.Forward;
    }
  }
}

function checkFluidResistanceStoppingCondition({
  state,
}: StatefulFluidResistanceAnimatingElement) {
  return state.mover.position[1] >= state.maxDistance;
}

let isFrameloopActive = false;
const animatingElements = new Set<StatefulFluidResistanceAnimatingElement>();

/**
 * A function to take in a newly animating element and add it to the current Set of
 * animating elements. Delayed and paused elements are flagged so that they won't
 * be animated until their delay has elapsed or pause evlauates to true.
 */
export function fluidResistanceGroup(
  animatingElement: FluidResistanceAnimatingElement
) {
  // Take the initial animating element configuration and extend it with some state properties.
  const statefulAnimatingElement: StatefulFluidResistanceAnimatingElement = {
    ...animatingElement,
    state: {
      mover: {
        mass: animatingElement.config.mass,
        acceleration: [0, 0],
        velocity: [0, 0],
        position: [0, 0],
      },
      playState: PlayState.Forward,
      maxDistance: getFluidPositionAtTerminalVelocity(animatingElement.config),
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
  let stopFn: (
    element: StatefulFluidResistanceAnimatingElement
  ) => void = () => {};

  // Only start the frameloop if there are elements to animate.
  if (animatingElements.size > 0) {
    const { start, stop } = rAF();

    startFn = () => {
      if (!isFrameloopActive) {
        isFrameloopActive = true;
        start(
          update<StatefulFluidResistanceAnimatingElement>({
            animatingElements,
            checkReversePlayState: checkReverseFluidResistancePlayState,
            applyForceForStep: applyFluidResistanceForceForStep,
            checkStoppingCondition: checkFluidResistanceStoppingCondition,
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

    stopFn = (element: StatefulFluidResistanceAnimatingElement) => {
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
