// Map an input range to an output domain.
let remapf = (~range as (rl, rh), ~domain as (dl, dh), ~value) =>
  dl +. (dh -. dl) *. ((value -. rl) /. (rh -. rl));

let remap = (~range as (rl, rh), ~domain as (dl, dh), ~value) =>
  remapf(
    ~value=Utils.foi(value),
    ~domain=(Utils.foi(dl), Utils.foi(dh)),
    ~range=(Utils.foi(rl), Utils.foi(rh)),
  )
  |> Utils.iof;

let normalizef = (~range, ~value) =>
  remapf(~range, ~domain=(0., 1.), ~value);

let normalize = (~range, ~value) => remap(~range, ~domain=(0, 1), ~value);