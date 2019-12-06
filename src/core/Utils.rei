[@genType]
let foi: int => float;
[@genType]
let iof: float => int;

[@genType]
type scanfState = {
  mutable accumulator: float,
  mutable reducer: (~accumulator: float, ~value: float) => float,
  mutable listener: float => unit,
};

[@genType]
type scanfRecord = {
  start: (float => unit) => unit,
  next: float => unit,
};

[@genType]
let scanf:
  (~reducer: (~accumulator: float, ~value: float) => float, ~init: float) =>
  scanfRecord;