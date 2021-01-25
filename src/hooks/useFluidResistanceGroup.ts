import {
  createRef,
  useRef,
  useMemo,
  useLayoutEffect,
  useCallback,
  CSSProperties,
  RefObject,
} from 'react';

import { CSSPairs, getInterpolatorsForPairs, deriveStyle } from '../parsers';
import {
  FluidResistanceConfig,
  fluidResistanceDefaultConfig,
  fluidResistanceGroup,
  HooksParams,
  Controller,
  AnimatingElement,
  AnimationCache,
} from '../animation';
import { getFluidPositionAtTerminalVelocity } from '../forces';

import { onUpdate, onComplete } from './shared';

export type UseFluidResistanceArgs = CSSPairs &
  HooksParams & {
    config?: FluidResistanceConfig;
  };

export const useFluidResistanceGroup = <
  E extends HTMLElement | SVGElement = any
>(
  n: number,
  fn: (index: number) => UseFluidResistanceArgs
): [{ ref: RefObject<E> }[], Controller] => {
  // Set up a cache to store interpolated CSS state.
  const cache = useRef<AnimationCache>(new Map());

  const { elements, start, stop, pause } = useMemo(() => {
    const animatingElements: AnimatingElement<
      FluidResistanceConfig,
      E
    >[] = new Array(n).fill(undefined).map((_, i) => {
      // Run the supplied config generator for each element to animate.
      const props = fn(i);

      // Create the ref to store the animating element.
      const ref = createRef<E>();

      // Derive interpolator functions for the supplied CSS properties.
      const interpolators = getInterpolatorsForPairs(
        {
          from: cache.current.get(i) ?? props.from,
          to: props.to,
        },
        props.disableHardwareAcceleration
      );
      const config = props.config || fluidResistanceDefaultConfig;

      // Determine the maximum position the mover will reach based on the configuration.
      const maxPosition = getFluidPositionAtTerminalVelocity(config);

      return {
        ref,
        config,
        onUpdate: onUpdate({
          interpolators,
          maxPosition,
          dimension: 'y',
          ref,
          i,
          cache,
          onFrame: props.onFrame,
        }),
        onComplete: onComplete({
          interpolators,
          ref,
          i,
          cache,
        }),
        infinite: props.infinite,
        delay: props.delay,
        pause: props.pause,
      };
    });

    return fluidResistanceGroup(animatingElements);
  }, [n, fn]);

  const set = useCallback<(target: CSSProperties, idx?: number) => void>(
    (target, idx) => {
      const updatingElements =
        typeof idx !== 'undefined' ? [elements[idx]] : elements;

      updatingElements.forEach((el, i) => {
        // Derive props based on the original index, if passed, or the mapped
        // index if calling controller.set on all elements.
        const props = fn(idx ?? i);

        // Derive the element's current style for the given to property.
        const { from, to } = deriveStyle(el.ref.current, target);

        const interpolators = getInterpolatorsForPairs({
          from,
          to,
        });

        // Determine the maximum position the mover will reach based on the configuration.
        const maxPosition = getFluidPositionAtTerminalVelocity(el.config);

        const { elements: updatedElements, start } = fluidResistanceGroup([
          {
            ref: el.ref,
            config: el.config,
            onUpdate: onUpdate({
              interpolators,
              maxPosition,
              dimension: 'x',
              ref: el.ref,
              i,
              cache,
              onFrame: props.onFrame,
            }),
            onComplete: onComplete({
              interpolators,
              ref: el.ref,
              i,
              cache,
            }),
            infinite: el.infinite,
          },
        ]);

        elements[i].ref = updatedElements[i].ref;
        start();
      });
    },
    [fn, elements]
  );

  useLayoutEffect(() => {
    start();

    return stop;
  }, [start, stop]);

  const startAll = useCallback(() => start({ isImperativeStart: true }), [
    start,
  ]);

  return [
    elements.map(({ ref }) => ({ ref })),
    { start: startAll, stop, pause, set },
  ];
};
