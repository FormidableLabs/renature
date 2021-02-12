import type { RefObject } from 'react';

import type { CSSPairs } from '../parsers';
import {
  GravityConfig,
  gravityDefaultConfig,
  gravityGroup,
  HooksParams,
  Controller,
} from '../animation';

import { useForceGroup } from './useForceGroup';

export type UseGravityParams = CSSPairs &
  HooksParams & {
    config?: GravityConfig;
  };

export const useGravityGroup = <E extends HTMLElement | SVGElement = any>(
  n: number,
  fn: (index: number) => UseGravityParams
): [{ ref: RefObject<E> }[], Controller] =>
  useForceGroup<GravityConfig, E>({
    n,
    fn,
    defaultConfig: gravityDefaultConfig,
    getMaxDistance: (config) => config.r,
    deriveGroup: gravityGroup,
    dimension: 'x',
  });
