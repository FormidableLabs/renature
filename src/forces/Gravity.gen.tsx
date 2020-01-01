/* TypeScript file generated by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:no-var-requires
const Curry = require('bs-platform/lib/es6/curry.js');

// tslint:disable-next-line:no-var-requires
const GravityBS = require('./Gravity.bs');

import {t as Vector_t} from '../../src/core/Vector.gen';

export const gU: number = GravityBS.gU;

export const gE: number = GravityBS.gE;

export const gravityForceMag: (_1:{
  readonly attractorMass: number; 
  readonly moverMass: number; 
  readonly r: number
}) => number = function (Arg1: any) {
  const result = Curry._3(GravityBS.gravityForceMag, Arg1.attractorMass, Arg1.moverMass, Arg1.r);
  return result
};

export const gravityForceV: (_1:{
  readonly attractorMass: number; 
  readonly moverMass: number; 
  readonly attractor: Vector_t<number>; 
  readonly mover: Vector_t<number>; 
  readonly threshold?: [number, number]
}, _2:void) => Vector_t<number> = function (Arg1: any, Arg2: any) {
  const result = Curry._6(GravityBS.gravityForceV, Arg1.attractorMass, Arg1.moverMass, Arg1.attractor, Arg1.mover, Arg1.threshold, Arg2);
  return result
};
