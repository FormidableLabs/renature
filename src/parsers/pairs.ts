import type { CSSProperties } from 'react';

import { testTransforms } from './Parse_transform.gen';
import { testBoxShadows } from './Parse_box_shadow.gen';
import { testColor, rgba as RGBA } from './Parse_color.gen';
import { testUnit } from './Parse_unit.gen';
import { rgba, normalizeColor } from './normalize-color';
import { remapf } from '../core';
import {
  interpolateTransforms,
  interpolateBoxShadows,
  interpolateColor,
  interpolateUnit,
} from '../interpolaters';

export interface CSSPairs {
  from: CSSProperties;
  to: CSSProperties;
}

export type CSSProperty = keyof CSSProperties;

interface NormalizedPair {
  property: CSSProperty;
  value: unknown;
}

const parsePair = (pairs: CSSProperties): NormalizedPair =>
  Object.entries(pairs).map(([k, v]) => ({
    property: k as CSSProperty,
    value: v,
  }))[0];

const parsePairs = ({
  from,
  to,
}: CSSPairs): { from: NormalizedPair; to: NormalizedPair } => ({
  from: parsePair(from),
  to: parsePair(to),
});

export type Interpolator<T, R> = (params: {
  readonly range: [number, number];
  readonly domain: [T, T];
  readonly value: number;
}) => R;

export interface InterpolatedResult<T, R> {
  interpolator: Interpolator<T, R>;
  property: CSSProperty;
  values: {
    from: any;
    to: any;
  };
}

export function getInterpolatorForPair(
  pairs: CSSPairs,
  disableHardwareAcceleration?: boolean
): InterpolatedResult<number, number>;
export function getInterpolatorForPair(
  pairs: CSSPairs,
  disableHardwareAcceleration?: boolean
): InterpolatedResult<RGBA, string>;
export function getInterpolatorForPair(
  pairs: CSSPairs,
  disableHardwareAcceleration?: boolean
): InterpolatedResult<string, string>;

export function getInterpolatorForPair(
  { from, to }: CSSPairs,
  disableHardwareAcceleration = false
): InterpolatedResult<any, any> {
  const {
    from: { value: fromValue, property: fromProperty },
    to: { value: toValue },
  } = parsePairs({ from, to });

  if (typeof fromValue !== typeof toValue) {
    throw new Error(
      `from and to values have mismatching types. from type: ${typeof fromValue} does not match to type: ${typeof toValue}.`
    );
  }

  /**
   * If the types of the from and to properties on the animation configuration
   * are both numbers, use remapf as the interpolator. This will map the input
   * range of the animation, [0, position], to the output domain provided by the
   * consumer, i.e. [0, 1].
   */
  if (typeof fromValue === 'number' && typeof toValue === 'number') {
    return {
      interpolator: remapf,
      property: fromProperty,
      values: {
        from: fromValue,
        to: toValue,
      },
    };

    /**
     * If the types of the from and to properties on the animation configuration
     * are both strings, we'll need to check a few more conditions to ensure we
     * return the proper interpolator.
     *
     * Test strings in order of complexity, i.e. transforms and box-shadows first,
     * followed by colors and unit values.
     */
  } else if (typeof fromValue === 'string' && typeof toValue === 'string') {
    // Check if the strings can be parsed to a valid CSS transform.
    if (testTransforms(fromValue) && testTransforms(toValue)) {
      return {
        interpolator: interpolateTransforms,
        property: fromProperty,
        values: {
          from:
            // Add translateZ(0) to transform if it's not already present
            // and if hardware acceleration is enabled.
            fromValue.indexOf('translateZ') === -1 &&
            !disableHardwareAcceleration
              ? `${fromValue} translateZ(0)`
              : fromValue,
          to:
            toValue.indexOf('translateZ') === -1 && !disableHardwareAcceleration
              ? `${toValue} translateZ(0)`
              : toValue,
        },
      };
    }

    // Check if the strings can be parsed to a valid CSS box-shadow.
    if (testBoxShadows(fromValue) && testBoxShadows(toValue)) {
      return {
        interpolator: interpolateBoxShadows,
        property: fromProperty,
        values: {
          from: fromValue,
          to: toValue,
        },
      };
    }

    // Check if the strings can be parsed to a valid CSS color.
    if (testColor(fromValue) && testColor(toValue)) {
      return {
        interpolator: interpolateColor,
        property: fromProperty,
        values: {
          from: rgba(normalizeColor(fromValue) ?? 0x00000000),
          to: rgba(normalizeColor(toValue) ?? 0x00000000),
        },
      };
    }

    // Check if the strings can be parsed to a unit-based number.
    if (testUnit(fromValue) && testUnit(toValue)) {
      return {
        interpolator: interpolateUnit,
        property: fromProperty,
        values: {
          from: fromValue,
          to: toValue,
        },
      };
    }
  }

  // If all previous parsing fails, throw an error.
  throw new Error(
    `Unable to parse configuration from: '${fromValue}' or to: '${toValue}'.`
  );
}

export function getInterpolatorsForPairs(
  { from, to }: CSSPairs,
  disableHardwareAcceleration = false
): InterpolatedResult<any, any>[] {
  return Object.keys(from).map((key) => {
    const f = { [key]: (from as { [cssProperty: string]: any })[key] };
    const t = { [key]: (to as { [cssProperty: string]: any })[key] };

    if (t[key] === undefined) {
      throw new Error(`Could not find a to value for from property: ${key}.`);
    }

    return getInterpolatorForPair(
      {
        from: f,
        to: t,
      },
      disableHardwareAcceleration
    );
  });
}
