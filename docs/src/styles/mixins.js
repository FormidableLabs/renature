import { css } from 'styled-components';

export function stack(spacingMobile, spacingTablet = spacingMobile) {
  return css`
    display: flex;
    flex-direction: column;

    > * {
      margin-top: 0;
      margin-bottom: 0;
    }

    > * + * {
      margin-top: ${spacingMobile}rem;
    }

    @media ${(p) => p.theme.media.sm} {
      > * + * {
        margin-top: ${spacingTablet}rem;
      }
    }
  `;
}

export function stackHorizontal(spacingMobile, spacingTablet = spacingMobile) {
  return css`
    display: flex;
    flex-direction: row;

    > * {
      margin-left: 0;
      margin-right: 0;
    }

    > * + * {
      margin-left: ${spacingMobile}rem;
    }

    @media ${(p) => p.theme.media.sm} {
      > * + * {
        margin-left: ${spacingTablet}rem;
      }
    }
  `;
}

export const center = css`
  margin-left: auto;
  margin-right: auto;
  max-width: ${(p) => p.theme.layout.page};
`;

export function underline({ light } = { light: false }) {
  return css`
    position: relative;
    text-decoration: none;

    &::before {
      background-color: ${(p) =>
        light ? p.theme.colors.buttonLightHover : p.theme.colors.accent};
      bottom: 0;
      content: '';
      height: 0.2rem;
      left: 0;
      position: absolute;
      transition: color, width 0.3s ease-in-out;
      width: 0;
    }

    &:hover {
      color: ${(p) =>
        light ? p.theme.colors.buttonLightHover : p.theme.colors.accent};

      &::before {
        width: 100%;
      }
    }
  `;
}

export const overflowEllipsis = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
