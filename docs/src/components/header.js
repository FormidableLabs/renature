import React from 'react';
import styled from 'styled-components';

import Hero from '../screens/home/hero';
import bgImg from '../static/pngs/background_renature@2x.png';
import headerTriangle from '../static/svgs/header-triangle.svg';
import logoFormidableWhite from '../static/svgs/logo_formidable_white.png';

const Container = styled.header`
  background-image: url(${bgImg});
  background-size: cover;
  color: ${p => p.theme.colors.textLight};
  padding-bottom: 8rem;
`;

const Triangle = styled.img`
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  width: 14rem;

  @media ${p => p.theme.media.sm} {
    width: 22rem;
  }

  @media ${p => p.theme.media.md} {
    width: 28rem;
  }
`;

const HeaderContainer = styled.a`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 1.8rem;
  top: 1.3rem;
  font-size: 0.8rem;
  color: ${p => p.theme.colors.textLight};

  @media ${p => p.theme.media.sm} {
    left: 3.3rem;
    top: 1.7rem;
    font-size: 1.2rem;
  }

  @media ${p => p.theme.media.md} {
    left: 5.3rem;
    top: 3.7rem;
  }

  > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  > * + * {
    margin-top: 1rem;
  }
`;

const HeaderText = styled.p`
  text-transform: uppercase;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: 1.5;
  letter-spacing: 0.86px;
  max-width: 10rem;
`;

const HeaderLogo = styled.img`
  width: 3.3rem;

  @media ${p => p.theme.media.sm} {
    width: 4.8rem;
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
