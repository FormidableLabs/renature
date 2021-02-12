import type { RefObject } from 'react';

import type { CSSPairs } from '../parsers';
import {
  FluidResistanceConfig,
  HooksParams,
  Controller,
  fluidResistanceDefaultConfig,
  fluidResistanceGroup,
} from '../animation';
import { getFluidPositionAtTerminalVelocity } from '../forces';

import { useForceGroup } from './useForceGroup';

export type UseFluidResistanceParams = CSSPairs &
  HooksParams & {
    config?: FluidResistanceConfig;
  };

export const useFluidResistanceGroup = <
  E extends HTMLElement | SVGElement = any
>(
  n: number,
  fn: (index: number) => UseFluidResistanceParams
): [{ ref: RefObject<E> }[], Controller] =>
  useForceGroup<FluidResistanceConfig, E>({
    n,
    fn,
    defaultConfig: fluidResistanceDefaultConfig,
    getMaxDistance: getFluidPositionAtTerminalVelocity,
    deriveGroup: fluidResistanceGroup,
    dimension: 'y',
  });
