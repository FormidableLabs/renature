import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BodyCopy } from '../../components/body-copy';
import { SecondaryTitle } from '../../components/secondary-title';
import { SectionTitle } from '../../components/section-title';
import { Wrapper } from '../../components/wrapper';
import { Stack } from '../../components/stack';
import { theme } from '../../themes/theme';
import { View } from '../../global-style';

const FeaturesContainer = styled.div`
  ${View};

  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 3rem;

  @media ${p => p.theme.media.sm} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${p => p.theme.media.md} {
    grid-gap: 5rem;
  }
`;

const FeatureCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  > * + * {
    margin-top: 2rem;
  }
`;

const FeatureInfo = styled.div`
  max-width: 30rem;
`;

const Features = ({ features }) => (
  <Wrapper background={theme.colors.bgLight}>
    <Stack>
      <SectionTitle>Features</SectionTitle>
      <FeaturesContainer>
        {features.map(feature => {
          return (
            <FeatureCard key={feature.title}>
              <img src={feature.icon} alt={feature.title} />
              <FeatureInfo>
                <SecondaryTitle>{feature.title}</SecondaryTitle>
                <BodyCopy>{feature.description}</BodyCopy>
              </FeatureInfo>
            </FeatureCard>
          );
        })}
      </FeaturesContainer>
    </Stack>
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
