import { vector as Vector } from '../core';

export type VectorSetter = (values: {
  position: Vector<number>;
  velocity?: Vector<number>;
}) => void;

type Listener = (
  timestamp: number,
  lastFrame: number,
  stop: () => void
) => void;

export interface Controller {
  start: (listener: Listener) => void;
  stop: () => void;
}
