import React from 'react';

import { Gravity2DParams, gravity2D, VectorSetter } from '../animation/gravity';

type UseGravity2DArgs = Omit<Gravity2DParams, 'onUpdate'>;

export const useGravity2D = <M extends HTMLElement = any>({
  config,
}: UseGravity2DArgs): [
  { ref: React.MutableRefObject<M | null> },
  () => void,
  VectorSetter
] => {
  /**
   * Store a ref to the mover element we'll be animating.
   * A user will spread this ref onto their own element, which
   * is what allows us to directly update the style property
   * without triggering rerenders.
   */
  const moverRef = React.useRef<M>(null);

  const [stop, updateAttractor] = React.useMemo(
    () =>
      gravity2D({
        config,
        onUpdate: ({ position: [x, y] }) => {
          moverRef.current &&
            (moverRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`);
        },
      }),
    [config]
  );

  return [{ ref: moverRef }, stop, updateAttractor];
};
