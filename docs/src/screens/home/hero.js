import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import NpmCopy from './npm-copy';
import { Wrapper } from '../../components/wrapper';
import badge from '../../assets/badge_renature.svg';
import { View } from '../../global-style';

const HeroContent = styled.div`
  ${View}

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

  @media ${p => p.theme.media.sm} {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 2rem;
    margin-top: 20rem;

    > * + * {
      margin-top: 0;
    }
  }
`;

const HeroLogo = styled.img`
  width: 20rem;

  @media ${p => p.theme.media.sm} {
    width: auto;
    grid-column: 1 / span 5;
    justify-self: center;
  }

  @media ${p => p.theme.media.md} {
    grid-row: 1 / span 2;
  }
`;

const HeroBodyAndButtons = styled.div`
  max-width: 30rem;

  > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  > * + * {
    margin-top: 2rem;
  }

  @media ${p => p.theme.media.sm} {
    grid-column: 6 / span 7;
    max-width: 52rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  letter-spacing: 0.75rem;
  text-align: center;
  text-transform: uppercase;

  @media ${p => p.theme.media.sm} {
    font-size: 6rem;
    text-align: left;
  }

  @media ${p => p.theme.media.md} {
    font-size: 8rem;
  }
`;

const HeroBody = styled.p`
  font-family: ${p => p.theme.fonts.body};
  letter-spacing: 0.16rem;
  font-size: 1.4rem;
  line-height: 2.2rem;
  text-align: center;

  @media ${p => p.theme.media.sm} {
    font-size: 2rem;
    line-height: 2.8rem;
    text-align: left;
  }
`;

const DocumentationButton = styled(Link)`
  flex-basis: 35%;
  height: 4rem;
  font-size: 1.4rem;
  background: ${p => p.theme.colors.textLight};
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
  border-top: ${({ theme }) => `0.2rem solid ${theme.colors.textLight}`};
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 2rem 0 0;
  text-align: center;
  width: 30rem;

  @media ${p => p.theme.media.sm} {
    grid-column: 1 / span 12;
    grid-row: 2 / span 1;
    margin-top: 2rem;
    width: auto;
  }

  @media ${p => p.theme.media.md} {
    grid-column: 6 / span 7;
    margin-top: 0;
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
    color: ${p => p.theme.colors.textLight};
    font-size: 1.7rem;
    letter-spacing: 0.1rem;
    transition: color 0.3s ease-out;
    text-transform: uppercase;
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.colors.buttonLightHover};
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

  @media ${p => p.theme.media.md} {
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

const Hero = () => {
  return (
    <Wrapper background="transparent" noPadding style={{ padding: '0 4rem' }}>
      <HeroContent>
        <HeroLogo src={badge} alt="renature" />
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
            <Link to="docs/">Docs</Link>
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
