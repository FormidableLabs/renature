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
let parseTransformSingle: string => array(cssTransform);

[@genType]
let remapTransformSingle:
  (~range: (float, float), ~domain: (string, string), ~value: float) =>
  string;

[@genType]
let splitTransform:
  (~transform: string, ~matches: array(Js.Nullable.t(string))=?, unit) =>
  array(string);

[@genType]
let remapTransform:
  (~range: (float, float), ~domain: (string, string), ~value: float) =>
  string;