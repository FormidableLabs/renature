const code = (context) => `
import React from 'react';
import { useGravity2D } from 'renature';

function Orbit() {
  const config = {
    attractorMass: 1000000000000,
    moverMass: 10000,
    attractorPosition: [0, 0],
    threshold: {
      min: 20,
      max: 100,
    },
    timeScale: 100,
  };


  const [planetOne] = useGravity2D({
    config: {
      ...config,
      initialMoverPosition: [0, ${context === 'gallery-preview' ? -50 : -100}],
      initialMoverVelocity: [1, 0],
    },
  });

  const [planetTwo] = useGravity2D({
    config: {
      ...config,
      initialMoverPosition: [0, ${context === 'gallery-preview' ? 50 : 100}],
      initialMoverVelocity: [-1, 0],
    },
  });

  return (
    <div className="lp__center">
      <div
        className="lp__orbital-center ${
          context === 'gallery-preview'
            ? 'lp__orbital-center--sm'
            : 'lp__orbital-center--lg'
        }" />
      <div className="lp__orbiter ${
        context === 'gallery-preview' ? 'lp__orbiter--sm' : 'lp__orbiter--lg'
      }" {...planetOne} />
      <div className="lp__orbiter ${
        context === 'gallery-preview' ? 'lp__orbiter--sm' : 'lp__orbiter--lg'
      }" {...planetTwo} />
    </div>
  );
}
`;

export const orbit = (context) => ({
  title: 'Orbit',
  slug: 'orbit/',
  code: code(context),
  demoLink: 'https://codesandbox.io/s/renature-orbit-7w6z0',
});
