const code = `
function ControlledMover() {
  const [props, controller] = useFriction({
    from: {
      transform: 'scale(1) skew(0deg, 0deg)',
    },
    to: {
      transform: 'scale(0) skew(90deg, 90deg)',
    },
    config: {
      mu: 0.1,
      mass: 50,
      initialVelocity: 1,
    },
    pause: true,
  });

  return (
    <div className="lp__stack">
      <button
        className="lp__button lp__button--sm"
        onClick={controller.start}
      >
        Run The Animation!
      </button>
      <div className="lp__m lp__m--sm" {...props} />
    </div>
  );
}
`;

export const controlledAnimations = {
  title: 'Controlled Animations',
  slug: 'controlled-animations/',
  code,
  demoLink: 'https://codesandbox.io/s/renature-controlled-animations-4rwe3',
};
