let foi = float_of_int;
let iof = int_of_float;

type scanfState = {
  mutable accumulator: float,
  mutable reducer: (~accumulator: float, ~value: float) => float,
  mutable listener: float => unit,
};

type scanfRecord = {
  start: (float => unit) => unit,
  next: float => unit,
};

let scanf = (~reducer, ~init): scanfRecord => {
  let state: scanfState = {accumulator: init, reducer, listener: (0.) => ()};

  let start = listener => {
    state.listener = listener;
  };

  let next = value => {
    state.accumulator = reducer(~accumulator=state.accumulator, ~value);
    state.listener(state.accumulator);
  };

  {start, next};
};