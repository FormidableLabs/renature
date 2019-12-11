import React from "react";
import ReactDOM from "react-dom";
import { gravity1D, gravity2D, vector as Vector, normNumber } from "../src";

import "./index.css";

const positionAttractor: Vector<number> = [150, 150];

const App: React.FC = () => {
  const m1 = React.useRef<HTMLDivElement>(null);
  const m2 = React.useRef<HTMLDivElement>(null);

  // Gravity force for the transform demo.
  gravity2D({
    config: {
      attractorMass: 100000000000,
      moverMass: 2000000,
      attractorPosition: positionAttractor,
      initialMoverVelocity: [0.1, 0],
      threshold: {
        min: 10,
        max: 200
      }
    },
    onUpdate: ({ position: [x, y] }) => {
      if (m1.current) {
        m1.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
    }
  });

  // Gravity force for the opacity demo.
  gravity1D({
    config: {
      moverMass: 100000,
      attractorMass: 1000000000,
      r: positionAttractor[0]
    },
    onUpdate: ({ position: [x] }) => {
      if (m2.current) {
        const opacity = normNumber({
          low: 0,
          high: positionAttractor[1],
          value: x
        });
        m2.current.style.opacity = `${opacity}`;
      }
    }
  });

  return (
    <div className="grid">
      <div className="panel">
        <div className="mover--transform" ref={m1} />
        <div className="attractor--transform" />
      </div>
      <div className="panel">
        <div className="mover--opacity" ref={m2} />
      </div>
      <div className="panel"></div>
      <div className="panel"></div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
