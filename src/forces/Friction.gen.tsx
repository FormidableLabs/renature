/* TypeScript file generated from Friction.resi by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:no-var-requires
const Curry = require('bs-platform/lib/es6/curry.js');

// tslint:disable-next-line:no-var-requires
const FrictionBS = require('./Friction.bs');

import {t as Vector_t} from '../../src/core/Vector.gen';

export const frictionForceMag: (_1:{ readonly mu: number; readonly mass: number }) => number = function (Arg1: any) {
  const result = Curry._2(FrictionBS.frictionForceMag, Arg1.mu, Arg1.mass);
  return result
};

export const frictionForceV: (_1:{
  readonly mu: number; 
  readonly mass: number; 
  readonly velocity: Vector_t<number>
}) => Vector_t<number> = function (Arg1: any) {
  const result = Curry._3(FrictionBS.frictionForceV, Arg1.mu, Arg1.mass, Arg1.velocity);
  return result
};

export const getMaxDistanceFriction: (_1:{ readonly mu: number; readonly initialVelocity: number }) => number = function (Arg1: any) {
  const result = Curry._2(FrictionBS.getMaxDistanceFriction, Arg1.mu, Arg1.initialVelocity);
  return result
};
