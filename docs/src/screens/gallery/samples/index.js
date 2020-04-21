import { basic } from './basic';
import { multipleProperties } from './multiple-properties';
import { controlled } from './controlled';
import { pathTracing } from './path-tracing';

export const samples = context => [
  basic(context),
  multipleProperties(context),
  controlled(context),
  pathTracing(context),
];
