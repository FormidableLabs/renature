import { vector as Vector } from '../core';

export type VectorSetter = (values: {
  position: Vector<number>;
  velocity?: Vector<number>;
}) => void;

export type Listener = (
  timestamp: DOMHighResTimeStamp,
  lastFrame: DOMHighResTimeStamp,
  stop: () => void
) => void;

export interface Controller {
  start: () => void;
  stop: () => void;
}

export interface AnimationParams {
  onUpdate: VectorSetter;
  onComplete: () => void;
  pause?: boolean;
  delay?: number;
  infinite?: boolean;
  onFrame?: (progress: number) => void;
  onAnimationComplete?: () => void;
  disableHardwareAcceleration?: boolean;
}

export enum PlayState {
  Forward = 'forward',
  Reverse = 'reverse',
}
