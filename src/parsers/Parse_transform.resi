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

export testTransform: string => bool

export testTransforms: string => bool

type cssTransform = {
  transform: Js.Nullable.t<string>,
  transformProperty: Js.Nullable.t<string>,
}

export parseTransform: string => cssTransform

export parseTransforms: string => array<string>

export getAnimatableNoneForTransform: (string, string) => string
