import { basic } from './basic';
import { multipleProperties } from './multiple-properties';
import { controlled } from './controlled';

export const samples = context => [
  basic(context),
  multipleProperties(context),
  controlled(context),
];
