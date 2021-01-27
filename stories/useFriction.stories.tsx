import React, { useLayoutEffect, useRef, useState, FC, useEffect } from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { useFriction } from '../src';

import Button from './components/Button';
import Toggle from './components/Toggle';

import './index.css';

export default {
  title: 'Friction',
  decorators: [withKnobs],
};

export const FrictionBasic: FC = () => {
  const [props] = useFriction<HTMLDivElement>({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      mu: number('mu', 0.5),
      mass: number('mass', 300),
      initialVelocity: number('velocity', 10),
    },
  });

  return <div className="mover mover--purple" {...props} />;
};

export const FrictionControlled: FC = () => {
  const [toggle, setToggle] = useState(true);

  const [props] = useFriction<HTMLDivElement>({
    from: {
      opacity: toggle ? 0 : 1,
      transform: toggle ? 'scale(0) rotate(0deg)' : 'scale(1) rotate(180deg)',
    },
    to: {
      opacity: toggle ? 1 : 0,
      transform: toggle ? 'scale(1) rotate(180deg)' : 'scale(0) rotate(0deg)',
    },
    config: {
      mu: number('mu', 0.25),
      mass: number('mass', 50),
      initialVelocity: number('initialVelocity', 5),
    },
  });

  return (
    <>
      <Toggle
        on={toggle}
        onChange={() => {
          setToggle((prevToggle) => !prevToggle);
        }}
      />
      <div className="mover mover--yellow" {...props} />
    </>
  );
};

export const FrictionEventBased: FC = () => {
  const [props, controller] = useFriction<HTMLDivElement>({
    from: { transform: 'skewY(0deg)' },
    to: { transform: 'skewY(30deg)' },
    config: {
      mu: number('mu', 0.5),
      mass: number('mass', 300),
      initialVelocity: number('velocity', 10),
    },
    pause: true,
    infinite: true,
  });

  return (
    <>
      <div className="button-container">
        <Button onClick={controller.start}>Start</Button>
        <Button onClick={controller.stop}>Stop</Button>
      </div>
      <div className="mover mover--magenta" {...props} />
    </>
  );
};

export const FrictionDelay: FC = () => {
  const [props] = useFriction<HTMLDivElement>({
    from: {
      background: '#f25050',
      transform: 'scale(1) rotate(0deg)',
    },
    to: {
      background: '#a04ad9',
      transform: 'scale(1.5) rotate(720deg)',
    },
    config: {
      mu: number('mu', 0.5),
      mass: number('mass', 300),
      initialVelocity: number('velocity', 10),
    },
    delay: 2000,
  });

  return <div className="mover mover--red" {...props} />;
};

export const FrictionInfinite: FC = () => {
  const [props] = useFriction<HTMLDivElement>({
    from: {
      background: '#f25050',
      transform: 'scale(1) rotate(0deg)',
    },
    to: {
      background: '#a04ad9',
      transform: 'scale(1.5) rotate(720deg)',
    },
    config: {
      mu: number('mu', 0.5),
      mass: number('mass', 300),
      initialVelocity: number('velocity', 10),
    },
    infinite: true,
  });

  return <div className="mover mover--red" {...props} />;
};

export const FrictionSVG: FC = () => {
  const [pathLength, setPathLength] = useState<number>(0);

  useLayoutEffect(() => {
    const path = document.querySelector<SVGPathElement>('#github-icon');

    if (path && path.getTotalLength() > 0) {
      setPathLength(path.getTotalLength());
    }
  }, []);

  const [props] = useFriction<SVGPathElement>({
    from: {
      strokeDashoffset: 0,
    },
    to: {
      strokeDashoffset: pathLength,
    },
    config: {
      mu: number('mu', 0.25),
      mass: number('mass', 300),
      initialVelocity: number('velocity', 5),
    },
    infinite: true,
  });

  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7860ed"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
        id="github-icon"
        strokeDasharray={pathLength}
        {...props}
      />
    </svg>
  );
};

export const FrictionProgress: FC = () => {
  const progressRef = useRef<HTMLSpanElement>(null);

  useFriction<HTMLDivElement>({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      mu: number('mu', 0.1),
      mass: number('mass', 30),
      initialVelocity: number('velocity', 10),
    },
    onFrame: (progress) => {
      if (progressRef.current) {
        progressRef.current.innerText = `${progress.toFixed(2)}`;
      }
    },
  });

  return <span ref={progressRef} style={{ fontSize: '2rem' }} />;
};

export const FrictionSet: FC = () => {
  const [props, controller] = useFriction<HTMLDivElement>({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      mu: number('mu', 0.5),
      mass: number('mass', 300),
      initialVelocity: number('velocity', 10),
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      controller.set({
        transform: `translate(${
          Math.floor(Math.random() * 300) * (Math.random() > 0.5 ? 1 : -1)
        }px, ${
          Math.floor(Math.random() * 300) * (Math.random() > 0.5 ? 1 : -1)
        }px) rotate(${Math.random() * 360}deg) scale(${Math.random()})`,
        opacity: Math.random(),
      });
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [controller]);

  return <div className="mover mover--magenta" {...props} />;
};
