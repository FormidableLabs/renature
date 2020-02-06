import React from 'react';
import styled from 'styled-components';
import { useFriction, useFluidResistance, useGravity2D } from 'renature';

import { Wrapper } from '../../components/wrapper';
import { SectionTitle } from '../../components/section-title';
import { LivePreview } from '../../components/live-preview';
import { Toggle } from '../../components/toggle';
import { theme } from '../../themes/theme';

const PreviewStack = styled.div`
  --space: calc(2.25 * 5rem);
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  box-sizing: content-box;

  > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  > * + * {
    margin-top: var(--space);
  }
`;

const scope = { useFriction, useFluidResistance, Toggle, useGravity2D };
const codeSampleOne = `
function FrictionAnimation() {
  const [props] = useFriction({
    from: {
      transform: 'translateX(-200px)'
    },
    to: {
      transform: 'translateX(200px)'
    },
    config: { mu: 0.5, mass: 300, initialVelocity: 10 },
    infinite: true
  });

  return <div className="mover" {...props} />;
}
`;

const codeSampleTwo = `
function FluidResistanceAnimation() {
  const [toggle, setToggle] = React.useState(true);

  const [props] = useFluidResistance({
    from: {
      opacity: toggle ? 0 : 1,
      transform: toggle
        ? 'scale(0) rotate(0deg)'
        : 'scale(1) rotate(180deg)',
    },
    to: {
      opacity: toggle ? 1 : 0,
      transform: toggle
        ? 'scale(1) rotate(180deg)'
        : 'scale(0) rotate(0deg)',
    },
    config: {
      mass: 25,
      rho: 10,
      area: 20,
      cDrag: 0.25,
      settle: true,
    },
  });

  return (
    <div className="toggle">
      <Toggle
        onChange={() => setToggle(prevToggle => !prevToggle)}
        checked={toggle}
      />
      <div className="mover" {...props} />
    </div>
  );
};
`;

const codeSampleThree = `
function Gravity2DAnimation() {
  const [props] = useGravity2D({
    config: {
      attractorMass: 1000000000000,
      moverMass: 10000,
      attractorPosition: [250, 150],
      initialMoverPosition: [250, 50],
      initialMoverVelocity: [1, 0],
      threshold: {
        min: 20,
        max: 100,
      },
      timeScale: 100,
    },
  });

  return (
    <div className="space">
      <div className="mover-2d" {...props} />
      <div
        className="attractor-2d"
        style={{ left: 250, top: 150 }}
      />
    </div>
  );
}
`;

const Preview = () => (
  <Wrapper background={theme.colors.backgroundGradient}>
    <SectionTitle color={theme.colors.textLight} compact>
      Beautiful, Simple Animations
    </SectionTitle>
    {typeof window !== 'undefined' ? (
      <PreviewStack>
        <LivePreview
          code={codeSampleOne}
          scope={scope}
          tagline={'Animate Intuitively, Animate With Joy'}
          copy={
            'UI animation should be intuitive, simple, and fun. Renature is all about returning joy and whimsy to your UI animations.'
          }
          before
        />
        <LivePreview
          code={codeSampleTwo}
          scope={scope}
          tagline={'Responsive Animations'}
          copy={
            'Renature hooks respond directly to changes in their from, to, and config properties. Just update a value and your animation will begin running.'
          }
        />
        <LivePreview
          code={codeSampleThree}
          scope={scope}
          tagline={'Animate in Two Dimensions'}
          copy={
            'Renature uses two-dimensional vectors to back its physics, giving you the ability to build beautiful and accurate animations in Cartesian space.'
          }
          before
          splitVertical
        />
      </PreviewStack>
    ) : null}
  </Wrapper>
);

export default Preview;
