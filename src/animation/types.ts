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

export interface AnimationInitializer {
  start: () => { stop: () => void };
}

export interface Controller extends AnimationInitializer {
  stop: () => void;
}

export interface AnimationParams {
  onUpdate: VectorSetter;
  onComplete: () => void;
  immediate?: boolean;
  delay?: number;
}
