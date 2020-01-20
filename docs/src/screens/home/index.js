import React from 'react';
import styled from 'styled-components';

import Features from './features';
import GetStarted from './get-started';
import MoreOSS from './more-oss';
import Preview from './preview';
import content from './_content';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundLight};
`;

const Home = () => (
  <Container>
    <Header />
    <Features features={content.features} />
    <Preview />
    <GetStarted getStarted={content.getStarted} />
    <MoreOSS oss={content.oss} />
    <Footer />
  </Container>
);

export default Home;
