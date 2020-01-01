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
      mu: number('mu', 0.25),
      mass: number('mass', 50),
      initialVelocity: number('initialVelocity', 5000),
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
      mass: number('mass', 300),
      initialVelocity: number('velocity', 1000),
    },
  });

  return <div className="mover mover--translate" {...props} />;
};

export const FrictionTransformMultiple: React.FC = () => {
  const [props] = useFriction<HTMLDivElement>({
    from: { transform: 'translate(0px, 200px) translate(-50%, -50%)' },
    to: { transform: 'translate(400px, -200px) translate(-50%, -50%)' },
    config: {
      mu: number('mu', 0.05),
      mass: number('mass', 300),
      initialVelocity: number('velocity', 1000),
    },
  });

  return <div className="mover mover--translate" {...props} />;
};
