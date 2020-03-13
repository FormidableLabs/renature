[@genType]
let testBoxShadow: string => bool;

[@genType]
let testBoxShadows: string => bool;

type cssBoxShadow = {
  offsetX: string,
  offsetY: string,
  blur: string,
  spread: string,
  color: string,
  inset: bool,
};

[@genType]
let parseBoxShadow: string => cssBoxShadow;

[@genType]
let parseBoxShadows: string => array(string);