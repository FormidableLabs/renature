let interpolateUnit = (~range as (rl, rh), ~domain as (dl, dh), ~value) => {
  let Parse_unit.{value: dlNum, unit: dlUnit} = Parse_unit.parseUnit(dl);
  let Parse_unit.{value: dhNum} = Parse_unit.parseUnit(dh);

  let progress = (value -. rl) /. (rh -. rl);
  let output = Math.lerpf(~acc=dlNum, ~target=dhNum, ~roundness=progress);

  switch (dlUnit->Js.Nullable.toOption) {
  | Some(u) => Utils.sof(output) ++ u
  | None => Utils.sof(output)
  };
};