const code = (context) => `
import React from 'react';
import { useFriction } from 'renature';

function ControllerSet() {
  const [props, controller] = useFriction({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      mu: 0.5,
      mass: 300,
      initialVelocity: 10,
    },
  });

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      controller.set({
        transform: "rotate(" + Math.random() * 360 + "deg)" +
        " scale(" + Math.random() * 2 + ")",
        opacity: Math.random(),
      });
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [controller]);

  return (
    <div
      className="lp__m ${
        context === 'gallery-preview' ? 'lp__m--sm' : 'lp__m--lg'
      }"
      {...props}
    />
  );
}
`;

export const set = (context) => ({
  code: code(context),
  title: 'controller.set',
  slug: 'controller-set/',
  demoLink: 'https://codesandbox.io/s/renature-controllerset-6dyj1',
});
