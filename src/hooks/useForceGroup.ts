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
  HooksParams,
  Controller,
  AnimatingElement,
  AnimationCache,
  AnimationGroup,
} from '../animation';

import { onComplete, onUpdate } from './shared';

type UseForceGroupConfig<C> = CSSPairs & HooksParams & { config?: C };

interface UseForceGroupParams<C, E extends HTMLElement | SVGElement> {
  n: number;
  fn: (index: number) => UseForceGroupConfig<C>;
  defaultConfig: C;
  getMaxDistance: (config: C) => number;
  deriveGroup: (elements: AnimatingElement<C, E>[]) => AnimationGroup<C>;
  dimension: 'x' | 'y';
}

export const useForceGroup = <C, E extends HTMLElement | SVGElement>({
  n,
  fn,
  defaultConfig,
  getMaxDistance,
  deriveGroup,
  dimension,
}: UseForceGroupParams<C, E>): [{ ref: RefObject<E> }[], Controller] => {
  // Set up a cache to store interpolated CSS state.
  const cache = useRef<AnimationCache>(new Map());

  const { elements, start, stop, pause } = useMemo(() => {
    const animatingElements: AnimatingElement<C, E>[] = new Array(n)
      .fill(undefined)
      .map((_, i) => {
        // Run the supplied config generator for each element to animate.
        const props = fn(i);

        // Create the ref to store the animating element.
        const ref = createRef<E>();

        // Derive interpolator functions for the supplied CSS properties.
        // Read from the cache, if populated, to determine the from value.
        const interpolators = getInterpolatorsForPairs(
          {
            from: cache.current.get(i) ?? props.from,
            to: props.to,
          },
          props.disableHardwareAcceleration
        );
        const config = props.config || defaultConfig;

        // Determine the maximum position the mover will reach based on the configuration.
        const maxPosition = getMaxDistance(config);

        return {
          ref,
          config,
          onUpdate: onUpdate({
            interpolators,
            maxPosition,
            dimension,
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
          repeat: props.repeat,
          delay: props.delay,
          pause: props.pause,
        };
      });

    return deriveGroup(animatingElements);
  }, [n, fn, defaultConfig, getMaxDistance, deriveGroup, dimension]);

  useLayoutEffect(() => {
    start();

    return stop;
  }, [start, stop]);

  const startAll = useCallback(() => start({ isImperativeStart: true }), [
    start,
  ]);

  const set = useCallback<(target: CSSProperties, idx?: number) => void>(
    (target, idx) => {
      const updatingElements =
        typeof idx !== 'undefined' ? [elements[idx]] : elements;
      let start = () => {};

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
        const maxPosition = getMaxDistance(el.config);

        const { elements: updatedElements, start: run } = deriveGroup([
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
            repeat: el.repeat,
          },
        ]);

        elements[idx ?? i].ref = updatedElements[i].ref;
        start = run;
      });

      start();
    },
    [fn, elements, getMaxDistance, deriveGroup]
  );

  return [
    elements.map(({ ref }) => ({ ref })),
    { start: startAll, stop, pause, set },
  ];
};
