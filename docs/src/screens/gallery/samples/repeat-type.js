const code = `
function Mover() {
  const [nodes] = useFrictionGroup(2, (i) => ({
    from: {
      transform: 'translateX(-100px)',
    },
    to: {
      transform: 'translateX(100px)',
    },
    config: {
      mu: 0.2,
      mass: 20,
      initialVelocity: 5,
    },
    repeat: Infinity,
    repeatType: i === 0 ? 'mirror' : 'loop'
  }));

  return (
    <div className="lp__stack">
      {nodes.map((props, i) => <div key={i} className="lp__m lp__m--sm" {...props} />)}
    </div>
  );
}
`;

export const repeatType = {
  title: 'Repeat Type',
  slug: 'repeat-type/',
  code,
  demoLink: 'https://codesandbox.io/s/renature-repeat-type-wufv0',
};
