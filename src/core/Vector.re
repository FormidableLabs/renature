// The core vector type.
type vector('a) = ('a, 'a);
type t('a) = vector('a);

// Vector addition.
let add = (~v1, ~v2) => (fst(v1) + fst(v2), snd(v1) + snd(v2));
let addf = (~v1, ~v2) => (fst(v1) +. fst(v2), snd(v1) +. snd(v2));

// Vector subtraction.
let sub = (~v1, ~v2) => (fst(v1) - fst(v2), snd(v1) - snd(v2));
let subf = (~v1, ~v2) => (fst(v1) -. fst(v2), snd(v1) -. snd(v2));

// Vector multiplication.
let mult = (~v, ~s) => (fst(v) * s, snd(v) * s);
let multf = (~v, ~s) => (fst(v) *. s, snd(v) *. s);

// Vector division.
let div = (~v, ~s) => (fst(v) / s, snd(v) / s);
let divf = (~v, ~s) => (fst(v) /. s, snd(v) /. s);

// Vector magnitude.
let mag = v => {
  let (x, y) = (fst(v) |> Utils.foi, snd(v) |> Utils.foi);
  sqrt(Math.sqf(x) +. Math.sqf(y));
};

let magf = v => {
  let (x, y) = v;
  sqrt(Math.sqf(x) +. Math.sqf(y));
};

// Vector normalization.
let norm = v => {
  let m = mag(v);
  switch (m) {
  | 0. => (0., 0.)
  | _ => divf(~v=(fst(v) |> Utils.foi, snd(v) |> Utils.foi), ~s=m)
  };
};

let normf = v => {
  let m = magf(v);
  switch (m) {
  | 0. => (0., 0.)
  | _ => divf(~v, ~s=m)
  };
};

let lerpf = (~acc, ~target, ~roundness) => {
  let (accX, accY) = acc;
  let (targetX, targetY) = target;
  let x = Math.lerpf(~acc=accX, ~target=targetX, ~roundness);
  let y = Math.lerpf(~acc=accY, ~target=targetY, ~roundness);
  (x, y);
};

let lerp = (~acc, ~target, ~roundness) => {
  let (xf, yf) =
    lerpf(
      ~acc=(fst(acc) |> Utils.foi, snd(acc) |> Utils.foi),
      ~target=(fst(target) |> Utils.foi, snd(target) |> Utils.foi),
      ~roundness,
    );
  (xf |> Utils.iof, yf |> Utils.iof);
};