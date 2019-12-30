import React from 'react';

import { CSSPairs, getInterpolatorForPair } from '../helpers/pairs';
import { Friction1DParams, friction1D } from '../animation/friction';

type UseFrictionArgs = CSSPairs &
  Omit<Friction1DParams, 'onUpdate' | 'onComplete'>;

export const useFriction = <M extends HTMLElement>({
  from,
  to,
  config,
}: UseFrictionArgs): [
  { ref: React.MutableRefObject<M | null> },
  () => void
] => {
  /**
   * Store a ref to the DOM element we'll be animating.
   * A user will spread this ref onto their own element, which
   * is what allows us to directly update the style property
   * without triggering rerenders.
   */
  const ref = React.useRef<M>(null);

  const [stop] = React.useMemo(() => {
    const { interpolator, property, values } = getInterpolatorForPair({
      from,
      to,
    });

    return friction1D({
      config,
      onUpdate: ({ velocity }) => {
        const value = interpolator({
          range: [config.velocity, 0],
          domain: [values.from, values.to],
          value: velocity[0],
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

  return [{ ref }, stop];
};
