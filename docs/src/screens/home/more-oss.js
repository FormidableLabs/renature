import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FeaturedBadge, ProjectBadge } from 'formidable-oss-badges';

import { BodyCopy } from '../../components/body-copy';
import { Button } from '../../components/button';
import { SecondaryTitle } from '../../components/secondary-title';
import { SectionTitle } from '../../components/section-title';
import { SectionStack } from '../../components/section-stack';
import { Wrapper } from '../../components/wrapper';
import { theme } from '../../styles/theme';
import { center, stack, stackHorizontal } from '../../styles/mixins';

const OSSCardContainer = styled.div`
  ${center};

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 4rem;
  width: calc(100% - 4rem);

  @media ${(p) => p.theme.media.sm} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
`;

const OSSCard = styled.div`
  ${stack(1)};

  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${(p) => p.theme.media.sm} {
    ${stackHorizontal(3)};

    justify-content: space-between;

    > * {
      margin-top: 0;
    }
  }
`;

const OSSBadge = styled.div`
  width: 15rem;
  height: 15rem;

  @media ${(p) => p.theme.media.sm} {
    flex: 0 0 15rem;
  }
`;

const OSSCopyContainer = styled.div`
  ${stack(2)};
`;

const OSSTitle = styled(SecondaryTitle)`
  color: ${(p) => p.theme.colors.textLight};
  transition: opacity 0.3s ease-out;
  margin: 0;

  &:hover {
    opacity: 0.7;
  }

  @media ${(p) => p.theme.media.sm} {
    text-align: left;
  }
`;

const SectionWrapper = styled(Wrapper)`
  padding: 8rem 0rem;
`;

const OSSDescription = styled(BodyCopy)`
  color: ${(p) => p.theme.colors.textLight};

  @media ${(p) => p.theme.media.sm} {
    text-align: left;
  }
`;

const MoreOSS = ({ oss }) => (
  <SectionWrapper background="#000000">
    <SectionStack>
      <SectionTitle color={theme.colors.textLight}>
        More Open Source from Formidable
      </SectionTitle>
      <OSSCardContainer>
        {oss.cards.map((card) => {
          return (
            <OSSCard key={card.title}>
              <OSSBadge>
                {card.featured ? (
                  <FeaturedBadge isHoverable name={card.title.toLowerCase()} />
                ) : (
                  <ProjectBadge
                    isHoverable
                    color={card.color}
                    abbreviation={card.abbreviation}
                    description={card.title}
                  />
                )}
              </OSSBadge>
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
      <Button light to={oss.link} isExternal>
        View All
      </Button>
    </SectionStack>
  </SectionWrapper>
);

MoreOSS.propTypes = {
  oss: PropTypes.shape({
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        featured: PropTypes.bool,
        abbreviated: PropTypes.string,
        color: PropTypes.string,
      }).isRequired
    ).isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

export default MoreOSS;
