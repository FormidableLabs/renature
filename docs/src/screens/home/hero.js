import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import NpmCopy from './npm-copy';
import { Wrapper } from '../../components/wrapper';
import badge from '../../static/pngs/badge_renature@2x.png';

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  width: 100%;

  > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  > * + * {
    margin-top: 2rem;
  }

  @media (min-width: ${({ theme }) => theme.bps.tabletAndAbove}) {
    display: grid;
    grid-template-areas:
      'a . b'
      'a . b'
      'a . b'
      'a . c'
      'd d d';
    margin: 20rem 2rem 0;

    > * + * {
      margin-top: 0;
    }
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  letter-spacing: 0.25rem;
  text-align: center;
  text-transform: uppercase;

  @media (min-width: ${({ theme }) => theme.bps.tabletAndAbove}) {
    font-size: 6.5rem;
    text-align: left;
  }

  @media (min-width: ${({ theme }) => theme.bps.desktopAndAbove}) {
    font-size: 9rem;
  }
`;

const HeroBody = styled.p`
  font-family: Helvetica;
  letter-spacing: 0.16rem;
  font-size: 1.4rem;
  line-height: 2.2rem;
  max-width: 30rem;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.bps.tabletAndAbove}) {
    font-size: 2rem;
    line-height: 2.8rem;
    max-width: none;
    text-align: left;
  }
`;

const HeroLogo = styled.img`
  width: 36rem;

  @media (min-width: ${({ theme }) => theme.bps.tabletAndAbove}) {
    width: 30rem;
    grid-area: a;
    align-self: flex-start;
    justify-self: flex-end;
    max-width: initial;
  }

  @media (min-width: ${({ theme }) => theme.bps.desktopAndAbove}) {
    width: 36rem;
  }
`;

const HeroNavList = styled.ul`
  border-top: ${({ theme }) => `0.2rem solid ${theme.colors.textLight}`};
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 2rem 0 0;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.bps.tabletAndAbove}) {
    grid-area: d;
    width: 100%;
    margin-top: 2rem;
  }

  @media (min-width: ${({ theme }) => theme.bps.desktopAndAbove}) {
    grid-area: c;
    margin: 2.2rem 0 0;
    width: 100%;
    max-width: 52rem;
  }

  > * {
    margin-left: 0;
    margin-right: 0;
  }

  > * + * {
    margin-left: 4rem;
  }

  & li a {
    color: ${({ theme }) => theme.colors.textLight};
    font-size: 1.7rem;
    letter-spacing: 0.1rem;
    transition: opacity 0.4s ease-out;
    text-transform: uppercase;

    &:hover {
      color: ${({ theme }) => theme.colors.linkLightHover};
    }
  }
`;

const HeroButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  > * + * {
    margin-top: 2rem;
  }

  @media (min-width: ${({ theme }) => theme.bps.desktopAndAbove}) {
    align-items: center;
    flex-direction: row;

    > * {
      margin-left: 0;
      margin-right: 0;
    }

    > * + * {
      margin-top: 0;
      margin-left: 2rem;
    }
  }
`;

const DocumentationButton = styled(Link)`
  width: 30rem;
  height: 4rem;
  font-size: 1.4rem;
  background: ${({ theme }) => theme.colors.textLight};
  transition: background 0.25s ease-out;
  line-height: 4rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: ${({ theme }) => theme.colors.heroButton};
  border: 0;

  @media (min-width: ${({ theme }) => theme.bps.desktopAndAbove}) {
    margin-top: 0;
    width: 18rem;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.linkLightHover};
  }
`;

const HeroBodyAndButtons = styled.div`
  > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  > * + * {
    margin-top: 2rem;
  }

  @media (min-width: ${({ theme }) => theme.bps.tabletAndAbove}) {
    grid-area: b;
    max-width: 52rem;
    margin-left: 6rem;
  }

  @media (min-width: ${({ theme }) => theme.bps.desktopAndAbove}) {
    margin-left: 0rem;
  }
`;

const Hero = () => {
  return (
    <Wrapper noPadding background="transparent">
      <HeroContent>
        <HeroLogo src={badge} />
        <HeroBodyAndButtons>
          <HeroTitle>Renature</HeroTitle>
          <HeroBody>
            A physics-based animation library for React inspired by the natural
            world.
          </HeroBody>
          <HeroButtonsContainer>
            <NpmCopy text="npm install renature" />
            <DocumentationButton to="/docs">Documentation</DocumentationButton>
          </HeroButtonsContainer>
        </HeroBodyAndButtons>
        <HeroNavList>
          <li>
            <Link to="/docs">Docs</Link>
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
