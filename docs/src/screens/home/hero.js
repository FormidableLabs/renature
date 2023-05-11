import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FeaturedBadge } from 'formidable-oss-badges';

import { Wrapper } from '../../components/wrapper';
import { center, stack, stackHorizontal, underline } from '../../styles/mixins';

import NpmCopy from './npm-copy';

const HeroContent = styled.div`
  ${center};
  ${stack(2)};

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  width: 100%;

  @media ${(p) => p.theme.media.sm} {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 2rem;
    margin-top: 20rem;

    > * + * {
      margin-top: 0;
    }
  }
`;

const HeroBadge = styled.div`
  width: 20rem;

  @media ${(p) => p.theme.media.sm} {
    width: 25rem;
    grid-column: 1 / span 5;
    justify-self: center;
  }

  @media ${(p) => p.theme.media.md} {
    width: 30rem;
    grid-row: 1 / span 2;
  }
`;

const HeroBodyAndButtons = styled.div`
  ${stack(2)};
  max-width: 30rem;

  @media ${(p) => p.theme.media.sm} {
    grid-column: 6 / span 7;
    max-width: 52rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  letter-spacing: 0.75rem;
  text-align: center;
  text-transform: uppercase;

  @media ${(p) => p.theme.media.sm} {
    font-size: 6rem;
    text-align: left;
  }

  @media ${(p) => p.theme.media.md} {
    font-size: 8rem;
  }
`;

const HeroBody = styled.p`
  font-family: ${(p) => p.theme.fonts.body};
  letter-spacing: 0.16rem;
  font-size: 1.4rem;
  line-height: 2.2rem;
  text-align: center;

  @media ${(p) => p.theme.media.sm} {
    font-size: 2rem;
    line-height: 2.8rem;
    text-align: left;
  }
`;

const DocumentationButton = styled(Link)`
  flex-basis: 35%;
  height: 4rem;
  font-size: 1.4rem;
  background: ${(p) => p.theme.colors.textLight};
  transition: background 0.35s ease-out;
  line-height: 4rem;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.1rem;
  color: ${({ theme }) => theme.colors.button};
  border: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.buttonLightHover};
  }
`;

const HeroNavList = styled.ul`
  ${stackHorizontal(2)};

  border-top: ${({ theme }) => `0.2rem solid ${theme.colors.textLight}`};
  display: flex;
  justify-content: center;
  width: 30rem;
  list-style: none;
  padding: 2rem 0 0;
  font-size: 1.4rem;
  text-align: center;

  @media ${(p) => p.theme.media.sm} {
    grid-column: 1 / span 12;
    grid-row: 2 / span 1;
    margin-top: 2rem;
    width: 100%;
    font-size: 1.8rem;
  }

  @media ${(p) => p.theme.media.md} {
    grid-column: 6 / span 7;
    margin-top: 0;
    max-width: 52rem;
  }

  & li a {
    ${underline({ light: true })};

    color: ${(p) => p.theme.colors.textLight};
    letter-spacing: 0.1rem;
    transition: color 0.3s ease-out;
    text-transform: uppercase;

    &:hover {
      color: ${({ theme }) => theme.colors.buttonLightHover};
    }
  }
`;

const HeroButtonsContainer = styled.div`
  ${stack(2)};
  justify-content: space-between;

  @media ${(p) => p.theme.media.md} {
    ${stackHorizontal(2)};
    align-items: center;

    > * + * {
      margin-top: 0;
    }
  }
`;

const Hero = () => {
  return (
    <Wrapper background="transparent" noPadding style={{ padding: '0 4rem' }}>
      <HeroContent>
        <HeroBadge>
          <FeaturedBadge name="renature" />
        </HeroBadge>
        <HeroBodyAndButtons>
          <HeroTitle>Renature</HeroTitle>
          <HeroBody>
            A physics-based animation library for React inspired by the natural
            world.
          </HeroBody>
          <HeroButtonsContainer>
            <NpmCopy text="npm install renature" />
            <DocumentationButton to="docs/">Documentation</DocumentationButton>
          </HeroButtonsContainer>
        </HeroBodyAndButtons>
        <HeroNavList>
          <li>
            <Link to="./docs/">Docs</Link>
          </li>
          <li>
            <Link to="./gallery/">Gallery</Link>
          </li>
          <li>
            <a
              title="Issues"
              href="https://www.github.com/FormidableLabs/renature/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Issues
            </a>
          </li>
          <li>
            <a
              title="GitHub"
              href="https://github.com/FormidableLabs/renature"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
        </HeroNavList>
      </HeroContent>
    </Wrapper>
  );
};

export default Hero;
