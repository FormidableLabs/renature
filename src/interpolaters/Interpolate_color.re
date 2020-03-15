let lerpColor = (~acc, ~target, ~roundness) =>
  Parse_color.{
    r: Math.lerpf(~acc=acc.r, ~target=target.r, ~roundness),
    g: Math.lerpf(~acc=acc.g, ~target=target.g, ~roundness),
    b: Math.lerpf(~acc=acc.b, ~target=target.b, ~roundness),
    a: Math.lerpf(~acc=acc.a, ~target=target.a, ~roundness),
  };

let interpolateColor = (~range as (rl, rh), ~domain as (dl, dh), ~value) => {
  let progress = (value -. rl) /. (rh -. rl);
  let Parse_color.{r, g, b, a} =
    lerpColor(~acc=dl, ~target=dh, ~roundness=progress);
  let (rInt, gInt, bInt) = (Utils.iof(r), Utils.iof(g), Utils.iof(b));
  {j|rgba($rInt, $gInt, $bInt, $a)|j};
};