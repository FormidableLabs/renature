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
  repeat,
  repeatType = 'mirror',
  onFrame,
  onAnimationComplete,
  disableHardwareAcceleration,
  reducedMotion,
}: UseFluidResistanceParams): [{ ref: RefObject<E> }, Controller] => {
  const [props, controller] = useFluidResistanceGroup(1, () => ({
    from,
    to,
    config,
    pause,
    delay,
    repeat,
    repeatType,
    onFrame,
    onAnimationComplete,
    disableHardwareAcceleration,
    reducedMotion,
  }));

  return [props[0], controller];
};
