const code = context => `
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
    immediate: false, // Signal that the animation should not run on mount.
  });

  return (
    <div className="live-preview__stack">
      <button
        className="live-preview__button ${
          context === 'gallery-preview'
            ? 'live-preview__button--sm'
            : 'live-preview__button--lg'
        }"
        onClick={controller.start}
      >
        Run The Animation!
      </button>
      <div
        className="live-preview__mover ${
          context === 'gallery-preview'
            ? 'live-preview__mover--sm'
            : 'live-preview__mover--lg'
        }"
        {...props}
      />
    </div>
  );
}
`;

export const controlled = context => ({
  title: 'Controlled Animations',
  slug: 'controlled-animations/',
  code: code(context),
});
