import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview as ReactLivePreview,
} from 'react-live';
import nightOwl from 'prism-react-renderer/themes/nightOwl';

import { theme } from '../styles/theme';
import { center } from '../styles/mixins';

import { BodyCopy } from './body-copy';

const StyledEditorWithTagline = styled.div`
  ${center};

  display: flex;
  flex-direction: column;

  @media ${(p) => p.theme.media.sm} {
    flex-direction: ${(p) => (p.before ? 'row' : 'row-reverse')};
  }
`;

const StyledTagline = styled.aside`
  flex-basis: 20%;
  padding: 2rem 5rem;

  @media ${(p) => p.theme.media.sm} {
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
  font-family: ${(p) => p.theme.fonts.code};
  width: 100%;
  border-radius: 1rem;
  box-shadow: 1px 1px 20px rgba(20, 20, 20, 0.27);
  overflow: hidden;

  @media ${(p) => p.theme.media.md} {
    flex-direction: ${({ splitVertical }) =>
      splitVertical ? 'row' : 'column'};
  }

  > * {
    flex: ${(p) => (p.even ? '0 0 50%' : '0 1 auto')};
  }
`;

export const StyledEditor = styled(LiveEditor)`
  font-size: 1.6rem;
  overflow: auto !important;

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(p) => p.theme.colors.textLight};
  min-height: 25rem;
  overflow: hidden;
  flex-grow: ${({ splitVertical }) => (splitVertical ? 1 : 0)};
`;

export const StyledError = styled(LiveError)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  margin: 0;
  background: ${(p) => p.theme.colors.accent};
  color: ${(p) => p.theme.colors.textLight};
  white-space: pre-wrap;
  text-align: left;
  font-size: 0.9em;
`;

export const LivePreview = ({
  code,
  scope,
  transformCode,
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
      <LiveProvider
        code={code}
        scope={scope}
        transformCode={transformCode}
        theme={nightOwl}
      >
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
  transformCode: PropTypes.func.isRequired,
  tagline: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  before: PropTypes.bool,
  splitVertical: PropTypes.bool,
  even: PropTypes.bool,
};
