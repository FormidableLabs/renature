// Linear interpolation.
let lerpf = (~acc, ~target, ~roundness) =>
  (1.0 -. roundness) *. acc +. roundness *. target;
let lerp = (~acc, ~target, ~roundness) =>
  lerpf(~acc=Utils.foi(acc), ~target=Utils.foi(target), ~roundness)
  |> Utils.iof;