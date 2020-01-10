import React from 'react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';

import { useFluidResistance } from '../src';
import Toggle from './components/Toggle';
import Button from './components/Button';

export default {
  title: 'FluidResistance',
  decorators: [withKnobs],
};

export const FluidResistanceBasic: React.FC = () => {
  const [props] = useFluidResistance<HTMLDivElement>({
    from: {
      transform: 'translateY(-200%) translate(-50%, -50%)',
    },
    to: {
      transform: 'translateY(200%) translate(-50%, -50%)',
    },
    config: {
      mass: number('mass', 25),
      rho: number('rho', 10),
      area: number('area', 20),
      cDrag: number('cDrag', 0.1),
      settle: boolean('settle', true),
    },
  });

  return <div {...props} className="mover mover--translate" />;
};

export const FluidResistanceControlled: React.FC = () => {
  const [toggle, setToggle] = React.useState(true);

  const [props] = useFluidResistance<HTMLDivElement>({
    from: {
      opacity: toggle ? 0 : 1,
      transform: toggle
        ? 'scale(0) rotate(0deg) translate(-50%, -50%)'
        : 'scale(1) rotate(180deg) translate(-50%, -50%)',
    },
    to: {
      opacity: toggle ? 1 : 0,
      transform: toggle
        ? 'scale(1) rotate(180deg) translate(-50%, -50%)'
        : 'scale(0) rotate(0deg) translate(-50%, -50%)',
    },
    config: {
      mass: number('mass', 25),
      rho: number('rho', 10),
      area: number('area', 20),
      cDrag: number('cDrag', 0.1),
      settle: boolean('settle', false),
    },
  });

  return (
    <>
      <Toggle
        checked={toggle}
        onChange={() => {
          setToggle(prevToggle => !prevToggle);
        }}
      />
      <div className="mover mover--rotate" {...props} />
    </>
  );
};

export const FluidResistanceEventBased: React.FC = () => {
  const [props, controller] = useFluidResistance<HTMLDivElement>({
    from: { transform: 'translateX(0px) translate(-50%, -50%)' },
    to: { transform: 'translateX(300px) translate(-50%, -50%)' },
    config: {
      mass: number('mass', 25),
      rho: number('rho', 10),
      area: number('area', 20),
      cDrag: number('cDrag', 0.1),
      settle: boolean('settle', false),
    },
    immediate: false,
  });

  return (
    <>
      <Button onClick={controller.start}>Run Animation</Button>
      <div className="mover mover--translate" {...props} />
    </>
  );
};

export const FluidResistanceDelay: React.FC = () => {
  const [props] = useFluidResistance<HTMLDivElement>({
    from: {
      background: '#f25050',
      transform: 'scale(1) rotate(0deg) translate(-50%, -50%)',
    },
    to: {
      background: '#a04ad9',
      transform: 'scale(1.5) rotate(720deg) translate(-50%, -50%)',
    },
    config: {
      mass: number('mass', 25),
      rho: number('rho', 10),
      area: number('area', 20),
      cDrag: number('cDrag', 0.1),
      settle: boolean('settle', false),
    },
    delay: 2000,
  });

  return <div className="mover mover--scale" {...props} />;
};

export const FluidResistanceInfinite: React.FC = () => {
  const [props] = useFluidResistance<HTMLDivElement>({
    from: {
      background: '#f25050',
      transform: 'scale(1) rotate(0deg) translate(-50%, -50%)',
    },
    to: {
      background: '#a04ad9',
      transform: 'scale(1.5) rotate(720deg) translate(-50%, -50%)',
    },
    config: {
      mass: number('mass', 25),
      rho: number('rho', 20),
      area: number('area', 20),
      cDrag: number('cDrag', 0.1),
      settle: boolean('settle', true),
    },
    infinite: true,
  });

  return <div className="mover mover--opacity" {...props} />;
};
