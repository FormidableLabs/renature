import type { RefObject } from 'react';

import { Controller, fluidResistanceDefaultConfig } from '../animation';

import {
  useFluidResistanceGroup,
  UseFluidResistanceParams,
} from './useFluidResistanceGroup';

export const useFluidResistance = <E extends HTMLElement | SVGElement = any>({
  from,
  to,
  config = fluidResistanceDefaultConfig,
  pause = false,
  delay,
  infinite,
  onFrame,
  onAnimationComplete,
  disableHardwareAcceleration,
}: UseFluidResistanceParams): [{ ref: RefObject<E> }, Controller] => {
  const [props, controller] = useFluidResistanceGroup(1, () => ({
    from,
    to,
    config,
    pause,
    delay,
    infinite,
    onFrame,
    onAnimationComplete,
    disableHardwareAcceleration,
  }));

  return [props[0], controller];
};
