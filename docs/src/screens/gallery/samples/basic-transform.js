const code = `
function BasicTransform() {
  const [props] = useGravity({
    from: { transform: 'translateX(-100px)' },
    to: { transform: 'translateX(100px)' },
    config: {
      moverMass: 10000,
      attractorMass: 1000000000000,
      r: 10,
    },
    repeat: Infinity
  });

  return <div className="lp__m lp__m--sm" {...props} />;
}
`;

export const basicTransform = {
  title: 'Basic Transform',
  slug: 'basic-transform/',
  code,
  demoLink: 'https://codesandbox.io/s/renature-basic-transform-21u2w',
};
