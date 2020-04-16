import { createGlobalStyle } from 'styled-components';

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
    background: ${p => p.theme.colors.textLight};
    color: ${p => p.theme.colors.text};
    font-family: ${p => p.theme.fonts.body};
    line-height: ${p => p.theme.lineHeights.body};
    font-weight: ${p => p.theme.fontWeights.body};
    text-rendering: optimizeLegibility;
    margin: 0;
    padding: 0;

    font-size: ${p => p.theme.fontSizes.bodySmall};
    
    @media ${p => p.theme.media.lg} {
      font-size: ${p => p.theme.fontSizes.body};
    }
  }

  a {
    color: ${p => p.theme.colors.accent};
    font-weight: ${p => p.theme.fontWeights.links};
  }

  table, pre, p, h1, h2, h3 {
    margin: 0 0 ${p => p.theme.spacing.md} 0;
  }

  h1, h2, h3 {
    font-family: ${p => p.theme.fonts.heading};
    font-weight: ${p => p.theme.fontWeights.heading};
    line-height: ${p => p.theme.lineHeights.heading};
    color: ${p => p.theme.colors.heading};
  }

  h1 {
    font-size: ${p => p.theme.fontSizes.h1};
  }

  h2 {
    font-size: ${p => p.theme.fontSizes.h2};
  }

  h3 {
    font-size: ${p => p.theme.fontSizes.h3};
  }

  img {
    max-width: 100%;
  }

  .live-preview__mover {
    background: ${p => p.theme.colors.accent};

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

  .live-preview__button {
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

  .live-preview__stack {
    display: flex;
    flex-direction: column;
    align-items: center;

    > * {
      margin-top: 0;
      margin-bottom: 0;
    }

    > * + * {
      margin-top: 2rem;
    }
  }
`;
