import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BodyCopy } from '../../components/body-copy';
import { SecondaryTitle } from '../../components/secondary-title';
import { SectionTitle } from '../../components/section-title';
import { Wrapper } from '../../components/wrapper';
import { Stack } from '../../components/stack';
import { theme } from '../../themes/theme';

const FeaturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 75%;
  align-self: center;

  > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  > * + * {
    margin-top: 1rem;
  }

  @media ${p => p.theme.media.sm} {
    max-width: none;
    flex-direction: row;

    > * {
      margin-top: 0;
      margin-bottom: 0;
      margin-left: 0;
      margin-right: 0;
    }

    > * + * {
      margin-left: 3rem;
    }
  }
`;

const FeatureCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  > * + * {
    margin-top: 2rem;
  }

  img {
    align-self: center;
  }
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
              <SecondaryTitle>{feature.title}</SecondaryTitle>
              <BodyCopy>{feature.description}</BodyCopy>
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
