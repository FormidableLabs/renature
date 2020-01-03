import {
  remapf,
  remapColor,
  rgba as RGBA,
  parseUnit,
  remapUnit,
  parseTransformSingle,
  remapTransform,
} from '../interpolate';
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

export type Interpolator<T, R> = (params: {
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
export function getInterpolatorForPair(
  pairs: CSSPairs
): InterpolatedResult<string, string>;

export function getInterpolatorForPair({ from, to }: CSSPairs) {
  const {
    from: { value: fromValue, property: fromProperty },
    to: { value: toValue, property: toProperty },
  } = parsePairs({ from, to });

  const typeFrom = typeof fromValue;
  const typeTo = typeof toValue;

  if (typeFrom !== typeTo) {
    throw new Error(
      `from and to values have mismatching types. from type: ${typeFrom} does not match to type: ${typeTo}.`
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
    // Check if the string can be parsed to a color.
    const colorFrom = normalizeColor(fromValue);
    const colorTo = normalizeColor(toValue);

    if (colorFrom && colorTo) {
      return {
        interpolator: remapColor,
        property: fromProperty,
        values: {
          from: rgba(colorFrom),
          to: rgba(colorTo),
        },
      };
    }

    // Check if the string can be parsed to a unit-based number.
    const unitFrom = parseUnit(fromValue);
    const unitTo = parseUnit(toValue);

    if (unitFrom.unit && unitTo.unit) {
      return {
        interpolator: remapUnit,
        property: fromProperty,
        values: {
          from: fromValue,
          to: toValue,
        },
      };
    }

    // Check if the string can be parsed to a transform property.
    const transformFrom = parseTransformSingle(fromValue)[0];
    const transformTo = parseTransformSingle(toValue)[0];

    if (transformFrom.transformProperty && transformTo.transformProperty) {
      return {
        interpolator: remapTransform,
        property: fromProperty,
        values: {
          from: fromValue,
          to: toValue,
        },
      };
    }
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

export function getInterpolatorsForPairs({ from, to }: CSSPairs) {
  return Object.keys(from).map(key => {
    const f = { [key]: (from as { [cssProperty: string]: any })[key] };
    const t = { [key]: (to as { [cssProperty: string]: any })[key] };

    return getInterpolatorForPair({ from: f, to: t });
  });
}
