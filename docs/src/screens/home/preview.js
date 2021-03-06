import React from 'react';
import styled from 'styled-components';

import { Wrapper } from '../../components/wrapper';
import { SectionTitle } from '../../components/section-title';
import { SectionStack } from '../../components/section-stack';
import { LivePreview } from '../../components/home-preview';
import { theme } from '../../styles/theme';
import { stack } from '../../styles/mixins';
import { scope, removeImportFromPreview } from '../../utils/live-preview';

const PreviewStack = styled.div`
  ${stack(11.25)}
  margin-left: auto;
  margin-right: auto;
  box-sizing: content-box;
`;

const basic = `
import React from 'react';
import { useFriction } from 'renature';

function FrictionAnimation() {
  const [props] = useFriction({
    from: {
      transform: 'scale(0) rotate(0deg)',
      background: 'magenta',
    },
    to: {
      transform: 'scale(1) rotate(360deg)',
      background: 'coral',
    },
    config: { mu: 0.5, mass: 300, initialVelocity: 10 },
    repeat: Infinity
  });

  return (
    <div
      className="lp__m lp__m--lg"
      {...props}
    />
  );
}
`;

const controlled = `
import React from 'react';
import { useFluidResistance } from 'renature';

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
    }
  });

  return (
    <div className="lp__toggle">
      <Toggle
        onChange={() => setToggle(prevToggle => !prevToggle)}
        checked={toggle}
      />
      <div
        className="lp__m lp__m--lg"
        {...props}
      />
    </div>
  );
};
`;

const twoDimension = `
import React from 'react';
import { useGravity2D } from 'renature';

function Gravity2DAnimation() {
  const [center, setCenter] = React.useState({ top: 0, left: 0 });
  const node = React.useRef(null);

  React.useLayoutEffect(() => {
    if (node.current) {
      const top = node.current.clientHeight / 2;
      const left = node.current.clientWidth / 2;

      setCenter({ top, left });
    }
  }, []);


  const [props] = useGravity2D({
    config: {
      attractorMass: 1000000000000,
      moverMass: 10000,
      attractorPosition: [center.left, center.top],
      initialMoverPosition: [center.left, center.top - 100],
      initialMoverVelocity: [1, 0],
      threshold: {
        min: 20,
        max: 100,
      },
      timeScale: 100,
    },
  });

  return (
    <div className="lp__space" ref={node}>
      <div className="lp__m-2d" {...props} />
      <div
        className="lp__attractor-2d"
        style={center}
      />
    </div>
  );
}
`;

const Preview = () => (
  <Wrapper background="linear-gradient(242deg, #30265f 101%, #5443a6 -11%)">
    <SectionStack>
      <SectionTitle color={theme.colors.textLight}>
        Beautiful, Simple Animations
      </SectionTitle>
      <PreviewStack>
        <LivePreview
          code={basic}
          transformCode={removeImportFromPreview}
          scope={scope}
          tagline={'Animate Intuitively, Animate With Joy'}
          copy={
            'UI animation should be intuitive, simple, and fun. Renature is all about returning joy and whimsy to your UI animations.'
          }
          before
        />
        <LivePreview
          code={controlled}
          transformCode={removeImportFromPreview}
          scope={scope}
          tagline={'Responsive Animations'}
          copy={
            'Renature hooks respond directly to changes in their from, to, and config properties. Just update a value and your animation will begin running.'
          }
        />
        <LivePreview
          code={twoDimension}
          transformCode={removeImportFromPreview}
          scope={scope}
          tagline={'Animate in Two Dimensions'}
          copy={
            'Renature uses two-dimensional vectors to back its physics, giving you the ability to build beautiful and accurate animations in Cartesian space.'
          }
          before
          splitVertical
          even
        />
      </PreviewStack>
    </SectionStack>
  </Wrapper>
);

export default Preview;
