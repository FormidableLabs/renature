import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { useGravity2D, vector as Vector } from '../src';
import './useGravity2D.css';

export default {
  title: 'Gravity2D',
  decorators: [withKnobs],
};

export const Gravity2D: React.FC = () => {
  const [center, setCenter] = React.useState<Vector<number>>([0, 0]);

  React.useLayoutEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      setCenter([root.clientWidth / 2, root.clientHeight / 2]);
    }
  }, []);

  const [props] = useGravity2D({
    config: {
      attractorMass: number('attractorMass', 100000000000),
      moverMass: number('moverMass', 20000000),
      attractorPosition: center,
      initialMoverPosition: [center[0] - 200, center[1] - 200],
      initialMoverVelocity: [
        number('initialMoverVelocityX', 0.1),
        number('initialMoverVelocityY', 0),
      ],
      threshold: {
        min: number('thresholdMin', 10),
        max: number('thresholdMax', 100),
      },
    },
  });

  return (
    <>
      <div className="mover-2d" {...props} />
      <div
        className="attractor-2d"
        style={{ left: center[0], top: center[1] }}
      />
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
Gravity2D.story = {
  name: 'Gravity2D',
};
