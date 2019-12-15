// Linear interpolation.
let lerpf = (~acc, ~target, ~roundness) =>
  (1.0 -. roundness) *. acc +. roundness *. target;
let lerp = (~acc, ~target, ~roundness) =>
  lerpf(~acc=Utils.foi(acc), ~target=Utils.foi(target), ~roundness)
  |> Utils.iof;

// Map a value on an input range to a value on an output domain.
let remapf = (~range as (rl, rh), ~domain as (dl, dh), ~value) =>
  dl +. (dh -. dl) *. ((value -. rl) /. (rh -. rl));

let remap = (~range as (rl, rh), ~domain as (dl, dh), ~value) =>
  remapf(
    ~value=Utils.foi(value),
    ~domain=(Utils.foi(dl), Utils.foi(dh)),
    ~range=(Utils.foi(rl), Utils.foi(rh)),
  )
  |> Utils.iof;

// Normalize a number on an input range to an output domain of [0, 1].
let normalizef = (~range, ~value) =>
  remapf(~range, ~domain=(0., 1.), ~value);

let normalize = (~range, ~value) => remap(~range, ~domain=(0, 1), ~value);