import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from './header';
import Article, { ArticleStyling } from './article';
import Sidebar, { SidebarStyling } from '../../components/sidebar';
import burger from '../../assets/burger.svg';
import closeButton from '../../assets/close.svg';

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 144rem;
  margin: 0 auto;
  margin-top: 4.8rem;
  background: ${p => p.theme.colors.textLight};
`;

const OpenCloseSidebar = styled.img.attrs(props => ({
  src: props.sidebarOpen ? closeButton : burger,
}))`
  cursor: pointer;
  display: block;
  margin: ${p => p.theme.spacing.sm} ${p => p.theme.spacing.md};
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;

  @media ${p => p.theme.media.sm} {
    display: none;
  }
`;

const Docs = ({ isLoading, children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prevOpen => !prevOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <Header />
      <Container>
        <OpenCloseSidebar sidebarOpen={sidebarOpen} onClick={toggleSidebar} />
        {isLoading ? (
          <>
            <SidebarStyling
              sidebarOpen={sidebarOpen}
              closeSidebar={closeSidebar}
            />
            <ArticleStyling>{children}</ArticleStyling>
          </>
        ) : (
          <>
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
            <Article>{children}</Article>
          </>
        )}
      </Container>
    </>
  );
};

Docs.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Docs;
