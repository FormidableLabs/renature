import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BodyCopy } from '../../components/body-copy';
import { Button } from '../../components/button';
import { SecondaryTitle } from '../../components/secondary-title';
import { SectionTitle } from '../../components/section-title';
import { Wrapper } from '../../components/wrapper';
import { theme } from '../../themes/theme';

const OSSCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 4rem;
  width: calc(100% - 4rem);
  max-width: 75%;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${({ theme }) => theme.bps.tabletAndAbove}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    max-width: 116rem;
  }
`;

const OSSCard = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.bps.tabletAndAbove}) {
    flex-direction: row;
    justify-content: space-between;

    > * {
      margin-left: 0;
      margin-right: 0;
    }

    > * + * {
      margin-left: 3rem;
    }
  }
`;

const OSSImage = styled.img`
  height: 15rem;
  width: 15rem;
  max-width: none;
`;

const OSSCopyContainer = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  > * + * {
    margin-top: 2rem;
  }
`;

const OSSTitle = styled(SecondaryTitle)`
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
  transition: opacity 0.3s ease-out;

  &:hover {
    opacity: 0.7;
  }

  @media (min-width: ${({ theme }) => theme.bps.tabletAndAbove}) {
    text-align: left;
  }
`;

const SectionWrapper = styled(Wrapper)`
  padding: 8rem 0rem;
`;

const OSSDescription = styled(BodyCopy)`
  color: ${({ theme }) => theme.colors.textLight};

  @media (min-width: ${({ theme }) => theme.bps.tabletAndAbove}) {
    text-align: left;
  }
`;

const MoreOSS = ({ oss }) => (
  <SectionWrapper background={theme.colors.backgroundFullDark}>
    <SectionTitle color={theme.colors.textLight}>
      More Open Source from Formidable
    </SectionTitle>
    <OSSCardContainer>
      {oss.map(card => {
        return (
          <OSSCard key={card.title}>
            <a href={card.link} target="_blank" rel="noopener noreferrer">
              <OSSImage src={card.logo} />
            </a>
            <OSSCopyContainer>
              <a href={card.link} target="_blank" rel="noopener noreferrer">
                <OSSTitle>{card.title}</OSSTitle>
              </a>
              <OSSDescription>{card.description}</OSSDescription>
            </OSSCopyContainer>
          </OSSCard>
        );
      })}
    </OSSCardContainer>
    <Button light to="https://formidable.com/open-source/">
      View All
    </Button>
  </SectionWrapper>
);

MoreOSS.propTypes = {
  oss: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default MoreOSS;
