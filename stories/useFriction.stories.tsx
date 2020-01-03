import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { useFriction } from '../src';
import './index.css';
import './toggle.css';
import './button.css';

export default {
  title: 'Friction',
  decorators: [withKnobs],
};

export const FrictionMultiple: React.FC = () => {
  const [toggle, setToggle] = React.useState(true);

  const [props] = useFriction<HTMLDivElement>({
    from: {
      opacity: toggle ? 0 : 1,
      transform: toggle
        ? 'scale(0) rotate(0deg) translate(-50%, -50%)'
        : 'scale(1) rotate(180deg) translate(-50%, -50%)',
    },
    to: {
      opacity: toggle ? 1 : 0,
      transform: toggle
        ? 'scale(1) rotate(180deg) translate(-50%, -50%)'
        : 'scale(0) rotate(0deg) translate(-50%, -50%)',
    },
    config: {
      mu: number('mu', 0.25),
      mass: number('mass', 50),
      initialVelocity: number('initialVelocity', 5),
    },
  });

  return (
    <>
      <div className="toggle">
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          checked={toggle}
          onChange={() => {
            setToggle(prevToggle => !prevToggle);
          }}
        />
        <label htmlFor="toggle"></label>
      </div>
      <div className="mover mover--opacity" {...props} />
    </>
  );
};

export const FrictionTranslateX: React.FC = () => {
  const [props, controller] = useFriction<HTMLDivElement>({
    from: { transform: 'translateX(0px) translate(-50%, -50%)' },
    to: { transform: 'translateX(300px) translate(-50%, -50%)' },
    config: {
      mu: number('mu', 0.5),
      mass: number('mass', 300),
      initialVelocity: number('velocity', 10),
    },
    immediate: false,
  });

  return (
    <>
      <button className="button" onClick={controller.start}>
        Run Animation
      </button>
      <div className="mover mover--translate" {...props} />
    </>
  );
};

export const FrictionTransformDelay: React.FC = () => {
  const [props] = useFriction<HTMLDivElement>({
    from: {
      background: '#f25050',
      transform: 'scale(1) rotate(0deg) translate(-50%, -50%)',
    },
    to: {
      background: '#a04ad9',
      transform: 'scale(1.5) rotate(720deg) translate(-50%, -50%)',
    },
    config: {
      mu: number('mu', 0.5),
      mass: number('mass', 300),
      initialVelocity: number('velocity', 10),
    },
    delay: 2000,
  });

  return <div className="mover mover--translate" {...props} />;
};
