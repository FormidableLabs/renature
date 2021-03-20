const code = `
function Orbit() {
  const config = {
    attractorMass: 1000000000000,
    moverMass: 10000,
    attractorPosition: [0, 0],
    threshold: {
      min: 20,
      max: 100,
    },
    timeScale: 100,
  };

  const [planetOne] = useGravity2D({
    config: {
      ...config,
      initialMoverPosition: [0, -50],
      initialMoverVelocity: [1, 0],
    },
  });

  const [planetTwo] = useGravity2D({
    config: {
      ...config,
      initialMoverPosition: [0, 50],
      initialMoverVelocity: [-1, 0],
    },
  });

  return (
    <div className="lp__center">
      <div
        className="lp__orbital-center lp__orbital-center--sm"
      />
      <div
        className="lp__orbiter lp__orbiter--sm"
        {...planetOne}
      />
      <div
        className="lp__orbiter lp__orbiter--sm"
        {...planetTwo}
      />
    </div>
  );
}
`;

export const orbit = {
  title: 'Orbit',
  slug: 'orbit/',
  code,
  demoLink: 'https://codesandbox.io/s/renature-orbit-7w6z0',
};
