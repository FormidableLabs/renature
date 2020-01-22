import styled from 'styled-components';
import PropTypes from 'prop-types';
import { theme } from '../theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: ${({ noMargin }) => (noMargin ? '0' : 'auto')};
  padding: ${({ noPadding }) => (noPadding ? '0' : '4rem')};
  background: ${({ background }) => background || theme.colors.backgroundLight};
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: ${({ noPadding }) => (noPadding ? '0' : '8rem')};
  }

  @media (max-width: 768px) {
    text-align: center;

    img {
      max-width: 240px;
    }
  }
`;

Wrapper.propTypes = {
  noMargin: PropTypes.bool,
  noPadding: PropTypes.bool,
  background: PropTypes.string,
};

Wrapper.defaultProps = {
  noMargin: false,
  noPadding: false,
};
