[@genType]
let testTransform: string => bool;

[@genType]
let testTransforms: string => bool;

type cssTransform = {
  transform: Js.Nullable.t(string),
  transformProperty: Js.Nullable.t(string),
};

[@genType]
let parseTransform: string => cssTransform;

[@genType]
let parseTransforms: string => array(string);