import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview as ReactLivePreview,
} from 'react-live';

import { BodyCopy } from './body-copy';
import { theme } from '../themes/theme';
import { NightOwl } from '../themes/night-owl';

const StyledEditorWithTagline = styled.div`
  display: flex;
  flex-direction: column;

  @media ${p => p.theme.media.sm} {
    flex-direction: ${p => (p.before ? 'row' : 'row-reverse')};
  }
`;

const StyledTagline = styled.aside`
  flex-basis: 20%;
  padding: 2rem 5rem;

  @media ${p => p.theme.media.sm} {
    padding: 0 5rem;
  }

  h3 {
    color: ${({ theme }) => theme.colors.buttonLightHover};
    text-align: left;
  }

  ${BodyCopy} {
    align-self: center;
    text-align: left;
  }
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${p => p.theme.fonts.code};
  width: 100%;
  border-radius: 1rem;
  box-shadow: 1px 1px 20px rgba(20, 20, 20, 0.27);
  overflow: hidden;

  @media ${p => p.theme.media.md} {
    flex-direction: ${({ splitVertical }) =>
      splitVertical ? 'row' : 'column'};
  }

  > * {
    flex: ${p => (p.even ? '0 0 50%' : '0 1 auto')};
  }
`;

export const StyledEditor = styled(LiveEditor)`
  font-size: 1.6rem;
  min-height: 25rem;
  overflow: auto !important;
  max-height: 35rem;

  @media ${p => p.theme.media.md} {
  }

  * > textarea:focus {
    outline: none;
  }

  .token.operator {
    background: transparent;
  }
`;

export const StyledPreview = styled(({ splitVertical, ...rest }) => (
  <ReactLivePreview {...rest} />
))`
  --color-near-black: #011826;
  --color-deep-blue: #053959;
  --color-yellow: #f2cf63;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${p => p.theme.colors.textLight};
  min-height: 25rem;
  overflow: hidden;
  flex-grow: ${({ splitVertical }) => (splitVertical ? 1 : 0)};

  .mover {
    height: 100px;
    width: 100px;
    border-radius: 10px;
    background: ${p => p.theme.colors.accent};
  }

  .toggle {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
  }

  .space {
    height: 100%;
    width: 100%;
    background: linear-gradient(
      var(--color-near-black),
      var(--color-deep-blue)
    );
    flex: 1;
  }

  .mover-2d {
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background: ${p => p.theme.colors.textLight};
    box-shadow: 0 0 8px 4px ${p => p.theme.colors.textLight},
      0 0 16px 8px ${p => p.theme.colors.accent};
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

  .stack {
    display: flex;
    flex-direction: column;
    align-items: center;

    > * {
      margin-top: 0;
      margin-bottom: 0;
    }

    > * + * {
      margin-top: 2rem;
    }
  }

  button {
    display: inline-block;
    border: none;
    padding: 1rem 2rem;
    margin: 0;
    text-decoration: none;
    cursor: pointer;
  }

  .button {
    background: var(--color-near-black);
    color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 10px 30px 5px rgba(0, 0, 0, 0.2);
    font-size: 1em;
    font-weight: 700;
    border-radius: 5px;
    transition: transform 0.2s ease;
  }

  .button:hover {
    transform: scale(1.1);
  }
`;

export const StyledError = styled(LiveError)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  margin: 0;
  background: ${p => p.theme.colors.accent};
  color: ${p => p.theme.colors.textLight};
  white-space: pre-wrap;
  text-align: left;
  font-size: 0.9em;
`;

export const LivePreview = ({
  code,
  scope,
  tagline,
  copy,
  before = false,
  splitVertical = false,
  even = false,
}) => {
  const taglineElement = React.useMemo(
    () => (
      <StyledTagline>
        <h3>{tagline}</h3>
        <BodyCopy color={theme.colors.textLight}>{copy}</BodyCopy>
      </StyledTagline>
    ),
    [tagline, copy]
  );

  return (
    <StyledEditorWithTagline before={before}>
      {taglineElement}
      <LiveProvider code={code} scope={scope} theme={NightOwl}>
        <StyledContainer splitVertical={splitVertical} even={even}>
          <StyledPreview splitVertical={splitVertical} />
          <StyledError />
          <StyledEditor />
        </StyledContainer>
      </LiveProvider>
    </StyledEditorWithTagline>
  );
};

LivePreview.propTypes = {
  code: PropTypes.string.isRequired,
  scope: PropTypes.object.isRequired,
  tagline: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  before: PropTypes.bool,
  splitVertical: PropTypes.bool,
  even: PropTypes.bool,
};
