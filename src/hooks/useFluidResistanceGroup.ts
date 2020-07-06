import { createRef, useMemo, useLayoutEffect, useCallback } from 'react';

import { CSSPairs, getInterpolatorsForPairs } from '../parsers';
import {
  FluidResistanceConfig,
  fluidResistanceDefaultConfig,
  fluidResistanceGroup,
  HooksParams,
  Controller,
} from '../animation';
import { getFluidPositionAtTerminalVelocity } from '../forces';

export type UseFluidResistanceArgs = CSSPairs &
  HooksParams & {
    config?: FluidResistanceConfig;
  };

export const useFluidResistanceGroup = <
  M extends HTMLElement | SVGElement = any
>(
  n: number,
  fn: (index: number) => UseFluidResistanceArgs
): [{ ref: React.MutableRefObject<M | null> }[], Controller] => {
  const nodes = useMemo(
    () =>
      new Array(n).fill(undefined).map((_, i) => {
        // Run the supplied config generator for each node to animate.
        const props = fn(i);

        // Create the ref to store the animating node.
        const ref = createRef<M>();

        // Derive interpolator functions for the supplied CSS properties.
        const interpolators = getInterpolatorsForPairs(
          {
            from: props.from,
            to: props.to,
          },
          props.disableHardwareAcceleration
        );
        const config = props.config || fluidResistanceDefaultConfig;
        const maxPosition = getFluidPositionAtTerminalVelocity(config);

        const { start, stop, pause, element } = fluidResistanceGroup({
          config,
          onUpdate: ({ position }) => {
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
          },
          onComplete: () => {
            // Ensure our animation has reached the to value when the physics stopping
            // condition has been reached.
            interpolators.forEach(({ property, values }) => {
              if (
                ref.current &&
                ref.current.style[property as any] !== values.to
              ) {
                ref.current.style[property as any] = values.to;
              }
            });

            if (props.onAnimationComplete) {
              props.onAnimationComplete();
            }
          },
          infinite: props.infinite,
          delay: props.delay,
          pause: props.pause,
        });

        return { props, ref, controller: { start, stop, pause }, element };
      }),
    [n, fn]
  );

  useLayoutEffect(() => {
    nodes.forEach(({ controller, props }) => {
      if (!props.pause) {
        controller.start();
      }
    });

    return () => {
      nodes.forEach(({ controller, element }) => {
        controller.stop(element);
      });
    };
  }, [nodes]);

  const startAll = useCallback(
    () => nodes.forEach(({ controller }) => controller.start()),
    [nodes]
  );
  const pauseAll = useCallback(
    () => nodes.forEach(({ controller }) => controller.pause()),
    [nodes]
  );
  const stopAll = useCallback(
    () => nodes.forEach(({ controller, element }) => controller.stop(element)),
    [nodes]
  );

  return [nodes, { start: startAll, stop: stopAll, pause: pauseAll }];
};
