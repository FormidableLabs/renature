import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { theme } from '../themes/theme';

export const Button = styled(({ light, ...rest }) => {
  return <Link {...rest} />;
})`
  background: ${({ light }) =>
    light ? theme.colors.buttonLight : theme.colors.buttonDark};
  color: ${({ light }) =>
    light ? theme.colors.buttonDark : theme.colors.buttonLight};
  font-size: 1.5rem;
  letter-spacing: 0.01rem;
  margin: 5rem auto 3rem;
  padding: 1.5rem 2rem;
  text-align: center;
  text-transform: uppercase;
  transition: background 0.4s ease-out;

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
