const code = `
function Mover() {
  const [props] = useFriction({
    from: {
      transform: 'scale(0) rotate(0deg)',
      background: 'orange',
      borderRadius: '0%',
    },
    to: {
      transform: 'scale(2) rotate(360deg)',
      background: 'steelblue',
      borderRadius: '50%',
    },
    config: {
      mu: 0.2,
      mass: 20,
      initialVelocity: 5,
    },
    repeat: Infinity,
  });

  return <div className="lp__m lp__m--sm" {...props} />;
}
`;

export const multipleProperties = {
  title: 'Multiple CSS Properties',
  slug: 'multiple-css-properties/',
  code,
  demoLink: 'https://codesandbox.io/s/renature-multiple-css-properties-h3oep',
};
