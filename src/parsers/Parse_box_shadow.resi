export testBoxShadow: string => bool

export testBoxShadows: string => bool

type cssBoxShadow = {
  offsetX: string,
  offsetY: string,
  blur: string,
  spread: string,
  color: string,
  inset: bool,
}

export parseBoxShadow: string => cssBoxShadow

export parseBoxShadows: string => array<string>
