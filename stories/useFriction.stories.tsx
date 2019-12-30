import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { useFriction } from '../src';
import './index.css';

export default {
  title: 'Friction',
  decorators: [withKnobs],
};

export const FrictionOpacity: React.FC = () => {
  const [props] = useFriction<HTMLDivElement>({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      mu: number('mu', 0.05),
      normal: number('normal', 1),
      velocity: number('velocity', 100),
    },
  });

  return <div className="mover mover--opacity" {...props} />;
};

export const FrictionTranslateX: React.FC = () => {
  const [props] = useFriction<HTMLDivElement>({
    from: { transform: 'translateX(0px) translate(-50%, -50%)' },
    to: { transform: 'translateX(300px) translate(-50%, -50%)' },
    config: {
      mu: number('mu', 0.05),
      normal: number('normal', 1),
      velocity: number('velocity', 100),
    },
  });

  return <div className="mover mover--translate" {...props} />;
};
