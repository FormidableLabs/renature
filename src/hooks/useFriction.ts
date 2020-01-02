import React from 'react';

import { CSSPairs, getInterpolatorsForPairs } from '../helpers/pairs';
import { Friction1DParams, friction1D, Controller } from '../animation';
import { getMaxDistanceFriction } from '../forces';

type UseFrictionArgs = CSSPairs &
  Omit<Friction1DParams, 'onComplete' | 'onUpdate'>;

export const useFriction = <M extends HTMLElement>({
  from,
  to,
  config,
  immediate = true,
  delay,
}: UseFrictionArgs): [
  { ref: React.MutableRefObject<M | null> },
  Controller
] => {
  /**
   * Store a ref to the DOM element we'll be animating.
   * A user will spread this ref onto their own element, which
   * is what allows us to directly update the style property
   * without triggering rerenders.
   */
  const ref = React.useRef<M>(null);

  /**
   * Store a ref to the controller. This will allow a user to
   * start and stop animations at will.
   */
  const controllerRef = React.useRef<Controller>({
    start: () => ({ stop: () => {} }),
    stop: () => {},
  });

  const { controller } = React.useMemo(() => {
    const interpolators = getInterpolatorsForPairs({ from, to });

    return friction1D({
      config,
      onUpdate: ({ position }) => {
        interpolators.forEach(({ interpolator, property, values }) => {
          const value = interpolator({
            range: [
              0,
              getMaxDistanceFriction({
                mu: config.mu,
                initialVelocity: config.initialVelocity * 1000,
              }),
            ],
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
    });
  }, [from, to, config]);

  controllerRef.current = {
    ...controllerRef.current,
    ...controller,
  };

  React.useLayoutEffect(() => {
    if (immediate && !delay) {
      const { stop } = controller.start();
      controllerRef.current.stop = stop;
    }

    let timerId: number;
    if (immediate && delay) {
      timerId = setTimeout(() => {
        const { stop } = controller.start();
        controllerRef.current.stop = stop;
      }, delay);
    }

    return () => {
      timerId && clearTimeout(timerId);
    };
  }, [immediate, controller]);

  return [{ ref }, controllerRef.current];
};
