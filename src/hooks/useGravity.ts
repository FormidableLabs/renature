import React from 'react';

import { Controller, gravityDefaultConfig } from '../animation';
import { useGravityGroup, UseGravityArgs } from './useGravityGroup';

export const useGravity = <M extends HTMLElement | SVGElement = any>({
  from,
  to,
  config = gravityDefaultConfig,
  pause = false,
  delay,
  infinite,
  onFrame,
  onAnimationComplete,
  disableHardwareAcceleration,
}: UseGravityArgs): [{ ref: React.MutableRefObject<M | null> }, Controller] => {
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
