/* TypeScript file generated from Force.resi by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:no-var-requires
const Curry = require('bs-platform/lib/es6/curry.js');

// tslint:disable-next-line:no-var-requires
const ForceBS = require('./Force.bs');

import {t as Vector_t} from '../../src/core/Vector.gen';

// tslint:disable-next-line:interface-over-type-literal
export type entity = {
  readonly mass: number; 
  readonly acceleration: Vector_t<number>; 
  readonly velocity: Vector_t<number>; 
  readonly position: Vector_t<number>
};
export type Entity = entity;

export const applyForce: (_1:{
  readonly force: Vector_t<number>; 
  readonly entity: entity; 
  readonly time: number
}) => entity = function (Arg1: any) {
  const result = Curry._3(ForceBS.applyForce, Arg1.force, Arg1.entity, Arg1.time);
  return result
};
