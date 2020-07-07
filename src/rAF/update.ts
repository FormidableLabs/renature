import { StatefulAnimatingElement } from '../animation';
import { Entity } from '../forces';

interface UpdateParams<A> {
  animatingElements: Set<A>;
  checkReversePlayState: (animatingElement: A) => void;
  applyForceForStep: (animatingElement: A) => Entity;
  checkStoppingCondition: (animatingElement: A) => boolean;
}

/**
 * The core updater function ran inside requestAnimationFrame.
 * Iterates through all animating elements in the Set and updates
 * their local animation state.
 */
export function update<A extends StatefulAnimatingElement>({
  animatingElements,
  checkReversePlayState,
  applyForceForStep,
  checkStoppingCondition,
}: UpdateParams<A>) {
  return function loop(
    timestamp: DOMHighResTimeStamp,
    lastFrame: number,
    stop: () => void
  ) {
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
        // If the element is configured to animate infinitely...
        if (element.infinite) {
          // Check if we've reached the stopping condition for infinite animations.
          checkReversePlayState(element);
        }

        // Apply the selected force once for each step.
        element.state.mover = applyForceForStep(element);
      }

      // Conditions for stopping the physics animation.
      if (!element.infinite && checkStoppingCondition(element)) {
        element.onComplete();
        element.state.complete = true;
      } else {
        element.onUpdate({
          velocity: element.state.mover.velocity,
          position: element.state.mover.position,
        });
      }
    }

    const allAnimationsComplete =
      animatingElements.size > 0 &&
      Array.from(animatingElements).every(element => element.state.complete);

    if (allAnimationsComplete) {
      stop();
    }
  };
}
