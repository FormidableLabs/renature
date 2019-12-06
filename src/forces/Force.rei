[@genType "Entity"]
type entity = {
  mass: float,
  acceleration: Vector.t(float),
  velocity: Vector.t(float),
  position: Vector.t(float),
};

[@genType]
let applyForce: (~force: Vector.t(float), ~entity: entity) => entity;