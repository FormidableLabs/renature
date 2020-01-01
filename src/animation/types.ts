import { vector as Vector } from '../core/Vector.gen';

export type VectorSetter = (values: {
  position: Vector<number>;
  velocity: Vector<number>;
}) => void;
