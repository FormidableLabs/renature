const code = (context) => `
import React from 'react';
import { useFriction } from 'renature';

function Mover() {
  const [props] = useFriction({
    from: {
      transform: 'scale(0) rotate(0deg)',
      background: 'orange',
      borderRadius: '0%',
    },
    to: {
      transform: 'scale(2) rotate(360deg)',
      background: 'steelblue',
      borderRadius: '50%',
    },
    config: {
      mu: 0.2,
      mass: 20,
      initialVelocity: 5,
    },
    repeat: Infinity,
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

export const multipleProperties = (context) => ({
  code: code(context),
  title: 'Multiple CSS Properties',
  slug: 'multiple-css-properties/',
});
