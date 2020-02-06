import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BodyCopy } from '../../components/body-copy';
import { Button } from '../../components/button';
import { SectionTitle } from '../../components/section-title';
import { Wrapper } from '../../components/wrapper';
import { theme } from '../../themes/theme';

const GetStarted = ({ getStarted }) => (
  <Wrapper background={theme.colors.backgroundLight}>
    <SectionTitle>Get Started</SectionTitle>
    <BodyCopy>{getStarted.description}</BodyCopy>
    <Button to={getStarted.link}>Documentation</Button>
  </Wrapper>
);

GetStarted.propTypes = {
  getStarted: PropTypes.shape({
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

export default GetStarted;
