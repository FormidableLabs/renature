const code = `
import React from 'react';
import { useFrictionGroup } from 'renature';

function FrictionGroup() {
  const [nodes] = useFrictionGroup(4, i => ({
    from: {
      transform: 'translateX(0px)',
      fill: '#FFCE24',
    },
    to: {
      transform: 'translateX(20px)',
      fill: '#FA24FF',
    },
    config: {
      mu: 0.5,
      mass: 200,
      initialVelocity: 5,
    },
    delay: i * 500,
    infinite: true,
  }));

  return (
    <div className="live-preview__stack-h">
      {nodes.map(props => {
        return (
          <svg height="100" width="100" viewBox="0 0 100 100">
            <polygon points="0,0 80,50 0,100" fill="#FFCE24" {...props} />
          </svg>
        );
      })}
    </div>
  );
}
`;

export const groupedAnimations = {
  title: 'Grouped Animations',
  slug: 'grouped-animations/',
  code,
};
