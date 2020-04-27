import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { LiveProvider, LivePreview } from 'react-live';

import { scope, removeImportFromPreview } from '../../utils/live-preview';
import Arrow from '../../assets/arrow.svg';

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.1rem solid ${p => p.theme.colors.accent};
  position: relative;
  background-position: 0 0;
  background-size: 0.5rem 0.5rem;
  background-image: radial-gradient(
    ${p => p.theme.colors.accent} 25%,
    transparent 25%
  );
`;

const StyledPreview = styled(LivePreview)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15rem;
  background: ${p => p.theme.colors.textLight};
`;

const StyledPreviewTitle = styled(Link)`
  display: flex;
  align-items: center;
  font-size: ${p => p.theme.fontSizes.small};
  margin: 1.5rem auto;
  padding: 0.5rem;
  background: ${p => p.theme.colors.textLight};
  text-decoration: none;
  color: ${p => p.theme.colors.accent};

  @media ${p => p.theme.media.sm} {
    font-size: ${p => p.theme.fontSizes.bodySmall};
  }

  @media ${p => p.theme.media.md} {
    font-size: ${p => p.theme.fontSizes.body};
  }

  &::after {
    content: '';
    background: url(${Arrow});
    height: 1.6rem;
    width: 1.6rem;
    margin-left: 0.5rem;
  }
`;

const GalleryPreview = ({ title, code, slug }) => {
  const location = useLocation();
  const to = `${location.pathname}/${slug}`;

  return (
    <StyledCard>
      <LiveProvider
        code={code}
        scope={scope}
        transformCode={removeImportFromPreview}
      >
        <StyledPreview />
      </LiveProvider>
      <StyledPreviewTitle to={to}>{title}</StyledPreviewTitle>
    </StyledCard>
  );
};

GalleryPreview.propTypes = {
  title: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default GalleryPreview;
