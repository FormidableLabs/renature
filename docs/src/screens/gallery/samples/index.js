import { basic } from './basic';
import { multipleProperties } from './multiple-properties';
import { controlled } from './controlled';
import { pathTracing } from './path-tracing';
import { boxShadow } from './box-shadow';
import { orbit } from './orbit';
import { groupedAnimations } from './grouped-animations';

export const samples = context => [
  basic(context),
  multipleProperties(context),
  controlled(context),
  pathTracing(context),
  boxShadow(context),
  orbit(context),
  groupedAnimations,
];
