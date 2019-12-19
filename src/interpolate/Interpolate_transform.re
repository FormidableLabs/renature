type cssTransform = {
  transform: string,
  transformProperty: Js.Nullable.t(string),
};

[@bs.deriving jsConverter]
type transformProperties = [
  | `translate
  | `translateX
  | `translateY
  | `translateZ
  | `skew
  | `skewX
  | `skewY
  | `skewZ
  | `rotate
  | `rotateX
  | `rotateY
  | `rotateZ
  | `scale
  | `scaleX
  | `scaleY
  | `scaleZ
  | `perspective
];

let parseTransform = transform => {
  switch (String.index(transform, '(')) {
  | idx =>
    /* Decompose the transform string into the transform property, i.e. translateX, skew, etc.
       Then, extract the value, i.e. 20px, 50deg, so we can begin to interpolate it. */
    let property =
      Js.String.substring(~from=0, ~to_=idx, transform)
      ->transformPropertiesFromJs;
    let value =
      Js.String.substring(
        ~from=idx + 1,
        ~to_=String.index_from(transform, idx + 1, ')'),
        transform,
      );

    switch (property) {
    | Some(p) => {
        transform: value,
        transformProperty: Js.Nullable.return(p->transformPropertiesToJs),
      }
    | None => {transform: value, transformProperty: Js.Nullable.null}
    };
  | exception Not_found => {transform, transformProperty: Js.Nullable.null}
  };
};

let remapTransform = (~range as (rl, rh), ~domain as (dl, dh), ~value) => {
  let {transform: dlTransform, transformProperty: dlTransformProperty} =
    parseTransform(dl);
  let {transform: dhTransform} = parseTransform(dh);

  let progress = (value -. rl) /. (rh -. rl);
  let Interpolate_unit.{num: dlNum, unit: dlUnit} =
    Interpolate_unit.parseUnit(dlTransform);
  let Interpolate_unit.{num: dhNum} =
    Interpolate_unit.parseUnit(dhTransform);

  let output =
    Interpolate_number.lerpf(~acc=dlNum, ~target=dhNum, ~roundness=progress);

  switch (
    dlTransformProperty->Js.Nullable.toOption,
    dlUnit->Js.Nullable.toOption,
  ) {
  | (Some(tp), Some(u)) => tp ++ "(" ++ Utils.sof(output) ++ u ++ ")"
  | (Some(tp), None) => tp ++ "(" ++ Utils.sof(output) ++ ")"
  | (None, Some(u)) => Utils.sof(output) ++ u
  | (None, None) => ""
  };
};