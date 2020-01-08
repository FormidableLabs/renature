// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Vector from "../core/Vector.bs.js";

function applyForce(force, entity, time) {
  var nextAcceleration = Vector.divf(force, entity[/* mass */0]);
  var nextVelocity = Vector.addf(entity[/* velocity */2], Vector.multf(nextAcceleration, time));
  var nextPosition = Vector.addf(entity[/* position */3], Vector.multf(nextVelocity, time));
  return /* record */[
          /* mass */entity[/* mass */0],
          /* acceleration */nextAcceleration,
          /* velocity */nextVelocity,
          /* position */nextPosition
        ];
}

export {
  applyForce ,
  
}
/* No side effect */
