import React from 'react';

import { CSSPairs, getInterpolatorForPair } from '../helpers/pairs';
import { Gravity1DParams, gravity1D, Controller } from '../animation';

type UseGravityArgs = CSSPairs &
  Omit<Gravity1DParams, 'onUpdate' | 'onComplete'>;

export const useGravity = <M extends HTMLElement>({
  from,
  to,
  config,
}: UseGravityArgs): [{ ref: React.MutableRefObject<M | null> }, Controller] => {
  /**
   * Store a ref to the DOM element we'll be animating.
   * A user will spread this ref onto their own element, which
   * is what allows us to directly update the style property
   * without triggering rerenders.
   */
  const ref = React.useRef<M>(null);

  const { controller } = React.useMemo(() => {
    const { interpolator, property, values } = getInterpolatorForPair({
      from,
      to,
    });

    return gravity1D({
      config,
      onUpdate: ({ position }) => {
        const value = interpolator({
          range: [0, config.r],
          domain: [values.from, values.to],
          value: position[0],
        });

        if (ref.current) {
          ref.current.style[property as any] = `${value}`;
        }
      },
      onComplete: () => {
        /**
         * Ensure our animation has reached the to value when the physics stopping
         * condition has been reached.
         */
        if (ref.current && ref.current.style[property as any] !== values.to) {
          ref.current.style[property as any] = values.to;
        }
      },
    });
  }, [from, to, config]);

  return [{ ref }, controller];
};
