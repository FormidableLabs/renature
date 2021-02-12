import type { RefObject } from 'react';

import type { CSSPairs } from '../parsers';
import {
  FrictionConfig,
  frictionDefaultConfig,
  frictionGroup,
  HooksParams,
  Controller,
} from '../animation';
import { getMaxDistanceFriction } from '../forces';

import { useForceGroup } from './useForceGroup';

export type UseFrictionParams = CSSPairs &
  HooksParams & {
    config?: FrictionConfig;
  };

export const useFrictionGroup = <E extends HTMLElement | SVGElement = any>(
  n: number,
  fn: (index: number) => UseFrictionParams
): [{ ref: RefObject<E> }[], Controller] =>
  useForceGroup<FrictionConfig, E>({
    n,
    fn,
    defaultConfig: frictionDefaultConfig,
    getMaxDistance: getMaxDistanceFriction,
    deriveGroup: frictionGroup,
    dimension: 'x',
  });
