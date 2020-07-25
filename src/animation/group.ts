import {
  AnimatingElement,
  StatefulAnimatingElement,
  AnimationCallbacks,
} from './types';
import { rAF, update } from '../rAF';

export function group<C>(
  elements: AnimatingElement<C>[],
  initialState: (
    element: AnimatingElement<C>
  ) => StatefulAnimatingElement<C>['state'],
  callbacks: AnimationCallbacks<C>
) {
  const animatingElements = new Set<StatefulAnimatingElement<C>>();
  let isFrameloopActive = false;

  elements.forEach(element => {
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

  let startFn: () => void = () => {};
  let pauseFn: () => void = () => {};
  let stopFn: (element: StatefulAnimatingElement<C>) => void = () => {};

  // Only start the frameloop if there are elements to animate.
  if (animatingElements.size > 0) {
    const { start, stop } = rAF();

    startFn = () => {
      if (!isFrameloopActive) {
        isFrameloopActive = true;
        start(
          update<StatefulAnimatingElement<C>>({
            animatingElements,
            ...callbacks,
          })
        );

        for (const animatingElement of animatingElements) {
          if (animatingElement.state.paused) {
            // Handle starting paused elements on delay if both properties are specified.
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

    stopFn = (element: StatefulAnimatingElement<C>) => {
      if (animatingElements.has(element)) {
        animatingElements.delete(element);
      }

      pauseFn();
    };
  }

  return {
    start: startFn,
    pause: pauseFn,
    stop: stopFn,
    elements: Array.from(animatingElements),
  };
}
