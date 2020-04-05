import styled from 'styled-components';
import PropTypes from 'prop-types';

export const BodyCopy = styled.p`
  font-family: Helvetica;
  font-size: 1.5rem;
  line-height: 1.5;
  color: ${({ color, theme }) => color || theme.colors.textDark};
  text-align: center;
`;

BodyCopy.propTypes = {
  color: PropTypes.string,
};
