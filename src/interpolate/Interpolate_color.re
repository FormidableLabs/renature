type rgba('a) = {
  r: 'a,
  g: 'a,
  b: 'a,
  a: 'a,
};

let lerpColorRGBA = (~acc, ~target, ~roundness) => {
  r: Interpolate_number.lerpf(~acc=acc.r, ~target=target.r, ~roundness),
  g: Interpolate_number.lerpf(~acc=acc.g, ~target=target.g, ~roundness),
  b: Interpolate_number.lerpf(~acc=acc.b, ~target=target.b, ~roundness),
  a: Interpolate_number.lerpf(~acc=acc.a, ~target=target.a, ~roundness),
};

let remapColor = (~range as (rl, rh), ~domain as (dl, dh), ~value) => {
  let progress = (value -. rl) /. (rh -. rl);
  let {r, g, b, a} = lerpColorRGBA(~acc=dl, ~target=dh, ~roundness=progress);
  let (rInt, gInt, bInt) = (Utils.iof(r), Utils.iof(g), Utils.iof(b));
  {j|rgba($rInt, $gInt, $bInt, $a)|j};
};