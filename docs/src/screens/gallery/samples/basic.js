const code = (context) => `
import React from 'react';
import { useGravity } from 'renature';

function Basic() {
  const [props] = useGravity({
    from: { transform: 'translateX(-100px)' },
    to: { transform: 'translateX(100px)' },
    config: {
      moverMass: 10000,
      attractorMass: 1000000000000,
      r: 10,
    },
    infinite: true
  });

  return (
    <div
      className="lp__m ${
        context === 'gallery-preview' ? 'lp__m--sm' : 'lp__m--lg'
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
