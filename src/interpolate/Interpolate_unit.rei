type cssUnit = {
  num: float,
  unit: Js.Nullable.t(string),
};

type measurement = [
  | `px
  | `em
  | `rem
  | `vw
  | `vh
  | `pct
  | `deg
  | `rad
  | `turn
];

[@genType]
let parseUnit: string => cssUnit;

[@genType]
let remapUnit:
  (~range: (float, float), ~domain: (string, string), ~value: float) =>
  string;