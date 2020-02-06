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
  @media (min-width: 768px) {
    margin: 0;
    width: calc(1 / 3 * 100% - (1 - 1 / 3) * 40px);
  }
  @media (min-width: 1024px) {
    width: calc(1 / 3 * 100% - (1 - 1 / 3) * 80px);
  }
`;

const Image = styled.img`
  @media (min-width: 1024px) {
    max-width: initial !important;
  }
`;

const Features = ({ features }) => (
  <Wrapper background={theme.colors.backgroundLight}>
    <SectionTitle>Features</SectionTitle>
    {features.map(feature => (
      <FeatureCard key={feature.title}>
        <Image src={feature.icon} />
        <SecondaryTitle>{feature.title}</SecondaryTitle>
        <BodyCopy>{feature.description}</BodyCopy>
      </FeatureCard>
    ))}
  </Wrapper>
);

Features.propTypes = {
  features: PropTypes.array.isRequired,
};

export default Features;
