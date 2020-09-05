type cssUnit = {
  value: float,
  unit: Js.Nullable.t<string>,
}

export testUnit: string => bool

export parseUnit: string => cssUnit
