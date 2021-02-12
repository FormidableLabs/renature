import type { RefObject } from 'react';

import { Controller, gravityDefaultConfig } from '../animation';

import { useGravityGroup, UseGravityParams } from './useGravityGroup';

export const useGravity = <E extends HTMLElement | SVGElement = any>({
  from,
  to,
  config = gravityDefaultConfig,
  pause = false,
  delay,
  infinite,
  onFrame,
  onAnimationComplete,
  disableHardwareAcceleration,
}: UseGravityParams): [{ ref: RefObject<E> }, Controller] => {
  const [props, controller] = useGravityGroup(1, () => ({
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
