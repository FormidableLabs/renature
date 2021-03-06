/* TypeScript file generated from Interpolate_transform.resi by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:no-var-requires
const Curry = require('bs-platform/lib/es6/curry.js');

// tslint:disable-next-line:no-var-requires
const Interpolate_transformBS = require('./Interpolate_transform.bs');

export const interpolateTransform: (_1:{
  readonly range: [number, number]; 
  readonly domain: [string, string]; 
  readonly value: number
}) => string = function (Arg1: any) {
  const result = Curry._3(Interpolate_transformBS.interpolateTransform, Arg1.range, Arg1.domain, Arg1.value);
  return result
};

export const interpolateTransforms: (_1:{
  readonly range: [number, number]; 
  readonly domain: [string, string]; 
  readonly value: number
}) => string = function (Arg1: any) {
  const result = Curry._3(Interpolate_transformBS.interpolateTransforms, Arg1.range, Arg1.domain, Arg1.value);
  return result
};
