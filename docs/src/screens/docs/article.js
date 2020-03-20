import React from 'react';
import styled from 'styled-components';
import { useRouteData } from 'react-static';

import { Markdown } from '../../components/markdown';

const Container = styled.div`
  box-sizing: content-box;
  min-height: 100vh;
  width: calc(100% - 8rem);
  padding: 10rem 4rem 8rem;
  @media (max-width: 768px) {
    width: calc(100% - 7.5rem);
    padding: 6rem 4rem 8rem 3.5rem;
  }
  .gatsby-highlight {
    @media (max-width: 768px) {
      margin-left: -2rem;
    }
    code {
      overflow-x: scroll;
    }
  }
`;

const Article = () => {
  const { renderedMd } = useRouteData();

  return (
    <Container>
      <Markdown html={renderedMd} />
    </Container>
  );
};

export default Article;
