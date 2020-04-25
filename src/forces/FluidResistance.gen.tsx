/* TypeScript file generated from FluidResistance.rei by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:no-var-requires
const Curry = require('bs-platform/lib/es6/curry.js');

// tslint:disable-next-line:no-var-requires
const FluidResistanceBS = require('./FluidResistance.bs');

import {t as Vector_t} from '../../src/core/Vector.gen';

import {vector as Vector_vector} from '../../src/core/Vector.gen';

export const fluidResistanceForceV: (_1:{
  readonly rho: number; 
  readonly velocity: Vector_vector<number>; 
  readonly area: number; 
  readonly cDrag: number
}) => Vector_t<number> = function (Arg1: any) {
  const result = Curry._4(FluidResistanceBS.fluidResistanceForceV, Arg1.rho, Arg1.velocity, Arg1.area, Arg1.cDrag);
  return result
};

export const getTau: (_1:{
  readonly mass: number; 
  readonly rho: number; 
  readonly cDrag: number; 
  readonly area: number
}) => number = function (Arg1: any) {
  const result = Curry._4(FluidResistanceBS.getTau, Arg1.mass, Arg1.rho, Arg1.cDrag, Arg1.area);
  return result
};

export const getFluidPositionAtTime: (_1:{
  readonly time: number; 
  readonly mass: number; 
  readonly rho: number; 
  readonly cDrag: number; 
  readonly area: number
}) => number = function (Arg1: any) {
  const result = Curry._5(FluidResistanceBS.getFluidPositionAtTime, Arg1.time, Arg1.mass, Arg1.rho, Arg1.cDrag, Arg1.area);
  return result
};

export const getFluidPositionAtTerminalVelocity: (_1:{
  readonly mass: number; 
  readonly rho: number; 
  readonly cDrag: number; 
  readonly area: number
}) => number = function (Arg1: any) {
  const result = Curry._4(FluidResistanceBS.getFluidPositionAtTerminalVelocity, Arg1.mass, Arg1.rho, Arg1.cDrag, Arg1.area);
  return result
};
