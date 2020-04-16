import React from 'react';
import { useRouteData } from 'react-static';
import styled from 'styled-components';
import { LiveProvider, LivePreview, LiveEditor } from 'react-live';
import { Link } from 'react-router-dom';
import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight';

import Header from '../docs/header';
import { removeImportFromPreview, scope } from '../../utils/live-preview';
import ArrowBack from '../../assets/arrow_left.svg';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - 4.8rem);
  max-width: 144rem;
  margin: 0 auto;
  margin-top: 4.8rem;
  padding: 6rem 4rem 4rem 4rem;
  background: ${p => p.theme.colors.textLight};
  overflow: hidden;
`;

const StyledSampleTitle = styled.h1`
  color: ${p => p.theme.colors.accent};
  font-family: ${p => p.theme.fonts.code};
  font-size: ${p => p.theme.fontSizes.h3};

  @media ${p => p.theme.media.md} {
    font-size: ${p => p.theme.fontSizes.h1};
  }
`;

const StyledProvider = styled(LiveProvider)`
  display: flex;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  box-shadow: 1px 1px 20px rgba(20, 20, 20, 0.27);
  font-family: ${p => p.theme.fonts.code};
  overflow: auto;

  > * {
    flex: 0 0 50%;
  }
`;

const StyledPreview = styled(LivePreview)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledEditor = styled(LiveEditor)`
  overflow: auto !important;
`;

const StyledBack = styled(Link)`
  display: flex;
  position: absolute;
  top: 1.5rem;
  left: 4rem;
  color: ${p => p.theme.colors.accent};

  &::before {
    content: '';
    height: 1.6rem;
    width: 1.6rem;
    background-image: url(${ArrowBack});
    margin-right: 0.5rem;
  }
`;

const Sample = () => {
  const { title, code } = useRouteData();

  return (
    <>
      <Header />
      <Container>
        <StyledSampleTitle>{title}</StyledSampleTitle>
        <StyledProvider
          code={code}
          scope={scope}
          transformCode={removeImportFromPreview}
          theme={nightOwlLight}
        >
          <StyledContainer>
            <StyledPreview />
            <StyledEditor />
          </StyledContainer>
        </StyledProvider>
        <StyledBack to="/gallery">Back to Gallery</StyledBack>
      </Container>
    </>
  );
};

export default Sample;
