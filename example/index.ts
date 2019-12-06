import { rAF, forceV, applyForce, vector as Vector, Entity } from "../src";

interface UseGravityArgs {
  moverMass: number;
  attractorMass: number;
  attractor: Vector<number>;
}

const applyForceForStep = (config: UseGravityArgs, mover: Entity) => {
  const force = forceV({
    ...config,
    mover: mover.position
  });

  return applyForce({
    force,
    entity: {
      mass: config.moverMass,
      acceleration: mover.acceleration,
      velocity: mover.velocity,
      position: mover.position
    }
  });
};

const run = (config: UseGravityArgs) => {
  const { start, stop } = rAF();

  start((timestamp, lastFrame, mover) => {
    const diffTime = timestamp > lastFrame + 64 ? 0 : lastFrame;
    const steps = Math.floor(timestamp - diffTime);

    let entity: Entity;

    if (steps > 0) {
      for (let i = 0; i < steps; i++) {
        entity = applyForceForStep(config, mover);
      }
    } else {
      entity = applyForceForStep(config, mover);
    }

    return entity;
  });

  setTimeout(() => {
    stop();
  }, 1000);
};

run({
  moverMass: 20,
  attractorMass: 10000,
  attractor: [500, 500]
});
