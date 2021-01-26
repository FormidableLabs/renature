import {
  parseTransform,
  parseTransforms,
  getAnimatableNoneForTransform,
} from './Parse_transform.gen';

const formatTransformString = (transformRecord: Record<string, string>) =>
  Object.entries(transformRecord)
    .map(([property, value]) => `${property}(${value})`)
    .join(' ');

export const deriveTransforms = (
  currentTransform: string,
  targetTransform: string
): { from: string; to: string } => {
  const [fromTransform, toTransform] = [currentTransform, targetTransform].map(
    (transform) =>
      parseTransforms(transform).reduce<Record<string, string>>((acc, t) => {
        const { transformProperty, transform } = parseTransform(t);

        if (transformProperty && transform) {
          return {
            ...acc,
            [transformProperty]: transform,
          };
        }

        return acc;
      }, {})
  );

  Object.entries(fromTransform).forEach(([property, value]) => {
    // If toTransform doesn't have a matching transfrom, ensure an animatable none gets added to it.
    if (!toTransform[property]) {
      toTransform[property] = getAnimatableNoneForTransform(property, value);
    }
  });

  Object.entries(toTransform).forEach(([property, value]) => {
    // If fromTransform doesn't have a matching transform, ensure an animatable none gets added to it.
    if (!fromTransform[property]) {
      fromTransform[property] = getAnimatableNoneForTransform(property, value);
    }
  });

  return {
    from: formatTransformString(fromTransform),
    to: formatTransformString(toTransform),
  };
};
