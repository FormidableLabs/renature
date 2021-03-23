import { renderHook } from '@testing-library/react-hooks';

import { usePrefersReducedMotion } from '../../src/hooks/usePrefersReducedMotion';

describe('usePrefersReducedMotion', () => {
  it.each([
    { query: 'no-preference', prefersReducedMotion: false },
    { query: 'reduce', prefersReducedMotion: true },
  ])(
    'should return a boolean indicating whether or not the user prefers reduced motion',
    ({ query, prefersReducedMotion }) => {
      window.matchMedia = jest.fn().mockImplementation((q) => ({
        matches: q === `(prefers-reduced-motion: ${query})`,
        media: '',
        onchange: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }));

      const { result } = renderHook(() => usePrefersReducedMotion());
      expect(result.current).toBe(prefersReducedMotion);
    }
  );

  it.each([
    { query: 'no-preference', prefersReducedMotion: false },
    { query: 'reduce', prefersReducedMotion: true },
  ])(
    'should set up listeners for changes to the reduced motion preference',
    ({ query, prefersReducedMotion }) => {
      const addEventListenerMock = jest.fn();
      const removeEventListenerMock = jest.fn();

      window.matchMedia = jest.fn().mockImplementation((q) => ({
        matches: q === `(prefers-reduced-motion: ${query})`,
        media: '',
        onchange: jest.fn(),
        addEventListener: addEventListenerMock,
        removeEventListener: removeEventListenerMock,
      }));

      const { result, unmount } = renderHook(() => usePrefersReducedMotion());
      expect(result.current).toBe(prefersReducedMotion);

      expect(addEventListenerMock).toHaveBeenCalledTimes(1);

      unmount();

      expect(addEventListenerMock).toHaveBeenCalledTimes(1);
      expect(removeEventListenerMock).toHaveBeenCalledTimes(1);
    }
  );
});
