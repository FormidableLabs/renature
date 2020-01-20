import React from 'react';
import { Link } from 'react-static';
import styled from 'styled-components';

import { Wrapper } from '../../components/wrapper';
import NpmCopy from './npm-copy';

import badge from '../../static/pngs/badge_renature@2x.png';

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
  margin-top: 5rem;
  padding: 0;
  text-align: left;
  width: 100%;

  @media (min-width: 768px) {
    display: grid;
    grid-template-areas:
      'a . b'
      'a . b'
      'a . b'
      'a . c'
      'd d d';
    margin: 20rem 2rem 0;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  letter-spacing: 0.25rem;
  margin: 0 0 2rem;
  text-align: center;
  text-transform: uppercase;
  width: 100%;

  @media (min-width: 768px) {
    font-size: 6.5rem;
    text-align: left;
  }

  @media (min-width: 1024px) {
    font-size: 9rem;
    text-align: left;
    margin: 4rem 0 2rem;
  }
`;

const HeroBody = styled.p`
  font-family: Helvetica;
  letter-spacing: 0.08em;
  font-size: 1.4rem;
  line-height: 2.2rem;
  margin: 0 0 4rem;
  max-width: 30rem;
  text-align: left;
  width: 100%;

  @media (min-width: 768px) {
    font-size: 2rem;
    line-height: 2.8rem;
    max-width: 100%;
  }
`;

const HeroLogo = styled.img`
  width: 36rem;
  position: relative;

  @media (min-width: 768px) {
    width: 30rem;
    grid-area: a;
    align-self: flex-start;
    justify-self: flex-end;
    max-width: initial;
  }

  @media (min-width: 1024px) {
    width: 36rem;
  }
`;

const HeroNavList = styled.ul`
  border-top: 0.2rem solid #707070;
  margin-top: 2.2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style: none;
  padding: 2rem 0 0;
  text-align: center;
  width: auto;
  box-sizing: border-box;

  @media (min-width: 768px) {
    grid-area: d;
    margin: 6rem auto;
    width: 100%;
    max-width: 82rem;
  }

  @media (min-width: 1024px) {
    grid-area: c;
    margin: 2.2rem 0 0;
    width: 100%;
    max-width: 52rem;
    border-top-color: ${({ theme }) => theme.colors.textLight};
  }

  & li a {
    color: ${({ theme }) => theme.colors.textLight};
    display: inline-block;
    font-size: 1.7rem;
    letter-spacing: 0.1rem;
    margin: 0 2rem;
    transition: opacity 0.4s;
    text-transform: uppercase;
  }

  & li a:hover {
    color: ${({ theme }) => theme.colors.linkLightHover};
  }
`;

const HeroButtonsWrapper = styled.div`
  max-width: 100%;
  flex-direction: column;
  justify-content: space-between;
  display: flex;

  @media (max-width: 768px) {
    align-items: center;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const HeroDocsButton = styled(Link)`
  width: 30rem;
  margin-left: 0rem;
  height: 4rem;
  font-size: 1.4rem;
  background: ${({ theme }) => theme.colors.textLight};
  transition: background 0.4s;
  line-height: 4rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: #383838;
  border: 0;
  margin-top: 1.2rem;

  @media (min-width: 768px) {
    margin-top: 2rem;
    width: 30rem;
  }

  @media (min-width: 1024px) {
    margin-top: 0;
    margin-left: 2rem;
    width: 18rem;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.linkLightHover};
  }
`;

const HeroBodyAndButtons = styled.div`
  @media (min-width: 768px) {
    grid-area: b;
    max-width: 52rem;
    margin-left: 6rem;
  }

  @media (min-width: 1024px) {
    grid-area: b;
    max-width: 52rem;
    margin-left: 0rem;
  }
`;

class Hero extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <Wrapper noPadding background="transparent">
        <HeroContent>
          <HeroLogo src={badge} />
          <HeroBodyAndButtons>
            <HeroTitle>Renature</HeroTitle>
            <HeroBody>
              A physics-based animation library for React inspired by the
              natural world.
            </HeroBody>
            <HeroButtonsWrapper>
              <NpmCopy text="npm install renature" />
              <HeroDocsButton prefetch to="/docs">
                Documentation
              </HeroDocsButton>
            </HeroButtonsWrapper>
          </HeroBodyAndButtons>
          <HeroNavList>
            <li>
              <Link prefetch to="/docs">
                Docs
              </Link>
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
  }
}

export default Hero;
