import React from 'react';
import styled from 'styled-components';

import Header from '../docs/header';
import GalleryPreview from './gallery-preview';
import { samples } from './samples';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 144rem;
  margin: 0 auto;
  margin-top: 4.8rem;
  background: ${p => p.theme.colors.textLight};
`;

const GalleryHeader = styled.div`
  display: flex;
  background-position: 0 0;
  background-size: 0.5rem 0.5rem;
  background-image: radial-gradient(
    ${p => p.theme.colors.accent} 25%,
    transparent 25%
  );
`;

const GalleryTitle = styled.h1`
  font-size: ${p => p.theme.fontSizes.h2};
  color: ${p => p.theme.colors.accent};
  font-family: ${p => p.theme.fonts.code};
  margin: 1.5rem auto;
  background: ${p => p.theme.colors.textLight};
  padding: 1rem;

  @media ${p => p.theme.media.md} {
    font-size: ${p => p.theme.fontSizes.h2};
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${p => p.theme.spacing.sm};
  padding: ${p => p.theme.spacing.sm};
  width: 100%;

  @media ${p => p.theme.media.sm} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${p => p.theme.spacing.md};
    padding: ${p => p.theme.spacing.md};
  }

  @media ${p => p.theme.media.md} {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${p => p.theme.spacing.lg};
    padding: ${p => p.theme.spacing.lg};
  }
`;

const Gallery = () => (
  <>
    <Header />
    <Container>
      <GalleryHeader>
        <GalleryTitle>renature Gallery</GalleryTitle>
      </GalleryHeader>
      <GalleryGrid>
        {samples('gallery-preview').map(({ title, code, slug }) => (
          <GalleryPreview key={title} title={title} code={code} slug={slug} />
        ))}
      </GalleryGrid>
    </Container>
  </>
);

export default Gallery;
