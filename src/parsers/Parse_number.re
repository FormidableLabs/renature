let onlyNumericRe = [%re "/[\d.]/g"];

let testNumber = val_ => {
  !Js.Float.isNaN(Utils.parseFloat(val_))
  && Js.Re.test_(onlyNumericRe, val_);
};

let parseNumber = val_ => Utils.parseFloat(val_);