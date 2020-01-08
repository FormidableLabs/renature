// Constrain a range.
let constrain = (~low, ~high, n) => {
  switch (n) {
  | n when n < low => low
  | n when n > high => high
  | _ => n
  };
};