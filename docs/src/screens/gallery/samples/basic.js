const code = (context) => `
import React from 'react';
import { useGravity } from 'renature';

function Basic() {
  const [props] = useGravity({
    from: { transform: 'translateX(-10vw)' },
    to: { transform: 'translateX(10vw)' },
    config: {
      moverMass: 10000,
      attractorMass: 1000000000000,
      r: 10,
    },
    infinite: true
  });

  return (
    <div
      className="live-preview__mover ${
        context === 'gallery-preview'
          ? 'live-preview__mover--sm'
          : 'live-preview__mover--lg'
      }"
      {...props}
    />
  );
}
`;

export const basic = (context) => ({
  title: 'Basic Transform',
  slug: 'basic-transform/',
  code: code(context),
});
