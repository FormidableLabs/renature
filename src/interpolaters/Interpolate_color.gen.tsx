/* TypeScript file generated from Interpolate_color.resi by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:no-var-requires
const Curry = require('bs-platform/lib/es6/curry.js');

// tslint:disable-next-line:no-var-requires
const Interpolate_colorBS = require('./Interpolate_color.bs');

import {rgba as Parse_color_rgba} from '../../src/parsers/Parse_color.gen';

export const lerpColor: (_1:{
  readonly acc: Parse_color_rgba; 
  readonly target: Parse_color_rgba; 
  readonly roundness: number
}) => Parse_color_rgba = function (Arg1: any) {
  const result = Curry._3(Interpolate_colorBS.lerpColor, Arg1.acc, Arg1.target, Arg1.roundness);
  return result
};

export const interpolateColor: (_1:{
  readonly range: [number, number]; 
  readonly domain: [Parse_color_rgba, Parse_color_rgba]; 
  readonly value: number
}) => string = function (Arg1: any) {
  const result = Curry._3(Interpolate_colorBS.interpolateColor, Arg1.range, Arg1.domain, Arg1.value);
  return result
};
