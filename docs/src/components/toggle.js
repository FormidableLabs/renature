import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledToggle = styled.div`
  width: 5.5rem;

  input {
    opacity: 0;
    position: absolute;
  }

  input + label {
    position: relative;
    display: inline-block;
    user-select: none;
    height: 3rem;
    width: 5rem;
    border: 1px solid #e4e4e4;
    border-radius: 6rem;
    transition: 0.4s ease;
    cursor: pointer;
  }

  input + label::before {
    content: '';
    position: absolute;
    display: block;
    height: 3rem;
    width: 5rem;
    top: 0;
    left: 0;
    border-radius: 3rem;
    transition: 0.2s cubic-bezier(0.24, 0, 0.5, 1);
  }

  input + label::after {
    content: '';
    position: absolute;
    display: block;
    background: ${p => p.theme.colors.accent};
    height: 2.8rem;
    width: 2.8rem;
    top: 0.1rem;
    left: 0;
    border-radius: 6rem;
    box-shadow: 0 0 0 1px hsla(0, 0%, 0%, 0.1),
      0 4px 0px 0 hsla(0, 0%, 0%, 0.04), 0 4px 9px hsla(0, 0%, 0%, 0.13),
      0 3px 3px hsla(0, 0%, 0%, 0.05);
    transition: 0.35s cubic-bezier(0.54, 1.6, 0.5, 1);
  }

  input:checked + label::before {
    background: ${p => p.theme.colors.buttonLightHover};
    transition: width 0.2s cubic-bezier(0, 0, 0, 0.1);
  }

  input:checked + label::after {
    left: 2.4rem;
  }
`;

export const Toggle = ({ onChange, checked }) => (
  <StyledToggle>
    <input
      type="checkbox"
      name="toggle"
      id="toggle"
      onChange={onChange}
      checked={checked}
    />
    <label htmlFor="toggle" />
  </StyledToggle>
);

Toggle.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};
