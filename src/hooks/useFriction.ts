import type { RefObject } from 'react';

import { Controller, frictionDefaultConfig } from '../animation';

import { useFrictionGroup, UseFrictionParams } from './useFrictionGroup';

export const useFriction = <E extends HTMLElement | SVGElement = any>({
  from,
  to,
  config = frictionDefaultConfig,
  pause = false,
  delay,
  repeat,
  onFrame,
  onAnimationComplete,
  disableHardwareAcceleration = false,
  reducedMotion,
}: UseFrictionParams): [{ ref: RefObject<E> }, Controller] => {
  const [props, controller] = useFrictionGroup<E>(1, () => ({
    from,
    to,
    config,
    pause,
    delay,
    repeat,
    onFrame,
    onAnimationComplete,
    disableHardwareAcceleration,
    reducedMotion,
  }));

  return [props[0], controller];
};
