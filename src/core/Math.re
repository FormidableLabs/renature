// Square.
let sq = x => x * x;
let sqf = x => x *. x;

// Exponents.
let rec pow = (~base, ~exp) => {
  switch (exp) {
  | 0 => 1.
  | 1 => Utils.foi(base)
  | n when n < 0 => 1. /. Utils.foi(base) *. pow(~base, ~exp=exp + 1)
  | _ => Utils.foi(base) *. pow(~base, ~exp=exp - 1)
  };
};

// Linear interpolation.
let lerpf = (~acc, ~target, ~roundness) =>
  (1.0 -. roundness) *. acc +. roundness *. target;
let lerp = (~acc, ~target, ~roundness) =>
  lerpf(~acc=Utils.foi(acc), ~target=Utils.foi(target), ~roundness)
  |> Utils.iof;