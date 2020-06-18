import React from 'react';

import { CSSPairs, getInterpolatorsForPairs } from '../parsers/pairs';
import {
  Gravity1DParams,
  gravity1D,
  Controller,
  gravityDefaultConfig,
  AnimationParams,
} from '../animation';

type UseGravityArgs = CSSPairs &
  Omit<AnimationParams, 'onUpdate' | 'onComplete'> & {
    config?: Gravity1DParams['config'];
  };

export const useGravity = <M extends HTMLElement | SVGElement = any>({
  from,
  to,
  config = gravityDefaultConfig,
  pause = false,
  delay,
  infinite,
  onFrame,
  onAnimationComplete,
  disableHardwareAcceleration,
}: UseGravityArgs): [{ ref: React.MutableRefObject<M | null> }, Controller] => {
  /**
   * Store a ref to the DOM element we'll be animating.
   * A user will spread this ref onto their own element, which
   * is what allows us to directly update the style property
   * without triggering rerenders.
   */
  const ref = React.useRef<M | null>(null);

  const { controller } = React.useMemo(() => {
    const interpolators = getInterpolatorsForPairs(
      { from, to },
      disableHardwareAcceleration
    );

    return gravity1D({
      config,
      onUpdate: ({ position }) => {
        interpolators.forEach(({ interpolator, property, values }) => {
          const value = interpolator({
            range: [0, config.r],
            domain: [values.from, values.to],
            value: position[0],
          });

          if (ref.current) {
            ref.current.style[property as any] = `${value}`;
          }

          if (onFrame) {
            const progress = position[0] / config.r;
            onFrame(progress);
          }
        });
      },
      onComplete: () => {
        /**
         * Ensure our animation has reached the to value when the physics stopping
         * condition has been reached.
         */
        interpolators.forEach(({ property, values }) => {
          if (ref.current && ref.current.style[property as any] !== values.to) {
            ref.current.style[property as any] = values.to;
          }
        });

        if (onAnimationComplete) {
          onAnimationComplete();
        }
      },
      infinite,
    });
  }, [
    from,
    to,
    config,
    infinite,
    onFrame,
    onAnimationComplete,
    disableHardwareAcceleration,
  ]);

  React.useLayoutEffect(() => {
    // Declarative animation - start immediately.
    if (!pause && !delay) {
      controller.start();
    }

    // Declarative animation with delay – start after delay.
    let timerId: number;
    if (!pause && delay) {
      timerId = window.setTimeout(() => {
        controller.start();
      }, delay);
    }

    return () => {
      timerId && window.clearTimeout(timerId);

      // Ensure we cancel any running animation on unmount.
      controller.stop();
    };
  }, [pause, delay, controller]);

  return [{ ref }, controller];
};
