import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { defaultProps } from 'prism-react-renderer';
import { Wrapper } from '../../components/wrapper';
import { SectionTitle } from '../../components/section-title';
import { theme } from '../../theme';
import { BodyCopy } from '../../components/body-copy';

const LiveWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  padding: 0 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const column = css`
  flex-basis: 50%;
  width: 50%;
  max-width: 50%;

  @media (max-width: 768px) {
    flex-basis: auto;
    width: 100%;
    max-width: 100%;
  }
`;

const StyledEditor = styled.div`
  background: ${({ theme }) => theme.colors.editorBackground};
  font-family: 'Source Code Pro', monospace;
  font-size: 1.3rem;
  height: 35rem;
  max-height: 35rem;
  overflow: auto;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  ${column};

  * > textarea:focus {
    outline: none;
  }
`;

const StyledPreview = styled(LivePreview)`
  position: relative;
  padding: 0.5rem;
  background: white;
  color: black;
  height: auto;
  overflow: hidden;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  ${column};
`;

const StyledError = styled(LiveError)`
  display: block;
  padding: 8rem;
  background: 'orange';
  color: 'dodgerblue';
  white-space: pre-wrap;
  text-align: left;
  font-size: 0.9em;
  font-family: 'Source Code Pro', monospace;
`;

const Preview = () => (
  <Wrapper background={theme.colors.backgroundGradient}>
    <SectionTitle color={theme.colors.textLight} compact>
      Beautiful, Simple Animations
    </SectionTitle>
    <BodyCopy color={theme.colors.textLight}>
      Renature is all about bringing joy and whimsy to UI animation.
    </BodyCopy>
    <LiveProvider
      code={`<strong>Hey There</strong>`}
      theme={defaultProps.theme}
    >
      <LiveWrapper>
        <StyledEditor>
          <LiveEditor />
        </StyledEditor>
        <StyledPreview />
      </LiveWrapper>

      <StyledError />
    </LiveProvider>
  </Wrapper>
);

export default Preview;
