@bs.module("../parsers/normalizeColor")
external normalizeColor: string => Js.Nullable.t<float> = "normalizeColor"

@bs.module("../parsers/normalizeColor")
external rgba: float => Parse_color.rgba = "rgba"

let colorToRgba = color =>
  color
  ->normalizeColor
  ->Js.Nullable.toOption
  ->Belt.Option.map(rgba)
  ->Belt.Option.getWithDefault({
    open Parse_color
    {r: 0., g: 0., b: 0., a: 1.}
  })

let interpolateBoxShadow = (~range as (rl, rh), ~domain as (dl, dh), ~value) => {
  // Parse the from and to box-shadows.
  let fromBoxShadow = Parse_box_shadow.parseBoxShadow(dl)
  let toBoxShadow = Parse_box_shadow.parseBoxShadow(dh)

  // Interpolate each property in the box-shadow individually.
  let offsetX = Interpolate_unit.interpolateUnit(
    ~range=(rl, rh),
    ~domain=(fromBoxShadow.offsetX, toBoxShadow.offsetX),
    ~value,
  )

  let offsetY = Interpolate_unit.interpolateUnit(
    ~range=(rl, rh),
    ~domain=(fromBoxShadow.offsetY, toBoxShadow.offsetY),
    ~value,
  )

  let blur = Interpolate_unit.interpolateUnit(
    ~range=(rl, rh),
    ~domain=(fromBoxShadow.blur, toBoxShadow.blur),
    ~value,
  )

  let spread = Interpolate_unit.interpolateUnit(
    ~range=(rl, rh),
    ~domain=(fromBoxShadow.spread, toBoxShadow.spread),
    ~value,
  )

  let color = Interpolate_color.interpolateColor(
    ~range=(rl, rh),
    ~domain=(colorToRgba(fromBoxShadow.color), colorToRgba(toBoxShadow.color)),
    ~value,
  )

  let inset = fromBoxShadow.inset && toBoxShadow.inset ? "inset " : ""

  inset ++ ([offsetX, offsetY, blur, spread, color] |> Js.Array.joinWith(" "))
}

let interpolateBoxShadows = (~range, ~domain as (dl, dh), ~value) => {
  let dlBoxShadows = Parse_box_shadow.parseBoxShadows(dl)
  let dhBoxShadows = Parse_box_shadow.parseBoxShadows(dh)

  dlBoxShadows
  |> Array.mapi((i, bsl) => interpolateBoxShadow(~range, ~domain=(bsl, dhBoxShadows[i]), ~value))
  |> Js.Array.joinWith(", ")
}
