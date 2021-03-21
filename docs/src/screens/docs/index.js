import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Sidebar from '../../components/sidebar';
import burger from '../../assets/burger.svg';
import closeButton from '../../assets/close.svg';
import { center } from '../../styles/mixins';

import Article from './article';
import Header from './header';

const Container = styled.div`
  ${center}

  position: relative;
  display: flex;
  width: 100%;
  margin-top: ${(p) => p.theme.layout.header};
  background: ${(p) => p.theme.colors.textLight};
`;

export const OpenCloseSidebar = styled.img.attrs((props) => ({
  src: props.sidebarOpen ? closeButton : burger,
}))`
  cursor: pointer;
  display: block;
  margin: ${(p) => p.theme.spacing.sm} ${(p) => p.theme.spacing.md};
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;

  @media ${(p) => p.theme.media.sm} {
    display: none;
  }
`;

const Docs = ({ isLoading, children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevOpen) => !prevOpen);
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
          children
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
