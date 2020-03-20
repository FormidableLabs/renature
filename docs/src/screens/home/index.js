import React from 'react';

import Features from './features';
import GetStarted from './get-started';
import MoreOSS from './more-oss';
import Preview from './preview';
import content from './_content';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';

const Home = () => (
  <>
    <Header />
    <Features features={content.features} />
    <Preview />
    <GetStarted getStarted={content.getStarted} />
    <MoreOSS oss={content.oss} />
    <Footer />
  </>
);

export default Home;
