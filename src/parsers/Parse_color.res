@bs.module("./normalize-color")
external normalizeColor: string => Js.Nullable.t<float> = "normalizeColor"

type rgba = {
  r: float,
  g: float,
  b: float,
  a: float,
}

@bs.module("./normalize-color") external rgba: float => rgba = "rgba"

let testColor = val_ => normalizeColor(val_) !== Js.Nullable.null

let parseColor = val_ => rgba(val_)
