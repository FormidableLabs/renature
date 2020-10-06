import styled from 'styled-components';
import PropTypes from 'prop-types';

export const SectionTitle = styled.h2`
  color: ${({ color, theme }) => color || theme.colors.textDark};
  font-size: 3rem;
  flex: auto;
  line-height: 1.3;
  width: 100%;
  text-align: center;

  @media ${(p) => p.theme.media.sm} {
    font-size: 4rem;
  }

  @media ${(p) => p.theme.media.md} {
    font-size: 4.5rem;
  }
`;

SectionTitle.propTypes = {
  color: PropTypes.string,
};
