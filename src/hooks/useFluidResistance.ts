import React from 'react';

import { Controller, fluidResistanceDefaultConfig } from '../animation';
import {
  useFluidResistanceGroup,
  UseFluidResistanceArgs,
} from './useFluidResistanceGroup';

export const useFluidResistance = <M extends HTMLElement | SVGElement = any>({
  from,
  to,
  config = fluidResistanceDefaultConfig,
  pause = false,
  delay,
  infinite,
  onFrame,
  onAnimationComplete,
  disableHardwareAcceleration,
}: UseFluidResistanceArgs): [
  { ref: React.MutableRefObject<M | null> },
  Controller
] => {
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
