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

// Constrain a range.
let constrain = (~low, ~high, n) => {
  switch (n) {
  | n when n < low => low
  | n when n > high => high
  | _ => n
  };
};