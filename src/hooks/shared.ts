import type { RefObject, MutableRefObject, CSSProperties } from 'react';

import type {
  AnimationCache,
  HooksParams,
  PlayState,
  VectorSetter,
} from '../animation';
import type { CSSPairs, InterpolatedResult } from '../parsers';

interface OnUpdateParams<E extends HTMLElement | SVGElement> {
  interpolators: InterpolatedResult<any, any>[];
  maxPosition: number;
  dimension: 'x' | 'y';
  ref: RefObject<E>;
  i: number;
  cache: MutableRefObject<AnimationCache>;
  onFrame?: HooksParams['onFrame'];
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
}: OnUpdateParams<E>): VectorSetter => ({
  position,
  velocity,
  acceleration,
}) => {
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
      onFrame(progress, { position, velocity, acceleration });
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
      (playState === 'forward' &&
        ref.current?.style[property as any] !== values.to) ||
      (playState === 'reverse' &&
        ref.current?.style[property as any] !== values.from);

    // Ensure our animation has reached the ending value when the physics stopping condition has been reached.
    if (ref.current && isNearEnd) {
      ref.current.style[property as any] = `${
        playState === 'forward' ? values.from : values.to
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

interface DeriveAccessibleFromToParams {
  prefersReducedMotion: boolean;
  from: CSSProperties;
  to: CSSProperties;
  reducedMotion?: {
    from: CSSProperties;
    to: CSSProperties;
  };
}

/**
 * The deriveAccessibleFromTo function determines the correct from / to
 * combination to use for accessible animations. The algorithm:
 *
 * - If a user does not prefer reduced motion, return the base from / to combination.
 * - If the user does prefer reduced motion and there's a reducedMotion config applied,
 *   return the reducedMotion config.
 * - Else, immediately animate to the "to" state on the first frame to avoid animations
 *   when a user explicitly prefers reduced motion.
 */
export const deriveAccessibleFromTo = ({
  prefersReducedMotion,
  from,
  to,
  reducedMotion,
}: DeriveAccessibleFromToParams): CSSPairs => {
  if (!prefersReducedMotion) {
    return {
      from,
      to,
    };
  }

  if (prefersReducedMotion && reducedMotion) {
    return reducedMotion;
  }

  return {
    from: to,
    to,
  };
};

interface CheckAnimationCacheParams {
  cache: MutableRefObject<AnimationCache>;
  index: number;
  from: CSSProperties;
  to: CSSProperties;
}

/**
 * The checkAnimationCache functions inspects the hook's local animation cache to see
 * if there are animation properties applied. It also checks if the cached properties
 * match that of the "to" configuration, signaling it's safe to animate. Otherwise, use
 * the from and to specified in the configuration.
 */
export const checkAnimationCache = ({
  cache,
  index,
  from,
  to,
}: CheckAnimationCacheParams): CSSPairs => {
  const cachedFrom = cache.current.get(index);

  if (
    cachedFrom &&
    Object.keys(cachedFrom).every((k) =>
      Object.prototype.hasOwnProperty.call(to, k)
    )
  ) {
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
