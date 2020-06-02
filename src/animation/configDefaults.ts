import { Friction1DParams } from './friction';
import { FluidResistance1DParams } from './fluidResistance';
import { Gravity1DParams } from './gravity';
import { Gravity2DParams } from './gravity2D';

export const fluidResistanceDefaultConfig: FluidResistance1DParams['config'] = {
  mass: 10,
  rho: 20,
  area: 20,
  cDrag: 0.1,
  settle: true,
};

export const frictionDefaultConfig: Friction1DParams['config'] = {
  mu: 0.25,
  mass: 50,
  initialVelocity: 5,
};

export const gravityDefaultConfig: Gravity1DParams['config'] = {
  moverMass: 10000,
  attractorMass: 1000000000000,
  r: 7.5,
};

export const gravity2DDefaultConfig: Gravity2DParams['config'] = {
  attractorMass: 1000000000000,
  moverMass: 10000,
  attractorPosition: [100, 100],
  initialMoverPosition: [100, 0],
  initialMoverVelocity: [1, 0],
  threshold: {
    min: 20,
    max: 100,
  },
  timeScale: 100,
};
