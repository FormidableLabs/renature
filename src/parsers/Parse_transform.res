@bs.deriving(jsConverter)
type transformProperties = [
  | #translate
  | #translateX
  | #translateY
  | #translateZ
  | #translate3d
  | #skew
  | #skewX
  | #skewY
  | #rotate
  | #rotateX
  | #rotateY
  | #rotateZ
  | #rotate3d
  | #scale
  | #scaleX
  | #scaleY
  | #scaleZ
  | #scale3d
  | #perspective
  | #matrix
  | #matrix3d
]

let transformRe = %re("/(\w+)\(([^)]*)\)/g")

let testTransform = val_ => {
  let transform = Js.Re.exec_(transformRe, val_)
  Js.Re.setLastIndex(transformRe, 0)

  switch transform {
  | Some(t) =>
    Js.Re.captures(t) |> Js.Array.filteri((_, i) => i === 1 || i === 2) |> Js.Array.every(c =>
      switch c->Js.Nullable.toOption {
      | Some(cap) =>
        let isTransformUnit = Parse_unit.testUnit(cap)
        let isTransformNumber = Parse_number.testNumber(cap)
        let isTransformProperty = switch cap->transformPropertiesFromJs {
        | Some(_) => true
        | None => false
        }
        let isTransformMultiple =
          Js.String.split(", ", cap) |> Js.Array.every(s =>
            Parse_unit.testUnit(s) || Parse_number.testNumber(s)
          )

        isTransformUnit || (isTransformNumber || (isTransformProperty || isTransformMultiple))
      | None => false
      }
    )
  | None => false
  }
}

let transformsRe = %re("/(?:[^\s(]+|\([^)]*\))+/g")

let testTransforms = val_ => {
  let transforms = Js.String.match_(transformsRe, val_)

  switch transforms {
  | Some(t) => t |> Js.Array.every(testTransform)
  | None => false
  }
}

type cssTransform = {
  transform: Js.Nullable.t<string>,
  transformProperty: Js.Nullable.t<string>,
}

let parseTransform = val_ => {
  let transform = Js.Re.exec_(transformRe, val_)
  Js.Re.setLastIndex(transformRe, 0)

  let t = ref({transform: Js.Nullable.null, transformProperty: Js.Nullable.null})

  switch transform {
  | Some(t_1) =>
    let captures = Js.Re.captures(t_1) |> Js.Array.filteri((_, i) => i === 1 || i === 2)

    captures |> Array.iteri((i, propOrValue) =>
      i === 0
        ? t := {...t.contents, transformProperty: propOrValue}
        : t := {...t.contents, transform: propOrValue}
    )

    t.contents
  | None => t.contents
  }
}

let parseTransforms = val_ => {
  let transforms = Js.String.match_(transformsRe, val_)

  switch transforms {
  | Some(t) => t
  | None => []
  }
}

let parseSingleValueTransform = (~defaultValue, ~unit, ~defaultUnit) =>
  defaultValue ++ Js.Nullable.toOption(unit)->Belt.Option.getWithDefault(defaultUnit)

let parsePotentialMultiValueTransform = (~value, ~defaultValue, ~unit, ~defaultUnit) => {
  switch Js.String.includes(",", value) {
  | true => value |> Js.String.split(",") |> Js.Array.map(v => {
      let {unit} = Parse_unit.parseUnit(v |> Js.String.trim)
      parseSingleValueTransform(~defaultValue, ~unit, ~defaultUnit)
    }) |> Js.Array.joinWith(", ")
  | false => parseSingleValueTransform(~defaultValue, ~unit, ~defaultUnit)
  }
}

let getAnimatableNoneForTransform = (property, value) => {
  let {unit} = Parse_unit.parseUnit(value)

  switch property->transformPropertiesFromJs {
  | Some(#translateX)
  | Some(#translateY)
  | Some(#translateZ) =>
    parseSingleValueTransform(~defaultValue="0", ~unit, ~defaultUnit="px")
  | Some(#translate)
  | Some(#translate3d) =>
    parsePotentialMultiValueTransform(~value, ~defaultValue="0", ~unit, ~defaultUnit="px")
  | Some(#scaleX)
  | Some(#scaleY)
  | Some(#scaleZ) => "1"
  | Some(#scale)
  | Some(#scale3d) =>
    parsePotentialMultiValueTransform(~value, ~defaultValue="1", ~unit, ~defaultUnit="")
  | Some(#skewX)
  | Some(#skewY)
  | Some(#rotateX)
  | Some(#rotateY)
  | Some(#rotateZ) =>
    parseSingleValueTransform(~defaultValue="0", ~unit, ~defaultUnit="deg")
  | Some(#skew)
  | Some(#rotate)
  | Some(#rotate3d) =>
    parsePotentialMultiValueTransform(~value, ~defaultValue="0", ~unit, ~defaultUnit="deg")
  | Some(#perspective) => parseSingleValueTransform(~defaultValue="0", ~unit, ~defaultUnit="px")
  | Some(#matrix) => "(1, 0, 0, 1, 0, 0)"
  | Some(#matrix3d) => "(1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1)"
  | None => ""
  }
}
