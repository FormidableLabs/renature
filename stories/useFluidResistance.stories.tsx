import React, { useState, FC } from 'react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';

import { useFluidResistance } from '../src';
import Toggle from './components/Toggle';
import Button from './components/Button';

export default {
  title: 'FluidResistance',
  decorators: [withKnobs],
};

export const FluidResistanceBasic: FC = () => {
  const [props] = useFluidResistance<HTMLDivElement>({
    from: {
      transform: 'translateY(-100%)',
    },
    to: {
      transform: 'translateY(100%)',
    },
    config: {
      mass: number('mass', 20),
      rho: number('rho', 20),
      area: number('area', 20),
      cDrag: number('cDrag', 0.1),
      settle: boolean('settle', true),
    },
  });

  return <div className="mover mover--magenta" {...props} />;
};

export const FluidResistanceControlled: FC = () => {
  const [toggle, setToggle] = useState(true);

  const [props] = useFluidResistance<HTMLDivElement>({
    from: {
      opacity: toggle ? 0 : 1,
      transform: toggle ? 'scale(0) rotate(0deg)' : 'scale(1) rotate(180deg)',
    },
    to: {
      opacity: toggle ? 1 : 0,
      transform: toggle ? 'scale(1) rotate(180deg)' : 'scale(0) rotate(0deg)',
    },
    config: {
      mass: number('mass', 20),
      rho: number('rho', 20),
      area: number('area', 20),
      cDrag: number('cDrag', 0.1),
      settle: boolean('settle', true),
    },
  });

  return (
    <>
      <Toggle
        on={toggle}
        onChange={() => {
          setToggle((prevToggle) => !prevToggle);
        }}
      />
      <div className="mover mover--yellow" {...props} />
    </>
  );
};

export const FluidResistanceEventBased: FC = () => {
  const [props, controller] = useFluidResistance<HTMLDivElement>({
    from: { transform: 'skewY(0deg)' },
    to: { transform: 'skewY(30deg)' },
    config: {
      mass: number('mass', 20),
      rho: number('rho', 20),
      area: number('area', 20),
      cDrag: number('cDrag', 0.1),
      settle: boolean('settle', false),
    },
    pause: true,
    infinite: true,
  });

  return (
    <>
      <div className="button-container">
        <Button onClick={controller.start}>Start</Button>
        <Button onClick={controller.stop}>Stop</Button>
      </div>
      <div className="mover mover--magenta" {...props} />
    </>
  );
};

export const FluidResistanceDelay: FC = () => {
  const [props] = useFluidResistance<HTMLDivElement>({
    from: {
      background: '#f25050',
      transform: 'scale(1) rotate(0deg)',
    },
    to: {
      background: '#a04ad9',
      transform: 'scale(1.5) rotate(720deg)',
    },
    config: {
      mass: number('mass', 20),
      rho: number('rho', 20),
      area: number('area', 20),
      cDrag: number('cDrag', 0.1),
      settle: boolean('settle', true),
    },
    delay: 2000,
  });

  return <div className="mover mover--red" {...props} />;
};

export const FluidResistanceInfinite: FC = () => {
  const [props] = useFluidResistance<HTMLDivElement>({
    from: {
      background: '#f25050',
      transform: 'scale(1) rotate(0deg)',
    },
    to: {
      background: '#a04ad9',
      transform: 'scale(1.5) rotate(720deg)',
    },
    config: {
      mass: number('mass', 20),
      rho: number('rho', 20),
      area: number('area', 20),
      cDrag: number('cDrag', 0.1),
      settle: boolean('settle', true),
    },
    infinite: true,
  });

  return <div className="mover mover--purple" {...props} />;
};

export const FluidResistanceBoxShadow: FC = () => {
  const [props] = useFluidResistance<HTMLDivElement>({
    from: {
      boxShadow: '20px 20px 50px teal, -20px -20px 50px orange',
    },
    to: {
      boxShadow: '-20px -20px 0px orange, 20px 20px 0px teal',
    },
    config: {
      mass: number('mass', 20),
      rho: number('rho', 20),
      area: number('area', 20),
      cDrag: number('cDrag', 0.1),
      settle: boolean('settle', true),
    },
    infinite: true,
  });

  return <div className="mover mover--purple" {...props} />;
};
