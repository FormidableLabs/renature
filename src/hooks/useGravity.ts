import React from 'react';

import { CSSPairs, getInterpolatorsForPairs } from '../helpers/pairs';
import { Gravity1DParams, gravity1D, Controller } from '../animation';

type UseGravityArgs = CSSPairs &
  Omit<Gravity1DParams, 'onUpdate' | 'onComplete'>;

export const useGravity = <M extends HTMLElement>({
  from,
  to,
  config,
  immediate = true,
  delay,
  infinite,
}: UseGravityArgs): [{ ref: React.MutableRefObject<M | null> }, Controller] => {
  /**
   * Store a ref to the DOM element we'll be animating.
   * A user will spread this ref onto their own element, which
   * is what allows us to directly update the style property
   * without triggering rerenders.
   */
  const ref = React.useRef<M>(null);

  const { controller } = React.useMemo(() => {
    const interpolators = getInterpolatorsForPairs({ from, to });

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
      },
      infinite,
    });
  }, [from, to, config, infinite]);

  const controllerRef = React.useRef<Controller>({
    start: controller.start,
    stop: () => {},
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

  return [{ ref }, controllerRef.current];
};
