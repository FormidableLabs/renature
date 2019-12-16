import { remapf, remapColor, rgba as RGBA } from '../interpolate';
import { normalizeColor, rgba } from './normalizeColor';

export interface CSSPairs {
  from: React.CSSProperties;
  to: React.CSSProperties;
}

export type CSSProperty = keyof React.CSSProperties;

const parsePair = (pairs: React.CSSProperties) =>
  Object.entries(pairs).map(([k, v]) => ({
    property: k as CSSProperty,
    value: v,
  }))[0];

export const parsePairs = ({ from, to }: CSSPairs) => ({
  from: parsePair(from),
  to: parsePair(to),
});

type Interpolator<T, R> = (params: {
  readonly range: [number, number];
  readonly domain: [T, T];
  readonly value: number;
}) => R;

interface InterpolatedResult<T, R> {
  interpolator: Interpolator<T, R>;
  property: CSSProperty;
  values: {
    from: any;
    to: any;
  };
}

export function getInterpolatorForPair(
  pairs: CSSPairs
): InterpolatedResult<number, number>;
export function getInterpolatorForPair(
  pairs: CSSPairs
): InterpolatedResult<RGBA<number>, string>;

export function getInterpolatorForPair({ from, to }: CSSPairs) {
  const {
    from: { value: fromValue, property: fromProperty },
    to: { value: toValue, property: toProperty },
  } = parsePairs({ from, to });

  const typeFrom = typeof fromValue;
  const typeTo = typeof toValue;

  if (typeFrom !== typeTo) {
    throw new Error(
      `from and to values have mismatching types. fromValue: ${fromValue} does not match toValue: ${toValue}.`
    );
  } else if (fromProperty !== toProperty) {
    throw new Error(
      `from and to are not the same property. fromProperty: ${fromProperty} does not match toProperty: ${toProperty}.`
    );
  }

  /**
   * If the types of the to and from properties on the animation configuration
   * are both numbers, use remapf as the interpolator. This will map the input
   * range of the animation, [0, position], to the output domain provided by the
   * consumer, i.e. [0, 1].
   */
  if (typeFrom === 'number' && typeTo === 'number') {
    return {
      interpolator: remapf,
      property: fromProperty,
      values: {
        from: fromValue,
        to: toValue,
      },
    };

    /**
     * If the types of the to and from properties on the animation configuration
     * are both strings, we'll need to check a few more conditions to ensure we
     * return the proper interpolator.
     */
  } else if (typeFrom === 'string' && typeTo === 'string') {
    const normalizedFrom = normalizeColor(fromValue);
    const normalizedTo = normalizeColor(toValue);

    return {
      interpolator: remapColor,
      property: fromProperty,
      values: {
        from: rgba(normalizedFrom !== null ? normalizedFrom : fromValue),
        to: rgba(normalizedTo !== null ? normalizedTo : fromValue),
      },
    };
  }

  // If no conditions are matched, just return the values passed in with no interpolation.
  return {
    interpolator: () => fromValue,
    property: fromProperty,
    values: {
      from: fromValue,
      to: toValue,
    },
  };
}
