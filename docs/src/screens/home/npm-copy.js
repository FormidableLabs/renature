import React from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';

import { BounceAnimation } from '../../components/bounce-animation';

const HeroNPMWrapper = styled.div`
  flex-direction: row;
  justify-content: stretch;
  width: 30rem;
  display: flex;
  flex: 1 0 auto;
`;

const HeroNPMCopy = styled.p`
  width: 22rem;
  height: 4rem;
  color: #383838;
  background-color: #d5d5d5;
  color: black;
  text-align: left;
  padding: 0.33rem 1.5rem;
  line-height: 3.44rem;
  font-size: 14px;
  letter-spacing: 0.2px;
  margin: 0;
  flex: 1 0 auto;
`;

const HeroNPMButton = styled.button`
  width: 8rem;
  height: 4rem;
  background: #ffffff;
  transition: background 0.4s;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 1px;
  color: #383838;
  border: 0;
  text-transform: uppercase;
  cursor: copy;
  &:hover {
    background: ${({ theme }) => theme.colors.linkLightHover};
  }
`;

const NpmCopy = ({ text }) => {
  const [animating, setAnimating] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(ev => {
    ev.preventDefault();
    setAnimating(true);
    setCopied(true);

    setTimeout(() => {
      setAnimating(false);
    }, 200);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }, []);

  return (
    <CopyToClipboard text={text}>
      <HeroNPMWrapper>
        <HeroNPMCopy>{text}</HeroNPMCopy>
        <HeroNPMButton onClick={handleCopy}>
          <BounceAnimation bouncing={animating}>
            {copied ? 'Copied' : 'Copy'}
          </BounceAnimation>
        </HeroNPMButton>
      </HeroNPMWrapper>
    </CopyToClipboard>
  );
};

NpmCopy.propTypes = {
  text: PropTypes.string.isRequired,
};

export default NpmCopy;
