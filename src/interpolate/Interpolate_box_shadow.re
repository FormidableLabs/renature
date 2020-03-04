[@bs.module "../helpers/normalizeColor"]
external normalizeColor: string => Js.Nullable.t(float) = "normalizeColor";

[@bs.module "../helpers/normalizeColor"]
external rgba: float => Interpolate_color.rgba(float) = "rgba";

[@bs.val] [@bs.module "../helpers/normalizeColor"]
external colorNames: Js.Dict.t(string) = "colorNames";

type boxShadow = {
  offsetX: string,
  offsetY: string,
  blur: string,
  spread: string,
  color: string,
  inset: bool,
};

let defaultColor = "rgba(0, 0, 0, 1)";

let none = {
  offsetX: "0",
  offsetY: "0",
  blur: "0",
  spread: "0",
  color: defaultColor,
  inset: false,
};

let commaWhitespaceRe = [%re "/,\s/g"];
let commaRe = [%re "/,/g"];

let recomposeColor = color => {
  Js.String.includes(",", color)
    ? Js.String.replaceByRe(commaRe, ", ", color) : color;
};
let colorToRgba = color => {
  color
  ->normalizeColor
  ->Js.Nullable.toOption
  ->Belt.Option.map(rgba)
  ->Belt.Option.getWithDefault(
      Interpolate_color.{r: 0., g: 0., b: 0., a: 1.},
    );
};

let testBoxShadow = boxShadow => {
  switch (boxShadow) {
  | "none" => true
  | _ =>
    let properties =
      Js.String.replaceByRe(commaWhitespaceRe, ",", boxShadow)
      |> Js.String.split(" ")
      |> Js.Array.filter(s =>
           s !== "inset" && normalizeColor(s) === Js.Nullable.null
         );

    switch (Array.length(properties)) {
    | n when n >= 2 && n <= 4 =>
      properties |> Js.Array.every(p => p |> Interpolate_unit.testUnit)
    | _ => false
    };
  };
};

let parseBoxShadow = boxShadow => {
  let inset = Js.String.includes("inset", boxShadow);
  let properties =
    Js.String.replaceByRe(commaWhitespaceRe, ",", boxShadow)
    |> Js.String.split(" ")
    |> Js.Array.filter(s => s !== "inset");

  let parsedBoxShadow =
    switch (Array.length(properties)) {
    | 2 => {
        offsetX: properties[0],
        offsetY: properties[1],
        blur: "0",
        spread: "0",
        color: defaultColor,
        inset,
      }
    | 3 => {
        offsetX: properties[0],
        offsetY: properties[1],
        blur: "0",
        spread: "0",
        color: properties[2] |> recomposeColor,
        inset,
      }
    | 4 => {
        offsetX: properties[0],
        offsetY: properties[1],
        blur: properties[2],
        spread: "0",
        color: properties[3] |> recomposeColor,
        inset,
      }
    | 5 => {
        offsetX: properties[0],
        offsetY: properties[1],
        blur: properties[2],
        spread: properties[3],
        color: properties[4] |> recomposeColor,
        inset,
      }
    | _ => none
    };

  parsedBoxShadow;
};

let remapBoxShadow = (~range as (rl, rh), ~domain as (dl, dh), ~value) => {
  // Parse the from and to box-shadows.
  let dlBoxShadow = parseBoxShadow(dl);
  let dhBoxShadow = parseBoxShadow(dh);

  // Interpolate each property in the box-shadow individually.
  let offsetX =
    Interpolate_unit.remapUnit(
      ~range=(rl, rh),
      ~domain=(dlBoxShadow.offsetX, dhBoxShadow.offsetX),
      ~value,
    );

  let offsetY =
    Interpolate_unit.remapUnit(
      ~range=(rl, rh),
      ~domain=(dlBoxShadow.offsetY, dhBoxShadow.offsetY),
      ~value,
    );

  let blur =
    Interpolate_unit.remapUnit(
      ~range=(rl, rh),
      ~domain=(dlBoxShadow.blur, dhBoxShadow.blur),
      ~value,
    );

  let spread =
    Interpolate_unit.remapUnit(
      ~range=(rl, rh),
      ~domain=(dlBoxShadow.spread, dhBoxShadow.spread),
      ~value,
    );

  let color =
    Interpolate_color.remapColor(
      ~range=(rl, rh),
      ~domain=(
        colorToRgba(dlBoxShadow.color),
        colorToRgba(dhBoxShadow.color),
      ),
      ~value,
    );

  let inset = dlBoxShadow.inset && dhBoxShadow.inset ? "inset " : "";

  inset
  ++ ([|offsetX, offsetY, blur, spread, color|] |> Js.Array.joinWith(" "));
};