import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { useGravity } from '../src';
import './index.css';

export default {
  title: 'Gravity',
  decorators: [withKnobs],
};

export const GravityOpacity: React.FC = () => {
  const [props] = useGravity<HTMLDivElement>({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      moverMass: number('moverMass', 100000),
      attractorMass: number('attractorMass', 1000000000),
      r: number('r', 150),
    },
  });

  return <div className="mover mover--opacity" {...props} />;
};

export const GravityBackground: React.FC = () => {
  const [props] = useGravity<HTMLDivElement>({
    from: { background: '#A93BD9' },
    to: { background: '#F28A2E' },
    config: {
      moverMass: number('moverMass', 100000),
      attractorMass: number('attractorMass', 1000000000),
      r: number('r', 50),
    },
  });

  return <div className="mover" {...props} />;
};

export const GravityTranslateX: React.FC = () => {
  const [props] = useGravity<HTMLDivElement>({
    from: { transform: 'translateX(0px) translate(-50%, -50%)' },
    to: { transform: 'translateX(300px) translate(-50%, -50%)' },
    config: {
      moverMass: number('moverMass', 100000),
      attractorMass: number('attractorMass', 1000000000),
      r: number('r', 150),
    },
  });

  return <div className="mover mover--translate" {...props} />;
};

export const GravityRotate: React.FC = () => {
  const [props] = useGravity<HTMLDivElement>({
    from: { transform: 'rotate(0deg) translate(-50%, -50%)' },
    to: { transform: 'rotate(360deg) translate(-50%, -50%)' },
    config: {
      moverMass: number('moverMass', 100000),
      attractorMass: number('attractorMass', 1000000000),
      r: number('r', 150),
    },
  });

  return <div className="mover mover--rotate" {...props} />;
};

export const GravityScale: React.FC = () => {
  const [props] = useGravity<HTMLDivElement>({
    from: { transform: 'scale(1, 1)' },
    to: { transform: 'scale(2, 4)' },
    config: {
      moverMass: number('moverMass', 100000),
      attractorMass: number('attractorMass', 1000000000),
      r: number('r', 150),
    },
  });

  return <div className="mover mover--scale" {...props} />;
};

export const GravityTransformMultiple: React.FC = () => {
  const [props] = useGravity<HTMLDivElement>({
    from: {
      transform:
        'scale(1, 1) rotate(0deg) translate(0px, 0px) skew(0deg, 0deg)',
    },
    to: {
      transform:
        'scale(4, 4) rotate(180deg) translate(-50px, 50px) skew(30deg, 70deg)',
    },
    config: {
      moverMass: number('moverMass', 100000),
      attractorMass: number('attractorMass', 1000000000),
      r: number('r', 150),
    },
  });

  return <div className="mover mover--rotate" {...props} />;
};
