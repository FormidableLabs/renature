import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BodyCopy } from '../../components/body-copy';
import { SecondaryTitle } from '../../components/secondary-title';
import { SectionTitle } from '../../components/section-title';
import { Wrapper } from '../../components/wrapper';
import { theme } from '../../themes/theme';

const FeatureCard = styled.div`
  margin: 0 0 4rem;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.bps.tabletAndAbove}) {
    margin: 0;
    width: calc(1 / 3 * 100% - (1 - 1 / 3) * 4rem);
  }

  @media (min-width: ${({ theme }) => theme.bps.desktopAndAbove}) {
    width: calc(1 / 3 * 100% - (1 - 1 / 3) * 8rem);
  }
`;

const Image = styled.img`
  @media (min-width: ${({ theme }) => theme.bps.desktopAndAbove}) {
    max-width: initial !important;
  }
`;

const Features = ({ features }) => (
  <Wrapper background={theme.colors.backgroundLight}>
    <SectionTitle>Features</SectionTitle>
    {features.map(feature => {
      return (
        <FeatureCard key={feature.title}>
          <Image src={feature.icon} />
          <SecondaryTitle>{feature.title}</SecondaryTitle>
          <BodyCopy>{feature.description}</BodyCopy>
        </FeatureCard>
      );
    })}
  </Wrapper>
);

Features.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default Features;
