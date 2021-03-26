import { useState, useEffect } from 'react';

const query = '(prefers-reduced-motion: no-preference)';

const getInitialState = () =>
  typeof window === 'undefined' ? true : !window.matchMedia(query).matches;

export const usePrefersReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    getInitialState()
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches);
    };

    mediaQueryList.addEventListener('change', listener);

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, []);

  return prefersReducedMotion;
};
