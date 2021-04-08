import { RefObject, useRef, useMemo, useLayoutEffect } from 'react';

import {
  Gravity2DParams,
  gravity2D,
  Controller,
  Gravity2DController,
  gravity2DDefaultConfig,
  VectorSetter,
} from '../animation';

type UseGravity2DArgs = {
  config?: Gravity2DParams['config'];
  pause?: boolean;
  delay?: number;
  onFrame?: VectorSetter;
  onAnimationComplete?: () => void;
  disableHardwareAcceleration?: boolean;
};

export const useGravity2D = <E extends HTMLElement | SVGElement = any>({
  config = gravity2DDefaultConfig,
  pause = false,
  delay,
  onFrame,
  onAnimationComplete,
  disableHardwareAcceleration = false,
}: UseGravity2DArgs): [
  { ref: RefObject<E> },
  Controller & Gravity2DController
] => {
  /**
   * Store a ref to the mover element we'll be animating.
   * A user will spread this ref onto their own element, which
   * is what allows us to directly update the style property
   * without triggering rerenders.
   */
  const moverRef = useRef<E>(null);

  const { controller } = useMemo(
    () =>
      gravity2D({
        config,
        onUpdate: ({ position, velocity, acceleration }) => {
          moverRef.current &&
            (moverRef.current.style.transform = `translate(${position[0]}px, ${
              position[1]
            }px) translate(-50%, -50%)${
              disableHardwareAcceleration ? '' : ' translateZ(0)'
            }`);

          if (onFrame) {
            onFrame({ position, velocity, acceleration });
          }
        },
        onComplete: () => {
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        },
      }),
    [config, onFrame, onAnimationComplete, disableHardwareAcceleration]
  );

  useLayoutEffect(() => {
    if (!pause && !delay) {
      controller.start();
    }

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

  return [{ ref: moverRef }, controller];
};
