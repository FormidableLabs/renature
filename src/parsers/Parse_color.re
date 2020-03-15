[@bs.module "./normalizeColor"]
external normalizeColor: string => Js.Nullable.t(float) = "normalizeColor";

type rgba = {
  r: float,
  g: float,
  b: float,
  a: float,
};

[@bs.module "./normalizeColor"] external rgba: float => rgba = "rgba";

let testColor = val_ => normalizeColor(val_) !== Js.Nullable.null;

let parseColor = val_ => rgba(val_);