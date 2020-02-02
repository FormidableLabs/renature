import React from 'react';
import styled from 'styled-components';

import { Wrapper } from './wrapper';
import { theme } from '../themes/theme';

import logoFormidableWhite from '../static/svgs/logo_formidable_white.png';

const FooterDescription = styled.p`
  flex: 2;
  font-size: 1.4rem;
  letter-spacing: 0.05rem;
  line-height: 1.6;
  margin: 2rem 0 0;
  max-width: 56rem;
  text-align: left;
  color: ${({ theme }) => theme.colors.textLight};

  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin: 0;
    min-width: auto;
  }

  & a {
    color: ${({ theme }) => theme.colors.textLight};
    letter-spacing: 0.1rem;
    transition: opacity 0.4s;
  }

  & a:hover {
    opacity: 0.7;
  }

  & a:visited {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const FooterLeft = styled.div`
  display: flex;
  flex: 1;
  padding: 0;
  text-align: left;
`;

const FooterLogo = styled.img`
  width: 7rem;
  margin-right: 2.7rem;
`;

const FooterLinks = styled.ul`
  font-size: 1.4rem;
  list-style: none;
  padding: 0 0.8rem;
  text-transform: uppercase;

  & li {
    margin-bottom: 1.4rem;
  }

  & a {
    color: ${({ theme }) => theme.colors.textLight};
    letter-spacing: 0.1rem;
    transition: opacity 0.4s;
  }

  & a:hover {
    opacity: 0.7;
  }

  & a:visited {
    color: white;
  }
`;

export const Footer = () => (
  <Wrapper background={theme.colors.backgroundDark}>
    <FooterLeft>
      <a
        href="https://formidable.com"
        title="Formidable"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FooterLogo src={logoFormidableWhite} alt="Formidable Logo" />
      </a>
      <FooterLinks>
        <li>
          <a href="https://formidable.com/contact/" title="Contact">
            Contact
          </a>
        </li>
        <li>
          <a href="https://formidable.com/careers/" title="Careers">
            Careers
          </a>
        </li>
      </FooterLinks>
    </FooterLeft>
    <FooterDescription>
      Formidable is a Seattle, Denver, and London-based engineering consultancy
      and open source software organization, specializing in React.js, React
      Native, GraphQL, Node.js, and the extended JavaScript ecosystem. For more
      information about Formidable, please visit{' '}
      <a href="https://www.formidable.com">formidable.com</a>.
    </FooterDescription>
  </Wrapper>
);
