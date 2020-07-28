import { createRef, useMemo, useLayoutEffect, useCallback } from 'react';

import { CSSPairs, getInterpolatorsForPairs } from '../parsers';
import {
  FluidResistanceConfig,
  fluidResistanceDefaultConfig,
  fluidResistanceGroup,
  HooksParams,
  Controller,
  VectorSetter,
  AnimatingElement,
} from '../animation';
import { getFluidPositionAtTerminalVelocity } from '../forces';

export type UseFluidResistanceArgs = CSSPairs &
  HooksParams & {
    config?: FluidResistanceConfig;
  };

export const useFluidResistanceGroup = <
  E extends HTMLElement | SVGElement = any
>(
  n: number,
  fn: (index: number) => UseFluidResistanceArgs
): [{ ref: React.RefObject<E | null> }[], Controller] => {
  const { elements, start, stop, pause } = useMemo(() => {
    const animatingElements: AnimatingElement<
      FluidResistanceConfig,
      E | null
    >[] = new Array(n).fill(undefined).map((_, i) => {
      // Run the supplied config generator for each element to animate.
      const props = fn(i);

      // Create the ref to store the animating element.
      const ref = createRef<E>();

      // Derive interpolator functions for the supplied CSS properties.
      const interpolators = getInterpolatorsForPairs(
        {
          from: props.from,
          to: props.to,
        },
        props.disableHardwareAcceleration
      );
      const config = props.config || fluidResistanceDefaultConfig;

      // Determine the maximum position the mover will reach based on the configuration.
      const maxPosition = getFluidPositionAtTerminalVelocity(config);

      // Define the onUpdate function to execute on each call to requestAnimationFrame.
      // Interpolate each CSS value being animated according to the progress of the physics tween.
      const onUpdate: VectorSetter = ({ position }) => {
        interpolators.forEach(({ interpolator, property, values }) => {
          const value = interpolator({
            range: [0, maxPosition],
            domain: [values.from, values.to],
            value: position[1],
          });

          if (ref.current) {
            ref.current.style[property as any] = `${value}`;
          }

          if (props.onFrame) {
            const progress = position[1] / maxPosition;
            props.onFrame(progress);
          }
        });
      };

      // Define the onComplete function to execute when the animation ends.
      // This mimics the browser's animationend event.
      const onComplete = () => {
        // Ensure our animation has reached the to value when the physics stopping
        // condition has been reached.
        interpolators.forEach(({ property, values }) => {
          if (ref.current && ref.current.style[property as any] !== values.to) {
            ref.current.style[property as any] = values.to;
          }
        });

        if (props.onAnimationComplete) {
          props.onAnimationComplete();
        }
      };

      return {
        ref,
        config,
        onUpdate,
        onComplete,
        infinite: props.infinite,
        delay: props.delay,
        pause: props.pause,
      };
    });

    return fluidResistanceGroup(animatingElements);
  }, [n, fn]);

  useLayoutEffect(() => {
    start();

    return () => {
      elements.forEach(stop);
    };
  }, [start, stop, elements]);

  const startAll = useCallback(() => start({ isImperativeStart: true }), [
    start,
  ]);
  const stopAll = useCallback(() => elements.forEach(stop), [elements, stop]);

  return [
    elements.map(({ ref }) => ({ ref })),
    { start: startAll, stop: stopAll, pause },
  ];
};
