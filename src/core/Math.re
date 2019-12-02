let sq = x => x * x;
let sqf = x => x *. x;

// Linear interpolation.
let lerpf = (~acc, ~target, ~roundness) =>
  (1.0 -. roundness) *. acc +. roundness *. target;
let lerp = (~acc, ~target, ~roundness) =>
  lerpf(~acc, ~target, ~roundness) |> Utils.iof;