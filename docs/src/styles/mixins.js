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

    @media ${p => p.theme.media.sm} {
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

    @media ${p => p.theme.media.sm} {
      > * + * {
        margin-left: ${spacingTablet}rem;
      }
    }
  `;
}

export const center = css`
  margin-left: auto;
  margin-right: auto;
  max-width: ${p => p.theme.layout.page};
`;
