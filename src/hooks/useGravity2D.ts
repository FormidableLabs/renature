import React from 'react';

import {
  Gravity2DParams,
  gravity2D,
  Controller,
  Gravity2DController,
} from '../animation';

type UseGravity2DArgs = Omit<Gravity2DParams, 'onUpdate' | 'onComplete'>;

export const useGravity2D = <M extends HTMLElement = any>({
  config,
  immediate = true,
  delay,
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
  const moverRef = React.useRef<M>(null);

  const { controller } = React.useMemo(
    () =>
      gravity2D({
        config,
        onUpdate: ({ position: [x, y] }) => {
          moverRef.current &&
            (moverRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`);
        },
        onComplete: () => {},
      }),
    [config]
  );

  /**
   * Store a ref to the controller. This will allow a user to
   * start and stop animations at will.
   */
  const controllerRef = React.useRef<Controller & Gravity2DController>({
    start: controller.start,
    stop: () => {},
    updateAttractor: controller.updateAttractor,
  });

  React.useLayoutEffect(() => {
    if (immediate && !delay) {
      const { stop } = controller.start();
      controllerRef.current.stop = stop;
    }

    let timerId: NodeJS.Timeout;
    if (immediate && delay) {
      timerId = setTimeout(() => {
        const { stop } = controller.start();
        controllerRef.current.stop = stop;
      }, delay);
    }

    return () => {
      timerId && clearTimeout(timerId);
    };
  }, [immediate, delay, controller]);

  return [{ ref: moverRef }, controllerRef.current];
};
