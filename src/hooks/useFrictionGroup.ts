import {
  createRef,
  useRef,
  useMemo,
  useLayoutEffect,
  useCallback,
  CSSProperties,
} from 'react';

import { CSSPairs, getInterpolatorsForPairs } from '../parsers';
import {
  FrictionConfig,
  frictionDefaultConfig,
  frictionGroup,
  HooksParams,
  Controller,
  VectorSetter,
  AnimatingElement,
} from '../animation';
import { getMaxDistanceFriction } from '../forces';

let _id = 0;
const cache = new Map<
  string,
  Record<number, Record<keyof CSSProperties, any>>
>();

export type UseFrictionArgs = CSSPairs &
  HooksParams & {
    config?: FrictionConfig;
  };

export const useFrictionGroup = <E extends HTMLElement | SVGElement = any>(
  n: number,
  fn: (index: number) => UseFrictionArgs
): [{ ref: React.RefObject<E | null> }[], Controller] => {
  const hookId = useRef(`friction_${_id++}`);

  const { elements, start, stop, pause } = useMemo(() => {
    const animatingElements: AnimatingElement<
      FrictionConfig,
      E | null
    >[] = new Array(n).fill(undefined).map((_, i) => {
      // Run the supplied config generator for each element to animate.
      const props = fn(i);

      // Create the ref to store the animating element.
      const ref = createRef<E>();

      // Derive interpolator functions for the supplied CSS properties.
      const interpolators = getInterpolatorsForPairs(
        {
          from: cache.get(hookId.current)?.[i] ?? props.from,
          to: props.to,
        },
        props.disableHardwareAcceleration
      );
      const config = props.config || frictionDefaultConfig;

      // Determine the maximum position the mover will reach based on the configuration.
      const maxPosition = getMaxDistanceFriction(config);

      // Define the onUpdate function to execute on each call to requestAnimationFrame.
      // Interpolate each CSS value being animated according to the progress of the physics tween.
      const onUpdate: VectorSetter = ({ position }) => {
        interpolators.forEach(({ interpolator, property, values }) => {
          const value = interpolator({
            range: [0, maxPosition],
            domain: [values.from, values.to],
            value: position[0],
          });

          if (ref.current) {
            ref.current.style[property as any] = `${value}`;
          }

          if (props.onFrame) {
            const progress = position[0] / maxPosition;
            props.onFrame(progress);
          }

          // Update the global cache of derived animation values.
          const currentCacheValue =
            cache.get(hookId.current)?.[i] ||
            ({} as Record<keyof CSSProperties, any>);

          cache.set(hookId.current, {
            [i]: {
              ...currentCacheValue,
              [property]: value,
            },
          });
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

            // Update the global cache of derived animation values.
            const currentCacheValue =
              cache.get(hookId.current)?.[i] ||
              ({} as Record<keyof CSSProperties, any>);

            cache.set(hookId.current, {
              [i]: {
                ...currentCacheValue,
                [property]: values.to,
              },
            });
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

    return frictionGroup(animatingElements);
  }, [n, fn]);

  useLayoutEffect(() => {
    const id = hookId.current;
    start();

    return () => {
      elements.forEach(stop);

      // Clean up the global cache of animation values.
      cache.delete(id);
    };
  }, [start, stop, elements]);

  const startAll = useCallback(() => start({ isImperativeStart: true }), [
    start,
  ]);
  const stopAll = useCallback(() => {
    elements.forEach(stop);

    // Clean up the global cache of animation values.
    cache.delete(hookId.current);
  }, [elements, stop]);

  return [
    elements.map(({ ref }) => ({ ref })),
    { start: startAll, stop: stopAll, pause },
  ];
};
