type rgba('a) = {
  r: 'a,
  g: 'a,
  b: 'a,
  a: 'a,
};

[@genType]
let lerpColorRGBA:
  (~acc: rgba(float), ~target: rgba(float), ~roundness: float) =>
  rgba(float);