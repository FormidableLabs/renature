import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-static';
import PropTypes from 'prop-types';
import { theme } from '../themes/theme';

export const Button = styled(({ light = false, noMargin = false, ...rest }) => (
  <Link {...rest} />
))`
  background: ${({ light }) =>
    light ? theme.colors.buttonLight : theme.colors.buttonDark};
  color: ${({ light }) =>
    light ? theme.colors.buttonDark : theme.colors.buttonLight};
  display: block;
  font-size: 1.5rem;
  height: 4rem;
  letter-spacing: 0.05em;
  line-height: 4rem;
  margin: ${({ noMargin }) => (noMargin ? '0 auto' : '5rem auto 3rem')};
  max-width: 21rem;
  min-width: 10rem;
  text-align: center;
  text-transform: uppercase;
  transition: background 0.4s ease-out;
  width: 100%;

  &:hover {
    background: ${({ light }) =>
      light ? theme.colors.linkLightHover : theme.colors.linkHover};
  }

  &:active {
    opacity: 0.6;
  }
`;

Button.propTypes = {
  to: PropTypes.string.isRequired,
  light: PropTypes.bool,
  noMargin: PropTypes.bool,
};
