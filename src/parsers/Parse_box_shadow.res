@bs.module("./normalizeColor")
external normalizeColor: string => Js.Nullable.t<float> = "normalizeColor"

let outerWhitespaceRe = %re("/(?!\(.*)\s(?![^(]*?\))/g")
let outerCommaRe = %re("/(?!\(.*),(?![^(]*?\))/g")

let testBoxShadow = val_ =>
  switch val_ {
  | "none" => true
  | _ =>
    let properties = Js.String.splitByRe(outerWhitespaceRe, val_) |> Js.Array.filter(str =>
      switch str {
      | Some(s) => s !== "inset" && normalizeColor(s) === Js.Nullable.null
      | None => false
      }
    )

    switch Array.length(properties) {
    | n when n >= 2 && n <= 4 =>
      properties |> Js.Array.every(p => p->Belt.Option.getWithDefault("") |> Parse_unit.testUnit)
    | _ => false
    }
  }

let testBoxShadows = val_ => {
  let boxShadows = Js.String.splitByRe(outerCommaRe, val_)

  boxShadows |> Js.Array.every(boxShadow =>
    switch boxShadow {
    | Some(bs) => testBoxShadow(Js.String.trim(bs))
    | None => false
    }
  )
}

type cssBoxShadow = {
  offsetX: string,
  offsetY: string,
  blur: string,
  spread: string,
  color: string,
  inset: bool,
}

let none = {
  offsetX: "0",
  offsetY: "0",
  blur: "0",
  spread: "0",
  color: "rgba(0, 0, 0, 1)",
  inset: false,
}

let parseBoxShadow = val_ => {
  let properties = Js.String.splitByRe(outerWhitespaceRe, val_)

  let inset = ref(false)
  let color = ref("rgba(0, 0, 0, 1)")

  let filteredProperties = properties |> Js.Array.filter(s =>
    switch s {
    | Some(s) when s === "inset" =>
      inset := true
      false
    | Some(s) when normalizeColor(s) !== Js.Nullable.null =>
      color := s
      false
    | Some(_) => true
    | None => false
    }
  ) |> Array.map(s => s->Belt.Option.getWithDefault(""))

  switch Array.length(filteredProperties) {
  | n when n >= 2 && n <= 4 => {
      offsetX: filteredProperties[0],
      offsetY: filteredProperties[1],
      blur: Belt.Array.get(filteredProperties, 2)->Belt.Option.getWithDefault("0px"),
      spread: Belt.Array.get(filteredProperties, 3)->Belt.Option.getWithDefault("0px"),
      color: color.contents,
      inset: inset.contents,
    }
  | _ => none
  }
}

let parseBoxShadows = val_ => {
  let boxShadows = Js.String.splitByRe(outerCommaRe, val_)

  boxShadows |> Array.map(boxShadow =>
    switch boxShadow {
    | Some(bs) => Js.String.trim(bs)
    | None => ""
    }
  )
}
