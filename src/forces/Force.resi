export type entity = {
  mass: float,
  acceleration: Vector.t<float>,
  velocity: Vector.t<float>,
  position: Vector.t<float>,
}

export applyForce: (~force: Vector.t<float>, ~entity: entity, ~time: float) => entity
