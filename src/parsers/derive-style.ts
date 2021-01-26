import { CSSProperties } from 'react';

import { deriveTransforms } from './derive-transform';
import { CSSPairs } from './pairs';

export const deriveStyle = (
  element: HTMLElement | SVGElement,
  to: CSSProperties
): CSSPairs => {
  const currentStyle = element.style;
  const computedStyle = window.getComputedStyle(element);

  return Object.entries(to).reduce(
    (acc, [property, value]) => {
      // The computed value of transform is always returned as a matrix.
      // To prevent having to reverse parse the matrix, we build a transform
      // string from the sparse set of transforms present on style, if any.
      if (property === 'transform') {
        const currentValue = currentStyle.getPropertyValue(property);
        const { from: fromTransform, to: toTransform } = deriveTransforms(
          currentValue,
          to[property] ?? ''
        );

        return {
          from: {
            ...acc.from,
            [property]: fromTransform,
          },
          to: {
            ...acc.to,
            [property]: toTransform,
          },
        };
      }

      const from =
        typeof to[property as keyof CSSProperties] === 'number'
          ? parseFloat(computedStyle.getPropertyValue(property))
          : computedStyle.getPropertyValue(property);

      return {
        from: {
          ...acc.from,
          [property]: from,
        },
        to: {
          ...acc.to,
          [property]: value,
        },
      };
    },
    { from: {}, to: {} }
  );
};
