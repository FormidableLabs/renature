@bs.deriving(jsConverter)
type transformProperties = [
  | #translate
  | #translateX
  | #translateY
  | #translateZ
  | #skew
  | #skewX
  | #skewY
  | #skewZ
  | #rotate
  | #rotateX
  | #rotateY
  | #rotateZ
  | #scale
  | #scaleX
  | #scaleY
  | #scaleZ
  | #perspective
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
