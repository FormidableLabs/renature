let interpolateTransform = (~range as (rl, rh), ~domain as (dl, dh), ~value) => {
  let fromTransform = Parse_transform.parseTransform(dl)
  let toTransform = Parse_transform.parseTransform(dh)

  let transforms = switch (
    fromTransform.transform->Js.Nullable.toOption,
    toTransform.transform->Js.Nullable.toOption,
  ) {
  | (Some(tl), Some(th)) =>
    let tl_1 = Js.String.split(",", tl) |> Array.map(Js.String.trim)
    let th_1 = Js.String.split(",", th) |> Array.map(Js.String.trim)

    tl_1 |> Array.mapi((i, t) =>
      Interpolate_unit.interpolateUnit(~range=(rl, rh), ~domain=(t, th_1[i]), ~value)
    )
  | (None, Some(_)) =>
    Js.Exn.raiseError("The transform for from: '" ++ dl ++ "' could not be parsed.")
  | (Some(_), None) =>
    Js.Exn.raiseError("The transform for to: '" ++ dh ++ "' could not be parsed.")
  | (None, None) =>
    Js.Exn.raiseError(
      "The transforms for from: '" ++ dl ++ "' and to: '" ++ dh ++ "' could not be pased.",
    )
  }

  fromTransform.transformProperty->Js.Nullable.toOption->Belt.Option.getWithDefault("") ++
    ("(" ++
    ((transforms |> Js.Array.joinWith(", ")) ++ ")"))
}

let interpolateTransforms = (~range, ~domain as (dl, dh), ~value) => {
  let dlTransforms = Parse_transform.parseTransforms(dl)
  let dhTransforms = Parse_transform.parseTransforms(dh)

  dlTransforms
  |> Array.mapi((i, t) => interpolateTransform(~range, ~domain=(t, dhTransforms[i]), ~value))
  |> Js.Array.joinWith(" ")
}
