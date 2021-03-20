const code = `
function FrictionGroup() {
  const [nodes] = useFrictionGroup(4, i => ({
    from: {
      transform: 'translateX(0px)',
      fill: '#FFCE24',
    },
    to: {
      transform: 'translateX(20px)',
      fill: '#FA24FF',
    },
    config: {
      mu: 0.5,
      mass: 200,
      initialVelocity: 5,
    },
    delay: i * 500,
    repeat: Infinity,
  }));

  return (
    <svg width="220" height="100" viewBox="0 0 220 100">
      {nodes.map((props, i) => {
        const xOffset = i * 50;
        const points =
          xOffset.toString() +
          ",20 " +
          (xOffset + 50).toString() +
          ",50 " +
          xOffset.toString() +
          ",80";

        return (
          <polygon points={points} fill="#FFCE24" key={i} {...props} />
        );
      })}
    </svg>
  );
}
`;

export const groupedAnimations = {
  title: 'Grouped Animations',
  slug: 'grouped-animations/',
  code,
  demoLink: 'https://codesandbox.io/s/renature-grouped-animations-drimw',
};
