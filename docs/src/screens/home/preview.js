import React from 'react';
import styled, { css } from 'styled-components';
import * as renature from 'renature';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

import { Wrapper } from '../../components/wrapper';
import { SectionTitle } from '../../components/section-title';
import { theme } from '../../theme';
import { BodyCopy } from '../../components/body-copy';
import { prismTheme } from './prism-theme';

const StyledProvider = styled(LiveProvider)`
  border-radius: 0.5rem;
  box-shadow: 1px 1px 20px rgba(20, 20, 20, 0.27);
  overflow: hidden;
  margin-bottom: 1rem;
`;

const column = css`
  flex-basis: 50%;
  width: 50%;
  max-width: 50%;
  @media (max-width: 600px) {
    flex-basis: auto;
    width: 100%;
    max-width: 100%;
  }
`;

const StyledEditor = styled(LiveEditor)`
  margin-top: 4rem;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  font-family: 'Source Code Pro', monospace;
  font-size: 1.4rem;
  height: 35rem;
  max-height: 35rem;
  overflow: auto;
  ${column};

  * > textarea:focus {
    outline: none;
  }
`;

const StyledPreview = styled(LivePreview)`
  margin-top: 4rem;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  position: relative;
  padding: 0.5rem;
  background: white;
  color: black;
  height: auto;
  overflow: hidden;
  ${column};

  .mover {
    position: relative;
    top: 50%;
    left: 50%;
    height: 100px;
    width: 100px;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    transform-origin: top left;

    &--opacity {
      background: #a04ad9;
    }
  }
`;

const StyledError = styled(LiveError)`
  display: block;
  padding: 8rem;
  background: red;
  color: white;
  white-space: pre-wrap;
  text-align: left;
  font-size: 0.9em;
  font-family: 'Source Code Pro', monospace;
`;

const scope = { renature };
const code = `
function FrictionAnimation() {
  const [props] = renature.useFriction({
    from: {
      transform: 'translateX(-100px) translate(-50%, -50%)'
    },
    to: {
      transform: 'translateX(100px) translate(-50%, -50%)'
    },
    config: {
      mu: 0.5,
      mass: 300,
      initialVelocity: 10
    },
    infinite: true
  });

  return <div className="mover mover--opacity" {...props} />;
}
`;

const Preview = () => (
  <Wrapper background={theme.colors.backgroundGradient}>
    <SectionTitle color={theme.colors.textLight} compact>
      Beautiful, Simple Animations
    </SectionTitle>
    <BodyCopy color={theme.colors.textLight}>
      Renature is all about bringing joy and whimsy to UI animation.
    </BodyCopy>
    <StyledProvider code={code} scope={scope} theme={prismTheme}>
      <StyledEditor />
      <StyledError />
      <StyledPreview />
    </StyledProvider>
  </Wrapper>
);

export default Preview;
