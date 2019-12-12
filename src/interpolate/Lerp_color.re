type rgba('a) = {
  r: 'a,
  g: 'a,
  b: 'a,
  a: 'a,
};

let lerpColorRGBA = (~acc, ~target, ~roundness) => {
  r: Lerp_number.lerpf(~acc=acc.r, ~target=target.r, ~roundness),
  g: Lerp_number.lerpf(~acc=acc.g, ~target=target.g, ~roundness),
  b: Lerp_number.lerpf(~acc=acc.b, ~target=target.b, ~roundness),
  a: Lerp_number.lerpf(~acc=acc.a, ~target=target.a, ~roundness),
};