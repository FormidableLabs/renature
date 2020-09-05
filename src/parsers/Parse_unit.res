@bs.deriving(jsConverter)
type measurement = [#px | #em | #rem | #vw | #vh | @bs.as("%") #pct | #deg | #rad | #turn]

type cssUnitRe = {
  value: float,
  unit: option<measurement>,
}

type cssUnit = {
  value: float,
  unit: Js.Nullable.t<string>,
}

let numericRe = %re("/[\d.-]+/")

let decomposeUnit = (val_: string): cssUnitRe => {
  let value = Utils.parseFloat(val_)
  let unit = Js.String.replaceByRe(numericRe, "", val_)->measurementFromJs

  {value: value, unit: unit}
}

let testUnit = val_ => {
  let {value, unit}: cssUnitRe = decomposeUnit(val_)

  switch (value, unit) {
  | (v, Some(u)) => !Js.Float.isNaN(v) && Js.String.endsWith(u->measurementToJs, val_)
  | (_, None) => false
  }
}

let parseUnit = val_ => {
  let {value, unit}: cssUnitRe = decomposeUnit(val_)

  switch unit {
  | Some(u) => {value: value, unit: Js.Nullable.return(u->measurementToJs)}
  | None => {value: value, unit: Js.Nullable.null}
  }
}
