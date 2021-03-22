const code = `
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

  return <div className="lp__m lp__m--sm" {...props} />;
}
`;

export const set = {
  title: 'controller.set',
  slug: 'controller-set/',
  code,
  demoLink: 'https://codesandbox.io/s/renature-controllerset-6dyj1',
};
