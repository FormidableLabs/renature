import React from 'react';

import { useGravity2D, vector as Vector } from '../src';
import './useGravity2D.css';

export default {
  title: 'Gravity2D',
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
      attractorMass: 100000000000,
      moverMass: 20000000,
      attractorPosition: center,
      initialMoverVelocity: [0.1, 0.2],
      threshold: {
        min: 10,
        max: 100,
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

Gravity2D.displayName = 'Gravity2D';
