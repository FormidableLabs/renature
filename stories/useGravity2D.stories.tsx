import React, { useState, useLayoutEffect, FC } from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { useGravity2D } from '../src';
import './index.css';

export default {
  title: 'Gravity2D',
  decorators: [withKnobs],
};

export const Gravity2DBasic: FC = () => {
  const [center, setCenter] = useState<[number, number]>([0, 0]);

  useLayoutEffect(() => {
    const root = document.getElementById('root');

    if (root) {
      setCenter([root.clientWidth / 2, root.clientHeight / 2]);
    }
  }, []);

  const [props] = useGravity2D({
    config: {
      attractorMass: number('attractorMass', 1000000000000),
      moverMass: number('moverMass', 10000),
      attractorPosition: center,
      initialMoverPosition: [center[0], center[1] - 200],
      initialMoverVelocity: [
        number('initialMoverVelocityX', 1),
        number('initialMoverVelocityY', 0),
      ],
      threshold: {
        min: number('thresholdMin', 20),
        max: number('thresholdMax', 100),
      },
      timeScale: number('timeScale', 100),
    },
  });

  return (
    <div className="space">
      <div className="mover-2d" {...props} />
      <div
        className="attractor-2d"
        style={{ left: center[0], top: center[1] }}
      />
    </div>
  );
};

export const Gravity2DCustomG: FC = () => {
  const [center, setCenter] = useState<[number, number]>([0, 0]);

  useLayoutEffect(() => {
    const root = document.getElementById('root');

    if (root) {
      setCenter([root.clientWidth / 2, root.clientHeight / 2]);
    }
  }, []);

  const [props] = useGravity2D({
    config: {
      attractorMass: number('attractorMass', 20),
      moverMass: number('moverMass', 1),
      attractorPosition: center,
      initialMoverPosition: [center[0] - 50, center[1]],
      initialMoverVelocity: [
        number('initialMoverVelocityX', 0),
        number('initialMoverVelocityY', 2),
      ],
      threshold: {
        min: number('thresholdMin', 10),
        max: number('thresholdMax', 25),
      },
      timeScale: number('timeScale', 100),
      G: number('G', 0.4),
    },
  });

  return (
    <div className="space">
      <div className="mover-2d" {...props} />
      <div
        className="attractor-2d"
        style={{ left: center[0], top: center[1] }}
      />
    </div>
  );
};
