import React from 'react';
import PropTypes from 'prop-types';

import { BodyCopy } from '../../components/body-copy';
import { Button } from '../../components/button';
import { SectionTitle } from '../../components/section-title';
import { SectionStack } from '../../components/section-stack';
import { Wrapper } from '../../components/wrapper';
import { theme } from '../../styles/theme';

const GetStarted = ({ getStarted }) => (
  <Wrapper background={theme.colors.bgLight}>
    <SectionStack>
      <SectionTitle>Get Started</SectionTitle>
      <BodyCopy>{getStarted.description}</BodyCopy>
      <Button to={getStarted.link}>Documentation</Button>
    </SectionStack>
  </Wrapper>
);

GetStarted.propTypes = {
  getStarted: PropTypes.shape({
    description: PropTypes.node.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

export default GetStarted;
