import React from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';

import { BounceAnimation } from '../../components/bounce-animation';

const HeroNPMWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-basis: 65%;
`;

const HeroNPMCopy = styled.p`
  background-color: #d5d5d5;
  height: 4rem;
  color: ${(p) => p.theme.colors.button};
  text-align: left;
  padding: 0 1.5rem;
  line-height: 4rem;
  font-size: 1.4rem;
  letter-spacing: 0.02rem;
  margin: 0;
  flex: 1;
`;

const HeroNPMButton = styled.button`
  flex: 0 1 8rem;
  height: 4rem;
  margin: 0;
  padding: 0;
  background: ${(p) => p.theme.colors.textLight};
  transition: background 0.3s ease-out;
  font-size: 1.4rem;
  letter-spacing: 0.01rem;
  color: ${(p) => p.theme.colors.button};
  border: 0;
  text-transform: uppercase;
  cursor: copy;

  &:hover {
    background: ${(p) => p.theme.colors.buttonLightHover};
  }
`;

const NpmCopy = ({ text }) => {
  const [animating, setAnimating] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback((ev) => {
    ev.preventDefault();
    setAnimating(true);
    setCopied(true);

    setTimeout(() => {
      setAnimating(false);
    }, 200);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
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
