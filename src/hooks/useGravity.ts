import type { RefObject } from 'react';

import { Controller, gravityDefaultConfig } from '../animation';

import { useGravityGroup, UseGravityParams } from './useGravityGroup';

export const useGravity = <E extends HTMLElement | SVGElement = any>({
  from,
  to,
  config = gravityDefaultConfig,
  pause = false,
  delay,
  repeat,
  repeatType = 'mirror',
  onFrame,
  onAnimationComplete,
  disableHardwareAcceleration,
  reducedMotion,
}: UseGravityParams): [{ ref: RefObject<E> }, Controller] => {
  const [props, controller] = useGravityGroup(1, () => ({
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
