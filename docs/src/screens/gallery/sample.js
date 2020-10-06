import React from 'react';
import { useRouteData, useBasepath } from 'react-static';
import styled, { keyframes } from 'styled-components';
import { LiveProvider, LivePreview, LiveEditor } from 'react-live';
import { Link } from 'react-router-dom';
import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight';

import Header from '../docs/header';
import { removeImportFromPreview, scope } from '../../utils/live-preview';
import ArrowBack from '../../assets/arrow_left.svg';
import { center } from '../../styles/mixins';

const Container = styled.div`
  ${center};

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - ${(p) => p.theme.layout.header});
  margin-top: ${(p) => p.theme.layout.header};
  padding: 6rem 4rem 4rem 4rem;
  background: ${(p) => p.theme.colors.textLight};
  overflow: hidden;
`;

const StyledSampleTitle = styled.h1`
  color: ${(p) => p.theme.colors.accent};
  font-family: ${(p) => p.theme.fonts.code};
  font-size: ${(p) => p.theme.fontSizes.h3};

  @media ${(p) => p.theme.media.md} {
    font-size: ${(p) => p.theme.fontSizes.h1};
  }
`;

const StyledProvider = styled(LiveProvider)`
  display: flex;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  border-radius: 1rem;
  box-shadow: 1px 1px 20px rgba(20, 20, 20, 0.27);
  font-family: ${(p) => p.theme.fonts.code};
  overflow: auto;
  width: 80%;

  > * {
    flex: 0 0 50%;
  }

  @media ${(p) => p.theme.media.md} {
    flex-direction: row;
  }
`;

const StyledPreview = styled(LivePreview)`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const StyledEditor = styled(LiveEditor)`
  overflow: auto !important;
`;

const Wiggle = keyframes`
  0% {
    transform: translateX(0rem);
  }

  50% {
    transform: translateX(-0.5rem);
  }

  100% {
    transform: translateX(0rem);
  }
`;

const StyledBack = styled(Link)`
  display: flex;
  align-items: center;
  position: absolute;
  top: 1.5rem;
  left: 4rem;
  color: ${(p) => p.theme.colors.accent};

  &::before {
    content: '';
    height: 1.6rem;
    width: 1.6rem;
    background-image: url(${ArrowBack});
    margin-right: 0.5rem;
  }

  &:hover {
    &::before {
      animation: 0.75s ease-in-out infinite ${Wiggle};
    }
  }
`;

const Sample = () => {
  const { title, code } = useRouteData();
  const basepath = useBasepath() || '';
  const homepage = basepath ? `/${basepath}/` : '/';

  return (
    <>
      <Header />
      <Container>
        <StyledBack to={`${homepage}gallery/`}>Back to Gallery</StyledBack>
        <StyledSampleTitle>{title}</StyledSampleTitle>
        <StyledProvider
          code={code}
          scope={scope}
          transformCode={removeImportFromPreview}
          theme={nightOwlLight}
        >
          <StyledContainer>
            <StyledEditor />
            <StyledPreview />
          </StyledContainer>
        </StyledProvider>
      </Container>
    </>
  );
};

export default Sample;
