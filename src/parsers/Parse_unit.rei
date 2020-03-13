type cssUnit = {
  value: float,
  unit: Js.Nullable.t(string),
};

[@genType]
let testUnit: string => bool;

[@genType]
let parseUnit: string => cssUnit;