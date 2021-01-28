import { rAF, update } from '../rAF';

import {
  AnimatingElement,
  StatefulAnimatingElement,
  AnimationCallbacks,
  AnimationGroup,
} from './types';

/**
 * A function to take in a set of elements and begin animating them.
 * Elements that are delayed or paused are instructed to animate once
 * their delay has elapsed or pause has been set to true.
 */
export function group<C>(
  elements: AnimatingElement<C>[],
  initialState: (
    element: AnimatingElement<C>
  ) => StatefulAnimatingElement<C>['state'],
  callbacks: AnimationCallbacks<C>
): AnimationGroup<C> {
  const animatingElements = new Set<StatefulAnimatingElement<C>>();
  let isFrameloopActive = false;

  elements.forEach((element) => {
    const animatingElement: StatefulAnimatingElement<C> = {
      ...element,
      state: initialState(element),
    };

    // If the element to animate is not in the Set...
    if (!animatingElements.has(animatingElement)) {
      // If it has a delay and is not paused, set a timer to clear delayed state.
      if (animatingElement.state.delayed && !animatingElement.state.paused) {
        setTimeout(() => {
          animatingElement.state.delayed = false;
        }, animatingElement.delay);
      }

      animatingElements.add(animatingElement);
    }
  });

  let startFn: AnimationGroup<C>['start'] = () => {};
  let pauseFn: AnimationGroup<C>['pause'] = () => {};
  let stopFn: AnimationGroup<C>['stop'] = () => {};

  // Only start the frameloop if there are elements to animate.
  if (animatingElements.size > 0) {
    const { start, stop } = rAF();

    startFn = (c = { isImperativeStart: false }) => {
      if (!isFrameloopActive) {
        isFrameloopActive = true;
        start(
          update<C>({
            animatingElements,
            ...callbacks,
          })
        );
      }

      if (c.isImperativeStart) {
        for (const animatingElement of animatingElements) {
          if (animatingElement.state.paused) {
            // Handle starting paused elements on a delay if both properties are specified.
            if (animatingElement.state.delayed) {
              setTimeout(() => {
                animatingElement.state.delayed = false;
              }, animatingElement.delay);
            }

            // Mark previously paused elements as active.
            animatingElement.state.paused = false;
          }
        }
      }
    };

    pauseFn = () => {
      stop();
      isFrameloopActive = false;
    };

    stopFn = () => {
      animatingElements.clear();
      stop();
      isFrameloopActive = false;
    };
  }

  return {
    start: startFn,
    pause: pauseFn,
    stop: stopFn,
    elements: Array.from(animatingElements),
  };
}
