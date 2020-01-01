import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { useGravity2D, vector as Vector } from '../src';
import './index.css';

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

  const [planetOneProps] = useGravity2D({
    config: {
      attractorMass: number('attractorMass', 100000000000),
      moverMass: number('moverMass', 20000000),
      attractorPosition: center,
      initialMoverPosition: [center[0] - 200, center[1] - 200],
      initialMoverVelocity: [
        number('initialMoverVelocityX', 0.2),
        number('initialMoverVelocityY', 0),
      ],
      threshold: {
        min: number('thresholdMin', 20),
        max: number('thresholdMax', 100),
      },
    },
  });

  const [planetTwoProps] = useGravity2D({
    config: {
      attractorMass: 100000000000,
      moverMass: 2000000000,
      attractorPosition: center,
      initialMoverPosition: [center[0] - 200, center[1] + 100],
      initialMoverVelocity: [0, 0.25],
      threshold: {
        min: 20,
        max: 200,
      },
    },
  });

  return (
    <div className="space">
      <div className="mover-2d" {...planetOneProps} />
      <div className="mover-2d mover-2d--secondary" {...planetTwoProps} />
      <div
        className="attractor-2d"
        style={{ left: center[0], top: center[1] }}
      />
    </div>
  );
};

// @ts-ignore
Gravity2D.story = {
  name: 'Gravity2D',
};

export const Gravity2DMouseMove: React.FC = () => {
  const [center, setCenter] = React.useState<Vector<number>>([0, 0]);

  React.useLayoutEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      setCenter([root.clientWidth / 2, root.clientHeight / 2]);
    }
  }, []);

  const [props, controller] = useGravity2D({
    config: {
      attractorMass: number('attractorMass', 100000000000),
      moverMass: number('moverMass', 200000000),
      attractorPosition: center,
      initialMoverPosition: [center[0] - 200, center[1] - 200],
      initialMoverVelocity: [
        number('initialMoverVelocityX', 0),
        number('initialMoverVelocityY', 0),
      ],
      threshold: {
        min: number('thresholdMin', 10),
        max: number('thresholdMax', 200),
      },
    },
  });

  return (
    <div
      className="space"
      onMouseMove={({ pageX, pageY }) => {
        controller.updateAttractor({
          position: [pageX, pageY] as Vector<number>,
        });
      }}
    >
      <div className="mover-2d" {...props} />
    </div>
  );
};

// @ts-ignore
Gravity2DMouseMove.story = {
  name: 'Gravity2DMouseMove',
};
