import { rAF, forceV, applyForce, vector as Vector, Entity } from "../src";

interface UseGravityArgs {
  moverMass: number;
  attractorMass: number;
  attractor: Vector<number>;
}

const run = (config: UseGravityArgs) => {
  const { start, stop } = rAF();

  start((timestamp, lastFrame, mover) => {
    const diffTime = timestamp > lastFrame + 64 ? 0 : lastFrame;
    const steps = Math.floor(timestamp - diffTime);

    if (steps > 0) {
      let entity: Entity;

      for (let i = 0; i < steps; i++) {
        const force = forceV({
          ...config,
          mover: mover.position
        });

        entity = applyForce({
          force,
          moverMass: config.moverMass,
          acceleration: mover.acceleration,
          velocity: mover.velocity,
          position: mover.position
        });
      }

      return entity;
    }

    const force = forceV({
      ...config,
      mover: mover.position
    });

    return applyForce({
      force,
      moverMass: config.moverMass,
      acceleration: mover.acceleration,
      velocity: mover.velocity,
      position: mover.position
    });
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
