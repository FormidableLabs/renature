import React from 'react';
import styled from 'styled-components';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview as ReactLivePreview,
} from 'react-live';

import { BodyCopy } from './body-copy';
import { theme } from '../theme';
import { prismTheme } from '../prism-theme';

const StyledEditorWithTagline = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledTagline = styled.aside`
  flex-basis: 20%;
  padding: 0 5rem;

  @media (max-width: 768px) {
    padding: 2rem 5rem;
  }

  h2 {
    color: ${({ theme }) => theme.colors.linkLightHover};
    text-align: left;
  }

  ${BodyCopy} {
    align-self: center;
    text-align: left;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: ${({ splitVertical }) => (splitVertical ? 'row' : 'column')};
  width: 100%;
  border-radius: 1rem;
  box-shadow: 1px 1px 20px rgba(20, 20, 20, 0.27);
  overflow: hidden;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const StyledEditor = styled(LiveEditor)`
  font-family: 'Source Code Pro', monospace;
  font-size: 1.4rem;
  min-height: 25rem;
  max-height: 35rem;
  overflow: auto !important;

  @media (max-width: 1024px) {
    max-height: none;
  }

  * > textarea:focus {
    outline: none;
  }

  .token.operator {
    background: transparent;
  }
`;

const StyledPreview = styled(ReactLivePreview)`
  --color-near-black: #011826;
  --color-deep-blue: #053959;
  --color-yellow: #f2cf63;

  position: relative;
  background: ${({ theme }) => theme.colors.textLight};
  min-height: 25rem;
  overflow: hidden;
  flex-grow: ${({ splitVertical }) => (splitVertical ? 1 : 0)};

  .mover {
    height: 100px;
    width: 100px;
    border-radius: 10px;

    background: ${({ theme }) => theme.colors.primary};

    &--one {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transform-origin: top left;
    }
  }

  .toggle {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;
  }

  .space {
    height: 100%;
    width: 100%;
    background: linear-gradient(
      var(--color-near-black),
      var(--color-deep-blue)
    );
  }

  .mover-2d {
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.textLight};
    box-shadow: 0 0 8px 4px ${({ theme }) => theme.colors.textLight},
      0 0 16px 8px ${({ theme }) => theme.colors.primary};
  }

  .attractor-2d {
    position: relative;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background: var(--color-yellow);
    transform: translate(-50%, -50%);
    box-shadow: 0 0 30px 15px var(--color-yellow);
  }
`;

const StyledError = styled(LiveError)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  margin: 0;
  background: red;
  color: white;
  white-space: pre-wrap;
  text-align: left;
  font-size: 0.9em;
  font-family: 'Source Code Pro', monospace;
`;

export const LivePreview = ({
  code,
  scope,
  tagline,
  copy,
  before,
  splitVertical = false,
}) => {
  const taglineElement = React.useMemo(
    () => (
      <StyledTagline>
        <h2>{tagline}</h2>
        <BodyCopy color={theme.colors.textLight}>{copy}</BodyCopy>
      </StyledTagline>
    ),
    [tagline, copy]
  );

  return (
    <StyledEditorWithTagline>
      {before && taglineElement}
      <LiveProvider code={code} scope={scope} theme={prismTheme}>
        <StyledContainer splitVertical={splitVertical}>
          <StyledPreview splitVertical={splitVertical} />
          <StyledError />
          <StyledEditor splitVertical={splitVertical} />
        </StyledContainer>
      </LiveProvider>
      {!before && taglineElement}
    </StyledEditorWithTagline>
  );
};
