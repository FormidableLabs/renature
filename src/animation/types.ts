import { vector as Vector } from '../core';
import { Entity } from '../forces';

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
  pause: () => void;
}

export interface AnimationParams {
  onUpdate: VectorSetter;
  onComplete: () => void;
}

export interface HooksParams {
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

export interface AnimatingElement {
  onUpdate: VectorSetter;
  onComplete: () => void;
  infinite?: boolean;
  delay?: number;
  pause?: boolean;
}

export interface StatefulAnimatingElement extends AnimatingElement {
  state: {
    mover: Entity;
    attractor?: Entity;
    playState: PlayState;
    maxDistance: number;
    complete: boolean;
    paused: boolean;
    delayed: boolean;
  };
}
