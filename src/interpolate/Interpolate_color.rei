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

[@genType]
let remapColor:
  (
    ~range: (float, float),
    ~domain: (rgba(float), rgba(float)),
    ~value: float
  ) =>
  string;