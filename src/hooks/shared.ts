import type { RefObject, MutableRefObject, CSSProperties } from 'react';

import { AnimationCache, PlayState, VectorSetter } from '../animation';
import type { CSSPairs, InterpolatedResult } from '../parsers';

interface OnUpdateParams<E extends HTMLElement | SVGElement> {
  interpolators: InterpolatedResult<any, any>[];
  maxPosition: number;
  dimension: 'x' | 'y';
  ref: RefObject<E>;
  i: number;
  cache: MutableRefObject<AnimationCache>;
  onFrame?: (progress: number) => void;
}

/**
 * The onUpdate callback to execute on each call to requestAnimationFrame.
 * Each individual CSS pair has its own interpolator function to return an
 * interpolated result based on the state of the physics tween.
 */
export const onUpdate = <E extends HTMLElement | SVGElement>({
  interpolators,
  maxPosition,
  dimension,
  ref,
  i,
  cache,
  onFrame,
}: OnUpdateParams<E>): VectorSetter => ({ position }) => {
  interpolators.forEach(({ interpolator, property, values }) => {
    const value = interpolator({
      range: [0, maxPosition],
      domain: [values.from, values.to],
      value: position[dimension === 'x' ? 0 : 1],
    });

    if (ref.current) {
      ref.current.style[property as any] = `${value}`;
    }

    if (onFrame) {
      const progress = position[0] / maxPosition;
      onFrame(progress);
    }

    // Update the cache of derived animation values.
    const cachedValue = cache.current.get(i) ?? {};

    cache.current.set(i, {
      ...cachedValue,
      [property]: value,
    });
  });
};

interface OnCompleteParams<E extends HTMLElement | SVGElement> {
  interpolators: InterpolatedResult<any, any>[];
  ref: RefObject<E>;
  i: number;
  cache: MutableRefObject<AnimationCache>;
  onAnimationComplete?: () => void;
}

// The onComplete callback to execute when an animation finishes.
export const onComplete = <E extends HTMLElement | SVGElement>({
  interpolators,
  ref,
  i,
  cache,
  onAnimationComplete,
}: OnCompleteParams<E>) => (playState?: PlayState): void => {
  interpolators.forEach(({ property, values }) => {
    const isNearEnd =
      (playState === PlayState.Forward &&
        ref.current?.style[property as any] !== values.to) ||
      (playState === PlayState.Reverse &&
        ref.current?.style[property as any] !== values.from);

    // Ensure our animation has reached the ending value when the physics stopping condition has been reached.
    if (ref.current && isNearEnd) {
      ref.current.style[property as any] = `${
        playState === PlayState.Forward ? values.from : values.to
      }`;

      // Clear the cache for this particular property.
      const { [property]: _, ...cachedValue } = cache.current.get(i) ?? {};

      if (Object.keys(cachedValue).length > 0) {
        cache.current.set(i, cachedValue);
      } else {
        cache.current.delete(i);
      }
    }
  });

  onAnimationComplete?.();
};

interface CheckCacheParams {
  cache: MutableRefObject<AnimationCache>;
  index: number;
  from: CSSProperties;
  to: CSSProperties;
}

export const checkAnimationCache = ({
  cache,
  index,
  from,
  to,
}: CheckCacheParams): CSSPairs => {
  const cachedFrom = cache.current.get(index);

  if (cachedFrom && Object.keys(cachedFrom) === Object.keys(to)) {
    return {
      from: cachedFrom,
      to,
    };
  }

  return {
    from,
    to,
  };
};
