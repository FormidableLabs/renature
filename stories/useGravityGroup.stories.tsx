import React, { FC } from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { useGravityGroup } from '../src';
import Button from './components/Button';
import { getRandomHex } from './utils';

import './index.css';

export default {
  title: 'GravityMultiple',
  decorators: [withKnobs],
};

export const GravityMultipleBasic: FC = () => {
  const [nodes] = useGravityGroup(5, (i) => ({
    from: {
      transform: 'translateY(0px)',
      background: '#7860ed',
      borderRadius: '10%',
    },
    to: {
      transform: 'translateY(100px)',
      background: getRandomHex(),
      borderRadius: `${Math.floor(Math.random() * 100)}%`,
    },
    config: {
      moverMass: number('moverMass', 10000),
      attractorMass: number('attractorMass', 1000000000000),
      r: number('r', 7.5),
    },
    delay: i * 500,
    infinite: true,
  }));

  return (
    <div className="stack-horizontal">
      {nodes.map((props, i) => (
        <div className="mover mover--purple" key={i} {...props} />
      ))}
    </div>
  );
};

export const GravityMultipleEventBased: FC = () => {
  const [nodes, controller] = useGravityGroup(5, (i) => ({
    from: {
      transform: 'translateY(0px)',
      background: '#7860ed',
      borderRadius: '10%',
    },
    to: {
      transform: 'translateY(100px)',
      background: getRandomHex(),
      borderRadius: `${Math.floor(Math.random() * 100)}%`,
    },
    config: {
      moverMass: number('moverMass', 10000),
      attractorMass: number('attractorMass', 1000000000000),
      r: number('r', 7.5),
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
      {nodes.map((props, i) => (
        <div className="mover mover--purple" key={i} {...props} />
      ))}
    </div>
  );
};
