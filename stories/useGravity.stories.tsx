import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { useGravity } from '../src';
import './useGravity.css';

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
      r: number('r', 150),
    },
  });

  return <div className="mover" {...props} />;
};

export const GravityTransformTranslateX: React.FC = () => {
  const [props] = useGravity<HTMLDivElement>({
    from: { transform: 'translateX(0px)' },
    to: { transform: 'translateX(300px)' },
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
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
    config: {
      moverMass: number('moverMass', 100000),
      attractorMass: number('attractorMass', 1000000000),
      r: number('r', 150),
    },
  });

  return <div className="mover mover--rotate" {...props} />;
};
