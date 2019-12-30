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

let parseTransformSingle = transform => {
  switch (String.index(transform, '(')) {
  | openParens =>
    switch (String.index(transform, ')')) {
    | closeParens =>
      // Decompose the transform string into the transform property and value.
      let property =
        Js.String.substring(~from=0, ~to_=openParens, transform)
        ->transformPropertiesFromJs;
      let value =
        Js.String.substring(
          ~from=openParens + 1,
          ~to_=closeParens,
          transform,
        );

      switch (property) {
      | Some(p) =>
        /**
         * Determine if we're transforming only a single value, i.e. translateX(20px),
         * or if we're transforming multiple properties, i.e. translate(20px, 30px).
         */
        (
          switch (String.index(value, ',')) {
          | idx =>
            let x =
              value->Js.String.substring(~from=0, ~to_=idx)->Js.String.trim;
            let y =
              value
              ->Js.String.substring(~from=idx + 1, ~to_=closeParens)
              ->Js.String.trim;
            let tp = Js.Nullable.return(p->transformPropertiesToJs);

            [|
              {transform: x, transformProperty: tp},
              {transform: y, transformProperty: tp},
            |];
          | exception Not_found => [|
              {
                transform: value,
                transformProperty:
                  Js.Nullable.return(p->transformPropertiesToJs),
              },
            |]
          }
        )
      | None => [|{transform, transformProperty: Js.Nullable.null}|]
      };
    | exception Not_found => [|
        {transform, transformProperty: Js.Nullable.null},
      |]
    }
  | exception Not_found => [|
      {transform, transformProperty: Js.Nullable.null},
    |]
  };
};

let remapTransformSingle = (~range as (rl, rh), ~domain as (dl, dh), ~value) => {
  // Parse the from and to transforms.
  let dlTransforms = parseTransformSingle(dl);
  let dhTransforms = parseTransformSingle(dh);

  // Store a mutable ref to hold the translate property.
  let transformProperty = ref("");

  // Iterate over the transforms and interpolate each property individually.
  let transforms =
    dlTransforms
    |> Array.mapi((idx, {transform: dlTransform, transformProperty: dlTp}) => {
         let {transform: dhTransform, transformProperty: dhTp} = dhTransforms[idx];

         switch (dlTp->Js.Nullable.toOption, dhTp->Js.Nullable.toOption) {
         | (Some(dlTp), Some(_)) =>
           transformProperty := dlTp;
           Interpolate_unit.remapUnit(
             ~range=(rl, rh),
             ~domain=(dlTransform, dhTransform),
             ~value,
           );
         | _ => ""
         };
       })
    |> Js.Array.joinWith(", ");

  transformProperty^ ++ "(" ++ transforms ++ ")";
};

let transformsRe = [%bs.re "/(\w+)\((.+?)\)/g"];

let rec splitTransform = (~transform, ~matches=[||], ()) => {
  switch (Js.Re.exec_(transformsRe, transform)) {
  | Some(m) =>
    splitTransform(
      ~transform,
      ~matches=
        Array.append(
          matches,
          m->Js.Re.captures->Array.unsafe_get(0) |> Array.make(1),
        ),
      (),
    )
  | None =>
    matches
    |> Array.map(m =>
         switch (m->Js.Nullable.toOption) {
         | Some(match) => match
         | None => ""
         }
       )
  };
};

let remapTransform = (~range, ~domain as (dl, dh), ~value) => {
  let dlTransforms = splitTransform(~transform=dl, ());
  let dhTransforms = splitTransform(~transform=dh, ());

  dlTransforms
  |> Array.mapi((idx, dlTransform) => {
       let dhTransform = dhTransforms[idx];
       remapTransformSingle(
         ~range,
         ~domain=(dlTransform, dhTransform),
         ~value,
       );
     })
  |> Js.Array.joinWith(" ");
};