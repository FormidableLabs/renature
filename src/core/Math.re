// Constrain a range.
let constrainf = (~low, ~high, n) => {
  switch (n) {
  | n when n < low => low
  | n when n > high => high
  | _ => n
  };
};

// Linearly interpolate a value.
let lerpf = (~acc, ~target, ~roundness) =>
  (1.0 -. roundness) *. acc +. roundness *. target;

// Map a value on an input range to a value on an output domain.
let remapf = (~range as (rl, rh), ~domain as (dl, dh), ~value) =>
  dl +. (dh -. dl) *. ((value -. rl) /. (rh -. rl));

// Normalize a number on an input range to an output domain of [0, 1].
let normalizef = (~range, ~value) =>
  remapf(~range, ~domain=(0., 1.), ~value);