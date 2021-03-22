import { createGlobalStyle } from 'styled-components';

import { stack, stackHorizontal } from './mixins';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: inherit;
    min-width: 0;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    overflow-x: hidden;
  }

  body {
    background: ${(p) => p.theme.colors.textLight};
    color: ${(p) => p.theme.colors.text};
    font-family: ${(p) => p.theme.fonts.body};
    line-height: ${(p) => p.theme.lineHeights.body};
    font-weight: ${(p) => p.theme.fontWeights.body};
    text-rendering: optimizeLegibility;
    margin: 0;
    padding: 0;

    font-size: ${(p) => p.theme.fontSizes.bodySmall};
    
    @media ${(p) => p.theme.media.lg} {
      font-size: ${(p) => p.theme.fontSizes.body};
    }
  }

  a {
    color: ${(p) => p.theme.colors.accent};
    font-weight: ${(p) => p.theme.fontWeights.links};
  }

  table, pre, p, h1, h2, h3 {
    margin: 0 0 ${(p) => p.theme.spacing.md} 0;
  }

  h1, h2, h3 {
    font-family: ${(p) => p.theme.fonts.heading};
    font-weight: ${(p) => p.theme.fontWeights.heading};
    line-height: ${(p) => p.theme.lineHeights.heading};
    color: ${(p) => p.theme.colors.heading};
  }

  h1 {
    font-size: ${(p) => p.theme.fontSizes.h1};
  }

  h2 {
    font-size: ${(p) => p.theme.fontSizes.h2};
  }

  h3 {
    font-size: ${(p) => p.theme.fontSizes.h3};
  }

  img {
    max-width: 100%;
  }

  /* react-live Preview */
  :root {
    --color-space-black: #011826;
    --color-space-blue: #053959;
    --color-yellow: #f2cf63;
  }

  .lp__m {
    background: ${(p) => p.theme.colors.accent};

    &--sm {
      height: 5rem;
      width: 5rem;
      border-radius: 0.5rem;
    }

    &--lg {
      height: 10rem;
      width: 10rem;
      border-radius: 1rem;
    }
  }

  .lp__button {
    display: inline-block;
    color: rgba(255, 255, 255, 0.8);
    background: #011826;
    border: none;
    border-radius: 0.5rem;
    padding: 1rem 2rem;
    margin: 0;
    box-shadow: 0 1rem 3rem 0.5rem rgba(0, 0, 0, 0.2);
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.2s ease-out;

    &:hover {
      transform: scale(1.1);
    }

    &--sm {
      font-size: 1rem;
    }

    &--lg {
      font-size: 1em;
    }
  }

  .lp__stack {
    ${stack(4)};

    align-items: center;

    &-h {
      ${stackHorizontal(2)};
    }
  }

  .lp__toggle {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
  }

  .lp__space {
    height: 100%;
    width: 100%;
    background: linear-gradient(
      var(--color-space-black),
      var(--color-space-blue)
    );
    flex: 1;
  }

  .lp__m-2d {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    background: ${(p) => p.theme.colors.textLight};
    box-shadow: 0 0 0.8rem 0.4rem ${(p) => p.theme.colors.textLight},
      0 0 1.6rem 0.8rem ${(p) => p.theme.colors.accent};
  }

  .lp__attractor-2d {
    position: relative;
    transform: translate(-50%, calc(-50% - 2.5rem));
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    background: var(--color-yellow);
    box-shadow: 0 0 3rem 1.5rem var(--color-yellow);
  }

  .lp__center {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .lp__stroke {
    stroke: ${(p) => p.theme.colors.accent};
    stroke-width: 3;
    fill: transparent;
  }

  .lp__orbital-center {
    border-radius: 50%;
    background: var(--color-yellow);
    transform: translateX(50%);

    &--sm {
      height: 3rem;
      width: 3rem;
    }

    &--lg {
      height: 6rem;
      width: 6rem;
    }
  }

  .lp__orbiter {
    border-radius: 50%;
    background: ${(p) => p.theme.colors.accent};

    &--sm {
      height: 1.5rem;
      width: 1.5rem;
    }

    &--lg {
      height: 3rem;
      width: 3rem;
    }
  }
`;
