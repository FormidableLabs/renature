import React from 'react';
import styled from 'styled-components';

import Hero from '../screens/home/hero';
import heroBackground from '../assets/background_renature.svg';
import headerTriangle from '../assets/header_triangle.svg';
import logoFormidableWhite from '../assets/logos/logo_formidable_white.svg';

const Container = styled.header`
  background-image: url(${heroBackground});
  background-size: cover;
  color: ${(p) => p.theme.colors.textLight};
  padding-bottom: 8rem;
`;

const Triangle = styled.img`
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  width: 14rem;

  @media ${(p) => p.theme.media.sm} {
    width: 22rem;
  }

  @media ${(p) => p.theme.media.md} {
    width: 28rem;
  }
`;

const HeaderContainer = styled.a`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 2rem;
  top: 1.5rem;
  font-size: 0.8rem;
  color: ${(p) => p.theme.colors.textLight};
  text-decoration: none;

  @media ${(p) => p.theme.media.sm} {
    left: 3.5rem;
    top: 2rem;
    font-size: 1.2rem;
  }

  @media ${(p) => p.theme.media.md} {
    left: 4rem;
    top: 3rem;
  }
`;

const HeaderText = styled.p`
  text-transform: uppercase;
  margin: 0;
  line-height: 1.5;
  letter-spacing: 0.086rem;
  max-width: 10rem;
`;

const HeaderLogo = styled.img`
  width: 4rem;
  margin-top: 1rem;

  @media ${(p) => p.theme.media.sm} {
    width: 6rem;
  }

  @media ${(p) => p.theme.media.md} {
    width: 8rem;
  }
`;

export const Header = () => (
  <Container>
    <Triangle src={headerTriangle} />
    <HeaderContainer
      href="https://formidable.com"
      title="Formidable"
      target="_blank"
      rel="noopener noreferrer"
    >
      <HeaderText>Another oss project by</HeaderText>
      <HeaderLogo src={logoFormidableWhite} alt="Formidable Logo" />
    </HeaderContainer>
    <Hero />
  </Container>
);
