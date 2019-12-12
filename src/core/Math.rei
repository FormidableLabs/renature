[@genType]
let sq: int => int;
[@genType]
let sqf: float => float;

[@genType]
let pow: (~base: int, ~exp: int) => float;

[@genType]
let constrain: (~low: 'a, ~high: 'a, 'a) => 'a;