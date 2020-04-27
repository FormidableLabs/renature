import React from 'react';
import styled from 'styled-components';

import Header from '../docs/header';
import GalleryPreview from './gallery-preview';
import { samples } from './samples';
import { center, stack, stackHorizontal } from '../../styles/mixins';
import { Link } from 'react-router-dom';

const Container = styled.div`
  ${center};

  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: ${p => p.theme.layout.header};
  background: ${p => p.theme.colors.textLight};
`;

const GalleryHeader = styled.div`
  ${stack(1.5)};

  padding: 1.5rem 0;
  background-position: 0 0;
  background-size: 0.5rem 0.5rem;
  background-image: radial-gradient(
    ${p => p.theme.colors.accent} 25%,
    transparent 25%
  );
  font-family: ${p => p.theme.fonts.code};
`;

const GalleryTitle = styled.h1`
  font-size: ${p => p.theme.fontSizes.h2};
  color: ${p => p.theme.colors.accent};
  margin-left: auto;
  margin-right: auto;
  background: ${p => p.theme.colors.textLight};
  padding: 1rem;

  @media ${p => p.theme.media.md} {
    font-size: ${p => p.theme.fontSizes.h2};
  }
`;

const GallreyNav = styled.ul`
  ${stackHorizontal(2)};

  list-style: none;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  background: ${p => p.theme.colors.textLight};
  padding: 1rem;

  & li a {
    position: relative;
    text-decoration: none;

    &::before {
      background-color: ${p => p.theme.colors.accent};
      bottom: 0;
      content: '';
      height: 0.2rem;
      left: 0;
      position: absolute;
      transition: color, width 0.3s ease-in-out;
      width: 0;
    }

    &:hover {
      color: ${p => p.theme.colors.accent};

      &::before {
        width: 100%;
      }
    }
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${p => p.theme.spacing.sm};
  padding: ${p => p.theme.spacing.sm};

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
        <GallreyNav>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/docs">Docs</Link>
          </li>
        </GallreyNav>
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
