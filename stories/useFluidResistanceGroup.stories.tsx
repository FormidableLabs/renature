import React, { FC } from 'react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';

import { useFluidResistanceGroup } from '../src';
import Button from './components/Button';
import { getRandomHex } from './utils';

import './index.css';

export default {
  title: 'FluidResistanceMultiple',
  decorators: [withKnobs],
};

export const FluidResistanceMultipleBasic: FC = () => {
  const [nodes] = useFluidResistanceGroup<HTMLDivElement>(5, (i) => ({
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
      mass: number('mass', 20),
      rho: number('rho', 20),
      area: number('area', 20),
      cDrag: number('cDrag', 0.1),
      settle: boolean('settle', true),
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

export const FluidResistanceMultipleEventBased: FC = () => {
  const [nodes, controller] = useFluidResistanceGroup(5, (i) => ({
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
      mass: number('mass', 25),
      rho: number('rho', 10),
      area: number('area', 20),
      cDrag: number('cDrag', 0.25),
      settle: boolean('settle', true),
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
