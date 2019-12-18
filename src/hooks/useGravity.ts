import React from 'react';

import { CSSPairs, getInterpolatorForPair } from '../helpers/pairs';
import { Gravity1DParams, gravity1D } from '../animation/gravity';

type UseGravityArgs = CSSPairs & Omit<Gravity1DParams, 'onUpdate'>;

export const useGravity = <M extends HTMLElement>({
  from,
  to,
  config,
}: UseGravityArgs): [{ ref: React.MutableRefObject<M | null> }, () => void] => {
  /**
   * Store a ref to the DOM element we'll be animating.
   * A user will spread this ref onto their own element, which
   * is what allows us to directly update the style property
   * without triggering rerenders.
   */
  const ref = React.useRef<M>(null);

  const [stop] = React.useMemo(
    () =>
      gravity1D({
        config,
        onUpdate: ({ position }) => {
          const { interpolator, property, values } = getInterpolatorForPair({
            from,
            to,
          });

          const value = interpolator({
            range: [0, config.r],
            domain: [values.from, values.to],
            value: position[0],
          });

          ref.current && (ref.current.style[property as any] = `${value}`);
        },
      }),
    [from, to, config]
  );

  return [{ ref }, stop];
};
