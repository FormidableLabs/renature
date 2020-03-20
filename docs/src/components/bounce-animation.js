import styled from 'styled-components';

export const BounceAnimation = styled.span`
  display: block;
  transition: all 0.3s ease-out;
  transform: ${props =>
    props.bouncing ? 'translateY(-0.5rem)' : 'translateY(0)'};
`;
