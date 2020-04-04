import styled from 'styled-components';
import PropTypes from 'prop-types';

export const SectionTitle = styled.h2`
  color: ${({ color, theme }) => color || theme.colors.textDark};
  font-size: 2.5rem;
  flex: auto;
  line-height: 1.3;
  width: 100%;
  text-align: center;
`;

SectionTitle.propTypes = {
  color: PropTypes.string,
};
