type cssUnit = {
  num: float,
  unit: Js.Nullable.t(string),
};

[@bs.deriving jsConverter]
type measurement = [
  | `px
  | `em
  | `rem
  | `vw
  | `vh
  | [@bs.as "%"] `pct
  | `deg
  | `rad
  | `turn
];

[@bs.val] external parseFloat: string => float = "parseFloat";

let parseUnit = value => {
  let num = parseFloat(value);
  let unit = Js.String.replace(Utils.sof(num), "", value)->measurementFromJs;

  switch (unit) {
  | Some(u) => {num, unit: Js.Nullable.return(u->measurementToJs)}
  | None => {num, unit: Js.Nullable.null}
  };
};

let remapUnit = (~range as (rl, rh), ~domain as (dl, dh), ~value) => {
  let {num: dlNum, unit: dlUnit} = parseUnit(dl);
  let {num: dhNum} = parseUnit(dh);

  let progress = (value -. rl) /. (rh -. rl);
  let output =
    Interpolate_number.lerpf(~acc=dlNum, ~target=dhNum, ~roundness=progress);

  switch (dlUnit->Js.Nullable.toOption) {
  | Some(u) => Utils.sof(output) ++ u
  | None => Utils.sof(output)
  };
};