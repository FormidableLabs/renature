type cssTransform = {
  transform: string,
  transformProperty: Js.Nullable.t(string),
};

type transformProperties = [
  | `translate
  | `translateX
  | `translateY
  | `translateZ
  | `skew
  | `skewX
  | `skewY
  | `skewZ
  | `rotate
  | `rotateX
  | `rotateY
  | `rotateZ
  | `scale
  | `scaleX
  | `scaleY
  | `scaleZ
  | `perspective
];

[@genType]
let parseTransform: string => cssTransform;

[@genType]
let remapTransform:
  (~range: (float, float), ~domain: (string, string), ~value: float) =>
  string;