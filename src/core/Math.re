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

// Map an input range to an output domain.
let remapf = (~value, ~low1, ~high1, ~low2, ~high2) =>
  low2 +. (high2 -. low2) *. ((value -. low1) /. (high1 -. low1));
let remap = (~value, ~low1, ~high1, ~low2, ~high2) =>
  remapf(
    ~value=Utils.foi(value),
    ~low1=Utils.foi(low1),
    ~high1=Utils.foi(high1),
    ~low2=Utils.foi(low2),
    ~high2=Utils.foi(high2),
  )
  |> Utils.iof;

// Normalization.
let norm = (~value, ~low, ~high) =>
  remapf(~value, ~low1=low, ~high1=high, ~low2=0., ~high2=1.);

// Constrain a range.
let constrain = (~low, ~high, n) => {
  switch (n) {
  | n when n < low => low
  | n when n > high => high
  | _ => n
  };
};