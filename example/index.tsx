import React from 'react';
import ReactDOM from 'react-dom';

import { gravity2D, vector as Vector, useGravity } from '../src';

import './index.css';

const positionAttractor: Vector<number> = [150, 150];

const App: React.FC = () => {
  const m1 = React.useRef<HTMLDivElement>(null);

  // Gravity force for the transform demo.
  gravity2D({
    config: {
      attractorMass: 100000000000,
      moverMass: 2000000,
      attractorPosition: positionAttractor,
      initialMoverVelocity: [0.1, 0],
      threshold: {
        min: 10,
        max: 200,
      },
    },
    onUpdate: ({ position: [x, y] }) => {
      if (m1.current) {
        m1.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
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
    <div className="grid">
      <div className="panel">
        <div className="mover--transform" ref={m1} />
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
