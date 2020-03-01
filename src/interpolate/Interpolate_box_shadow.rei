type boxShadow = {
  offsetX: string,
  offsetY: string,
  blur: string,
  spread: string,
  color: string,
  inset: bool,
};

[@genType]
let testBoxShadow: string => bool;

[@genType]
let parseBoxShadow: string => boxShadow;

[@genType]
let remapBoxShadow:
  (~range: (float, float), ~domain: (string, string), ~value: float) =>
  string;