import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { useFrictionGroup } from '../src';
import Button from './components/Button';
import { getRandomHex } from './utils';

import './index.css';

export default {
  title: 'FrictionMultiple',
  decorators: [withKnobs],
};

export const FrictionMultipleBasic: React.FC = () => {
  const [nodes] = useFrictionGroup(5, (i) => ({
    from: {
      transform: 'translateY(0px)',
      background: getRandomHex(),
      borderRadius: `${Math.floor(Math.random() * 100)}%`,
    },
    to: {
      transform: 'translateY(100px)',
      background: getRandomHex(),
      borderRadius: `${Math.floor(Math.random() * 100)}%`,
    },
    config: {
      mu: number('mu', 0.5),
      mass: number('mass', 300),
      initialVelocity: number('velocity', 10),
    },
    delay: i * 500,
    infinite: true,
  }));

  return (
    <div className="stack-horizontal">
      {nodes.map(({ ref }, i) => (
        <div className="mover mover--opacity" ref={ref} key={i} />
      ))}
    </div>
  );
};

export const FrictionMultipleEventBased: React.FC = () => {
  const [nodes, controller] = useFrictionGroup(5, (i) => ({
    from: {
      transform: 'translateY(0px)',
      background: getRandomHex(),
      borderRadius: `${Math.floor(Math.random() * 100)}%`,
    },
    to: {
      transform: 'translateY(100px)',
      background: getRandomHex(),
      borderRadius: `${Math.floor(Math.random() * 100)}%`,
    },
    config: {
      mu: number('mu', 0.5),
      mass: number('mass', 300),
      initialVelocity: number('velocity', 10),
    },
    pause: true,
    delay: i * 1000,
    infinite: true,
  }));

  return (
    <div className="stack-horizontal">
      <div className="button-container">
        <Button onClick={controller.start}>Start</Button>
        <Button onClick={controller.pause}>Pause</Button>
        <Button onClick={controller.stop}>Stop</Button>
      </div>
      {nodes.map(({ ref }, i) => (
        <div className="mover mover--opacity" ref={ref} key={i} />
      ))}
    </div>
  );
};
