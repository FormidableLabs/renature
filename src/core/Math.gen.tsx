/* TypeScript file generated from Math.resi by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:no-var-requires
const Curry = require('bs-platform/lib/es6/curry.js');

// tslint:disable-next-line:no-var-requires
const MathBS = require('./Math.bs');

export const constrainf: (_1:{ readonly low: number; readonly high: number }, _2:number) => number = function (Arg1: any, Arg2: any) {
  const result = Curry._3(MathBS.constrainf, Arg1.low, Arg1.high, Arg2);
  return result
};

export const lerpf: (_1:{
  readonly acc: number; 
  readonly target: number; 
  readonly roundness: number
}) => number = function (Arg1: any) {
  const result = Curry._3(MathBS.lerpf, Arg1.acc, Arg1.target, Arg1.roundness);
  return result
};

export const remapf: (_1:{
  readonly range: [number, number]; 
  readonly domain: [number, number]; 
  readonly value: number
}) => number = function (Arg1: any) {
  const result = Curry._3(MathBS.remapf, Arg1.range, Arg1.domain, Arg1.value);
  return result
};

export const normalizef: (_1:{ readonly range: [number, number]; readonly value: number }) => number = function (Arg1: any) {
  const result = Curry._2(MathBS.normalizef, Arg1.range, Arg1.value);
  return result
};
