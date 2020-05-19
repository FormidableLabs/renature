const code = context => `
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
    <div className="live-preview__center">
      <div
        className="live-preview__orbital-center ${
          context === 'gallery-preview'
            ? 'live-preview__orbital-center--sm'
            : 'live-preview__orbital-center--lg'
        }" />
      <div className="live-preview__orbiter ${
        context === 'gallery-preview'
          ? 'live-preview__orbiter--sm'
          : 'live-preview__orbiter--lg'
      }" {...planetOne} />
      <div className="live-preview__orbiter ${
        context === 'gallery-preview'
          ? 'live-preview__orbiter--sm'
          : 'live-preview__orbiter--lg'
      }" {...planetTwo} />
    </div>
  );
}
`;

export const orbit = context => ({
  title: 'Orbit',
  slug: 'orbit/',
  code: code(context),
});
