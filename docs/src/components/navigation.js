import styled from 'styled-components';
import { Link } from 'react-static';
import sidebarBackground from '../static/svgs/sidebar-background.svg';
import collapsedSidebarBackground from '../static/svgs/collapsed-sidebar-background.svg';

const sidebarZIndex = 900;

export const Navigation = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: row;
  height: 6rem;
  width: 100%;

  & img {
    margin-left: auto;
    @media (min-width: 768px) {
      margin-left: 0;
    }
  }
`;
export const SidebarContainer = styled.div`
  width: 24rem;
  min-width: 24rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    min-width: 2.5rem;
    width: 2.5rem;
  }
`;

export const SidebarWrapper = styled.aside`
  font-family: 'akkurat';
  background-image: url(${sidebarBackground});
  background-repeat: repeat-y;
  background-size: 100%;
  min-height: 100vh;
  min-width: 24rem;
  width: 24rem;
  z-index: ${sidebarZIndex};
  position: fixed;
  overflow-y: scroll;
  top: 0;
  bottom: 0;

  @media (max-width: 768px) {
    background-image: ${props =>
      props.overlay
        ? `url(${sidebarBackground})`
        : `url(${collapsedSidebarBackground})`};
    min-width: ${props => (props.overlay ? '24rem' : '2.5rem')};
    width: ${props => (props.overlay ? '24rem' : '2.5rem')};
  }
`;

export const SidebarNavItem = styled(Link)`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.6rem;
  display: flex;
  margin: ${({ isSelected }) => (isSelected ? '0 0 0 -2rem' : '0')};
  padding: ${({ isSelected }) =>
    isSelected ? '0.5rem 0.5rem 0.5rem 3rem' : '0.5rem 0.5rem 0.5rem 1rem'};
  background: ${({ isSelected, theme }) =>
    isSelected ? `${theme.colors.linkHover}` : 'transparent'};
  transition: margin 0.2s ease-out, background 0.2s ease-out,
    padding 0.2s ease-out;

  &:hover {
    color: ${({ theme }) => theme.colors.linkLightHover};
  }
`;

export const SidebarNavSubItem = styled(Link)`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.4rem;
  margin: ${({ isSelected }) => (isSelected ? '0 0 0 -2rem' : '0')};
  padding: ${({ isSelected }) =>
    isSelected ? '0.5rem 0.5rem 0.5rem 5rem' : '0.5rem 0.5rem 0.5rem 3rem'};
  background: ${({ isSelected, theme }) =>
    isSelected ? `${theme.colors.linkHover}` : 'transparent'};
  transition: margin 0.2s ease-out, background 0.2s ease-out,
    padding 0.2s ease-out;

  &:hover {
    color: ${({ theme }) => theme.colors.linkLightHover};
  }
`;
