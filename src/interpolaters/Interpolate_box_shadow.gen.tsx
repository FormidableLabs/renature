/* TypeScript file generated from Interpolate_box_shadow.rei by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:no-var-requires
const Curry = require('bs-platform/lib/es6/curry.js');

// tslint:disable-next-line:no-var-requires
const Interpolate_box_shadowBS = require('./Interpolate_box_shadow.bs');

export const interpolateBoxShadow: (_1:{
  readonly range: [number, number]; 
  readonly domain: [string, string]; 
  readonly value: number
}) => string = function (Arg1: any) {
  const result = Curry._3(Interpolate_box_shadowBS.interpolateBoxShadow, Arg1.range, Arg1.domain, Arg1.value);
  return result
};

export const interpolateBoxShadows: (_1:{
  readonly range: [number, number]; 
  readonly domain: [string, string]; 
  readonly value: number
}) => string = function (Arg1: any) {
  const result = Curry._3(Interpolate_box_shadowBS.interpolateBoxShadows, Arg1.range, Arg1.domain, Arg1.value);
  return result
};
