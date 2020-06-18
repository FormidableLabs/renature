import React from 'react';

import {
  Gravity2DParams,
  gravity2D,
  Controller,
  Gravity2DController,
  gravity2DDefaultConfig,
} from '../animation';

type UseGravity2DArgs = {
  config?: Gravity2DParams['config'];
  pause?: boolean;
  delay?: number;
  onFrame?: () => void;
  onAnimationComplete?: () => void;
  disableHardwareAcceleration?: boolean;
};

export const useGravity2D = <M extends HTMLElement | SVGElement = any>({
  config = gravity2DDefaultConfig,
  pause = false,
  delay,
  onFrame,
  onAnimationComplete,
  disableHardwareAcceleration = false,
}: UseGravity2DArgs): [
  { ref: React.MutableRefObject<M | null> },
  Controller & Gravity2DController
] => {
  /**
   * Store a ref to the mover element we'll be animating.
   * A user will spread this ref onto their own element, which
   * is what allows us to directly update the style property
   * without triggering rerenders.
   */
  const moverRef = React.useRef<M | null>(null);

  const { controller } = React.useMemo(
    () =>
      gravity2D({
        config,
        onUpdate: ({ position: [x, y] }) => {
          moverRef.current &&
            (moverRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)${
              disableHardwareAcceleration ? '' : ' translateZ(0)'
            }`);

          if (onFrame) {
            onFrame();
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

  React.useLayoutEffect(() => {
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
