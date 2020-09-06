@bs.val external parseFloat: string => float = "parseFloat"

let onlyNumericRe = %re("/[\d.]/g")

let testNumber = val_ => !Js.Float.isNaN(parseFloat(val_)) && Js.Re.test_(onlyNumericRe, val_)

let parseNumber = val_ => parseFloat(val_)
