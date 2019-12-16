type cssUnit = {
  num: float,
  unit: Js.Nullable.t(string),
};

[@genType]
let parseUnit: string => cssUnit;

[@genType]
let remapUnit:
  (~range: (float, float), ~domain: (string, string), ~value: float) =>
  string;