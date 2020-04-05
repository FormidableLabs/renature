import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  text-align: center;
`;

const StyledLink = styled.a`
  background: ${p => p.theme.colors.accent};
  color: ${p => p.theme.colors.textLight};
  text-decoration: none;
  text-transform: uppercase;
  font-size: 2rem;
  font-size: 1.5rem;
  letter-spacing: 0.01rem;
  padding: 1.5rem 2rem;
  transition: color 0.4s ease-out;

  &:hover {
    color: ${p => p.theme.colors.buttonLightHover};
  }
`;

const NotFound = () => {
  return (
    <Container>
      <Heading>🔭</Heading>
      <Heading>It appears you&apos;ve wandered astray.</Heading>
      <StyledLink href="/docs">Head Home</StyledLink>
    </Container>
  );
};

export default NotFound;
