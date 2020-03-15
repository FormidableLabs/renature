[@genType]
type rgba = {
  r: float,
  g: float,
  b: float,
  a: float,
};

[@genType]
let testColor: string => bool;

[@genType]
let parseColor: float => rgba;