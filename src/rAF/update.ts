import { StatefulAnimatingElement, AnimationCallbacks } from '../animation';

interface UpdateParams<C> extends AnimationCallbacks<C> {
  animatingElements: Set<StatefulAnimatingElement<C>>;
}

/**
 * The core updater function ran inside requestAnimationFrame.
 * Iterates through all animating elements in the Set and updates
 * their local animation state.
 */
export function update<C>({
  animatingElements,
  checkReversePlayState,
  applyForceForStep,
  checkStoppingCondition,
}: UpdateParams<C>) {
  return function loop(
    timestamp: DOMHighResTimeStamp,
    lastFrame: number,
    stop: () => void
  ): void {
    // Obtain the timestamp of the last frame.
    // If this is the first frame, use the current frame timestamp.
    let lastTime = lastFrame !== undefined ? lastFrame : timestamp;

    // If more than four frames have been dropped since the last frame,
    // just use the current frame timestamp.
    if (timestamp > lastTime + 64) {
      lastTime = timestamp;
    }

    // Determine the number of steps between the current frame and last recorded frame.
    const steps = Math.floor(timestamp - lastTime);

    // Iterate through the nodes.
    for (const element of animatingElements) {
      // If the element has finished animating, is paused, or is delayed, skip it.
      if (
        element.state.complete ||
        element.state.paused ||
        element.state.delayed
      ) {
        continue;
      }

      for (let i = 0; i < steps; i++) {
        // If the element is configured to repeat its animation...
        if (typeof element.repeat === 'number' && element.repeat >= 0) {
          // Check if we've reached the reversal condition for repeated animations.
          checkReversePlayState(element);
        }

        element.state.mover = applyForceForStep(element);
      }

      const shouldComplete =
        (typeof element.repeat !== 'number' || element.repeat <= 0) &&
        checkStoppingCondition(element);
      const repetitionsEclipsed = element.repeat === element.state.repeatCount;

      if (shouldComplete) {
        element.onComplete();
        element.state.complete = true;
      } else if (repetitionsEclipsed) {
        element.onComplete(element.state.playState);
        element.state.complete = true;
      } else {
        element.onUpdate({
          velocity: element.state.mover.velocity,
          position: element.state.mover.position,
          acceleration: element.state.mover.acceleration,
        });
      }
    }

    const allAnimationsComplete =
      animatingElements.size > 0 &&
      Array.from(animatingElements).every((element) => element.state.complete);

    if (allAnimationsComplete) {
      stop();
    }
  };
}
