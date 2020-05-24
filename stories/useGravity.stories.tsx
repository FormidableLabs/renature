import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { useGravity } from '../src';
import './index.css';

import Button from './components/Button';
import Toggle from './components/Toggle';

export default {
  title: 'Gravity',
  decorators: [withKnobs],
};

export const GravityBasic: React.FC = () => {
  const [props] = useGravity<HTMLDivElement>({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      moverMass: number('moverMass', 10000),
      attractorMass: number('attractorMass', 1000000000000),
      r: number('r', 10),
    },
  });

  return <div className="mover mover--opacity" {...props} />;
};

export const GravityControlled: React.FC = () => {
  const [toggle, setToggle] = React.useState(true);

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
        checked={toggle}
        onChange={() => {
          setToggle(prevToggle => !prevToggle);
        }}
      />
      <div className="mover mover--rotate" {...props} />
    </>
  );
};

export const GravityEventBased: React.FC = () => {
  const [props, controller] = useGravity<HTMLDivElement>({
    from: { transform: 'translateX(0px)' },
    to: { transform: 'translateX(300px)' },
    config: {
      moverMass: number('moverMass', 10000),
      attractorMass: number('attractorMass', 1000000000000),
      r: number('r', 7.5),
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

export const GravityDelay: React.FC = () => {
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

  return <div className="mover mover--scale" {...props} />;
};

export const GravityInfinite: React.FC = () => {
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
    infinite: true,
  });

  return <div className="mover mover--opacity" {...props} />;
};
