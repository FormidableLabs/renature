import React from "react";
import ReactDOM from "react-dom";

import {
  gravity1D,
  gravity2D,
  vector as Vector,
  normalizef,
  lerpColorRGBA
} from "../src";

import "./index.css";

const positionAttractor: Vector<number> = [150, 150];

const App: React.FC = () => {
  const m1 = React.useRef<HTMLDivElement>(null);
  const m2 = React.useRef<HTMLDivElement>(null);
  const m3 = React.useRef<HTMLDivElement>(null);

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
        const opacity = normalizef({
          range: [0, positionAttractor[0]],
          value: x
        });
        m2.current.style.opacity = `${opacity}`;
      }
    }
  });

  // Gravity force for the background demo.
  gravity1D({
    config: {
      moverMass: 100000,
      attractorMass: 1000000000,
      r: positionAttractor[0]
    },
    onUpdate: ({ position: [x] }) => {
      if (m3.current) {
        const progress = normalizef({
          range: [0, positionAttractor[0]],
          value: x
        });

        const { r, g, b, a } = lerpColorRGBA({
          acc: { r: 100, g: 0, b: 100, a: 0.5 },
          target: { r: 100, g: 200, b: 200, a: 1 },
          roundness: progress
        });

        m3.current.style.transform = `translate(-50%, -50%) translateX(${x}px)`;
        m3.current.style.background = `rgba(${r}, ${g}, ${b}, ${a})`;
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
      <div className="panel">
        <div className="mover--background" ref={m3} />
      </div>
      <div className="panel"></div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
