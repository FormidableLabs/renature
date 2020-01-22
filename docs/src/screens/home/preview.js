import React from 'react';
import styled, { css } from 'styled-components';

import { Wrapper } from '../../components/wrapper';
import { SectionTitle } from '../../components/section-title';
import { theme } from '../../theme';
import { BodyCopy } from '../../components/body-copy';

const Preview = () => (
  <Wrapper background={theme.colors.backgroundGradient}>
    <SectionTitle color={theme.colors.textLight} compact>
      Beautiful, Simple Animations
    </SectionTitle>
    <BodyCopy color={theme.colors.textLight}>
      Renature is all about bringing joy and whimsy to UI animation.
    </BodyCopy>
  </Wrapper>
);

export default Preview;
