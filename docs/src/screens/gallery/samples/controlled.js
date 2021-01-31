const code = (context) => `
import React from 'react';
import { useGravity } from 'renature';

function ControlledMover() {
  const [props, controller] = useFriction({
    from: {
      transform: 'scale(1), skew(0deg, 0deg)',
    },
    to: {
      transform: 'scale(0), skew(90deg, 90deg)',
    },
    config: {
      mu: 0.1,
      mass: 50,
      initialVelocity: 1,
    },
    pause: true, // Signal that the animation should not run on mount.
  });

  return (
    <div className="lp__stack">
      <button
        className="lp__button ${
          context === 'gallery-preview' ? 'lp__button--sm' : 'lp__button--lg'
        }"
        onClick={controller.start}
      >
        Run The Animation!
      </button>
      <div
        className="lp__m ${
          context === 'gallery-preview' ? 'lp__m--sm' : 'lp__m--lg'
        }"
        {...props}
      />
    </div>
  );
}
`;

export const controlled = (context) => ({
  title: 'Controlled Animations',
  slug: 'controlled-animations/',
  code: code(context),
});
