export testTransform: string => bool

export testTransforms: string => bool

type cssTransform = {
  transform: Js.Nullable.t<string>,
  transformProperty: Js.Nullable.t<string>,
}

export parseTransform: string => cssTransform

export parseTransforms: string => array<string>
