/* TypeScript file generated from Vector.rei by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:no-var-requires
const Curry = require('bs-platform/lib/es6/curry.js');

// tslint:disable-next-line:no-var-requires
const VectorBS = require('./Vector.bs');

// tslint:disable-next-line:interface-over-type-literal
export type vector<a> = [a, a];

// tslint:disable-next-line:interface-over-type-literal
export type t<a> = vector<a>;

export const add: (_1:{ readonly v1: vector<number>; readonly v2: vector<number> }) => vector<number> = function (Arg1: any) {
  const result = Curry._2(VectorBS.add, Arg1.v1, Arg1.v2);
  return result
};

export const addf: (_1:{ readonly v1: vector<number>; readonly v2: vector<number> }) => vector<number> = function (Arg1: any) {
  const result = Curry._2(VectorBS.addf, Arg1.v1, Arg1.v2);
  return result
};

export const sub: (_1:{ readonly v1: vector<number>; readonly v2: vector<number> }) => vector<number> = function (Arg1: any) {
  const result = Curry._2(VectorBS.sub, Arg1.v1, Arg1.v2);
  return result
};

export const subf: (_1:{ readonly v1: vector<number>; readonly v2: vector<number> }) => vector<number> = function (Arg1: any) {
  const result = Curry._2(VectorBS.subf, Arg1.v1, Arg1.v2);
  return result
};

export const mult: (_1:{ readonly v: vector<number>; readonly s: number }) => vector<number> = function (Arg1: any) {
  const result = Curry._2(VectorBS.mult, Arg1.v, Arg1.s);
  return result
};

export const multf: (_1:{ readonly v: vector<number>; readonly s: number }) => vector<number> = function (Arg1: any) {
  const result = Curry._2(VectorBS.multf, Arg1.v, Arg1.s);
  return result
};

export const div: (_1:{ readonly v: vector<number>; readonly s: number }) => vector<number> = function (Arg1: any) {
  const result = Curry._2(VectorBS.div, Arg1.v, Arg1.s);
  return result
};

export const divf: (_1:{ readonly v: vector<number>; readonly s: number }) => vector<number> = function (Arg1: any) {
  const result = Curry._2(VectorBS.divf, Arg1.v, Arg1.s);
  return result
};

export const mag: (_1:vector<number>) => number = VectorBS.mag;

export const magf: (_1:vector<number>) => number = VectorBS.magf;

export const norm: (_1:vector<number>) => vector<number> = VectorBS.norm;

export const normf: (_1:vector<number>) => vector<number> = VectorBS.normf;

export const lerpV: (_1:{
  readonly acc: vector<number>; 
  readonly target: vector<number>; 
  readonly roundness: number
}) => vector<number> = function (Arg1: any) {
  const result = Curry._3(VectorBS.lerpV, Arg1.acc, Arg1.target, Arg1.roundness);
  return result
};

export const lerpfV: (_1:{
  readonly acc: vector<number>; 
  readonly target: vector<number>; 
  readonly roundness: number
}) => vector<number> = function (Arg1: any) {
  const result = Curry._3(VectorBS.lerpfV, Arg1.acc, Arg1.target, Arg1.roundness);
  return result
};
