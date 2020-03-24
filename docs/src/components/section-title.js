import styled from 'styled-components';
import PropTypes from 'prop-types';

export const SectionTitle = styled.h2`
  color: ${({ color, theme }) => color || theme.colors.textDark};
  font-size: 2.5rem;
  flex: auto;
  line-height: 1.3;
  margin: 4 rem 0;
  width: 100%;
  text-align: center;

  @media ${p => p.theme.media.sm} {
    margin: 2rem 0 ${({ compact }) => (compact ? '2rem' : '6rem')};
  }

  @media (max-width: 768px) {
    margin: 4rem 0;
  }
`;

SectionTitle.propTypes = {
  color: PropTypes.string,
  compact: PropTypes.bool,
};

SectionTitle.defaultProps = {
  compact: false,
};
