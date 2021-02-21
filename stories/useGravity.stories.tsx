import React, { useState, FC } from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { useGravity } from '../src';

import Button from './components/Button';
import Toggle from './components/Toggle';

import './index.css';

export default {
  title: 'Gravity',
  decorators: [withKnobs],
};

export const GravityBasic: FC = () => {
  const [props] = useGravity<HTMLDivElement>({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      moverMass: number('moverMass', 10000),
      attractorMass: number('attractorMass', 1000000000000),
      r: number('r', 10),
    },
  });

  return <div className="mover mover--purple" {...props} />;
};

export const GravityControlled: FC = () => {
  const [toggle, setToggle] = useState<boolean>(true);

  const [props] = useGravity<HTMLDivElement>({
    from: {
      opacity: toggle ? 0 : 1,
      transform: toggle ? 'scale(0) rotate(0deg)' : 'scale(1) rotate(180deg)',
    },
    to: {
      opacity: toggle ? 1 : 0,
      transform: toggle ? 'scale(1) rotate(180deg)' : 'scale(0) rotate(0deg)',
    },
    config: {
      moverMass: number('moverMass', 10000),
      attractorMass: number('attractorMass', 1000000000000),
      r: number('r', 10),
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

export const GravityEventBased: FC = () => {
  const [props, controller] = useGravity<HTMLDivElement>({
    from: { transform: 'skewY(0deg)' },
    to: { transform: 'skewY(30deg)' },
    config: {
      moverMass: number('moverMass', 10000),
      attractorMass: number('attractorMass', 1000000000000),
      r: number('r', 7.5),
    },
    pause: true,
    repeat: Infinity,
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

export const GravityDelay: FC = () => {
  const [props] = useGravity<HTMLDivElement>({
    from: {
      background: '#f25050',
      transform: 'scale(1) rotate(0deg)',
    },
    to: {
      background: '#a04ad9',
      transform: 'scale(1.5) rotate(720deg)',
    },
    config: {
      moverMass: number('moverMass', 10000),
      attractorMass: number('attractorMass', 1000000000000),
      r: number('r', 7.5),
    },
    delay: 2000,
  });

  return <div className="mover mover--red" {...props} />;
};

export const GravityInfinite: FC = () => {
  const [props] = useGravity<HTMLDivElement>({
    from: {
      background: '#f25050',
      transform: 'scale(1) rotate(0deg)',
    },
    to: {
      background: '#a04ad9',
      transform: 'scale(1.5) rotate(720deg)',
    },
    config: {
      moverMass: number('moverMass', 10000),
      attractorMass: number('attractorMass', 1000000000000),
      r: number('r', 7.5),
    },
    repeat: Infinity,
  });

  return <div className="mover mover--purple" {...props} />;
};
