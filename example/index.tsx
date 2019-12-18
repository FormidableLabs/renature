import React from 'react';
import ReactDOM from 'react-dom';

import { vector as Vector, useGravity, useGravity2D } from '../src';

import './index.css';

const positionAttractor: Vector<number> = [150, 150];

const App: React.FC = () => {
  const [propsTranslate, , updateAttractor] = useGravity2D<HTMLDivElement>({
    config: {
      attractorMass: 100000000000,
      moverMass: 20000000,
      attractorPosition: positionAttractor,
      initialMoverVelocity: [0.1, 0],
      threshold: {
        min: 10,
        max: 100,
      },
    },
  });

  const [propsBackground] = useGravity<HTMLDivElement>({
    from: { background: 'rgba(100, 0, 100, 0.5)' },
    to: { background: 'rgba(100, 200, 200, 1)' },
    config: {
      moverMass: 100000,
      attractorMass: 1000000000,
      r: positionAttractor[0],
    },
  });

  const [propsOpacity] = useGravity<HTMLDivElement>({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      moverMass: 100000,
      attractorMass: 1000000000,
      r: positionAttractor[0],
    },
  });

  const [propsLeft] = useGravity<HTMLDivElement>({
    from: { left: '10px' },
    to: { left: '160px' },
    config: {
      moverMass: 100000,
      attractorMass: 1000000000,
      r: positionAttractor[0],
    },
  });

  return (
    <div
      className="grid"
      onMouseMove={(ev: React.MouseEvent<HTMLDivElement>) => {
        updateAttractor({
          position: [ev.pageX, ev.pageY],
        });
      }}
    >
      <div className="panel">
        <div className="mover--transform" {...propsTranslate} />
        <div className="attractor--transform" />
      </div>
      <div className="panel">
        <div className="mover mover--opacity" {...propsOpacity} />
      </div>
      <div className="panel">
        <div className="mover" {...propsBackground} />
      </div>
      <div className="panel">
        <div className="mover mover--left" {...propsLeft} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
