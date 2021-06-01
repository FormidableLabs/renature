import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { useFriction } from '../../src';

/**
 * Wait an arbitrary amount of time for the animation to run.
 * We aren't concerned about what particular state the animation
 * has reached, just that some animation is actively happening.
 *
 * @returns – a Promise that resolves to true after 500ms.
 */
const waitForAnimation = async (
  { timeout, waitForTimeout } = { timeout: 500, waitForTimeout: 1000 }
): Promise<boolean> =>
  await waitFor(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, timeout);
      }),
    { timeout: waitForTimeout }
  );

describe('useFriction', () => {
  beforeAll(() => {
    window.matchMedia = jest.fn().mockReturnValue({
      matches: true,
      media: '',
      onchange: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });
  });

  afterAll(() => {
    window.matchMedia = undefined;
  });

  describe('Core API Functionality', () => {
    it('should return a ref to attach to a DOM or SVG element to support animation', () => {
      const Component = () => {
        const [props] = useFriction({
          from: { opacity: 0 },
          to: { opacity: 1 },
        });

        return <div data-testid="node" {...props} />;
      };

      const { getByTestId } = render(<Component />);
      const animatingNode = getByTestId('node');

      expect(animatingNode).toHaveStyle({
        opacity: 0,
      });
    });

    it('should animate the specified property', async () => {
      const Component = () => {
        const [props] = useFriction({
          from: { opacity: 0 },
          to: { opacity: 1 },
        });

        return <div data-testid="node" {...props} />;
      };

      const { getByTestId } = render(<Component />);

      await waitForAnimation();

      const node = getByTestId('node');
      const currentOpacity = parseFloat(node.style.opacity);

      expect(currentOpacity).toBeGreaterThan(0);
      expect(currentOpacity).toBeLessThan(1);
    });

    it('should not animate the specified property if pause is set to true', async () => {
      const Component = () => {
        const [props] = useFriction({
          from: { opacity: 0 },
          to: { opacity: 1 },
          pause: true,
        });

        return <div data-testid="node" {...props} />;
      };

      const { getByTestId } = render(<Component />);

      await waitForAnimation();

      const node = getByTestId('node');
      expect(node).not.toHaveAttribute('style');
    });

    it('should begin animation if pause switches to true on a subsequent render', async () => {
      const Component = ({ pause }) => {
        const [props] = useFriction({
          from: { opacity: 0 },
          to: { opacity: 1 },
          pause,
        });

        return <div data-testid="node" {...props} />;
      };

      const { getByTestId, rerender } = render(<Component pause />);

      await waitForAnimation();

      const node = getByTestId('node');
      expect(node).not.toHaveAttribute('style');

      // Re-render Component with pause set to false.
      rerender(<Component pause={false} />);

      await waitForAnimation();

      const currentOpacity = parseFloat(node.style.opacity);

      expect(currentOpacity).toBeGreaterThan(0);
      expect(currentOpacity).toBeLessThan(1);
    });

    it('should animate a delayed animation after the specified delay has elapsed', async () => {
      const Component = () => {
        const [props] = useFriction({
          from: { opacity: 0 },
          to: { opacity: 1 },
          delay: 1000,
        });

        return <div data-testid="node" {...props} />;
      };

      const { getByTestId } = render(<Component />);

      await waitForAnimation();

      // The animating element should not have animated yet, since waitForAnimation
      // will only wait for half a second by default.
      const node = getByTestId('node');
      expect(node).not.toHaveAttribute('style');

      // Wait an additional full second. By this point, 1500 seconds will have elapsed,
      // meaning that the 1000 ms delay will be exceeded and the animation should be running.
      await waitForAnimation({ timeout: 1000, waitForTimeout: 1500 });

      const currentOpacity = parseFloat(node.style.opacity);

      expect(currentOpacity).toBeGreaterThan(0);
      expect(currentOpacity).toBeLessThan(1);
    });
  });

  describe('transform Animations', () => {
    it('should add translateZ to transform animations by default', () => {
      const Component = () => {
        const [props] = useFriction({
          from: { transform: 'translateX(0px)' },
          to: { transform: 'translateX(100px)' },
        });

        return <div data-testid="node" {...props} />;
      };

      const { getByTestId } = render(<Component />);
      const animatingNode = getByTestId('node');

      expect(animatingNode).toHaveStyle({
        transform: 'translateX(0px) translateZ(0)',
      });
    });

    it('should not apply translateZ to transform animations if disableHardwareAcceleration is true', () => {
      const Component = () => {
        const [props] = useFriction({
          from: { transform: 'translateX(0px)' },
          to: { transform: 'translateX(100px)' },
          disableHardwareAcceleration: true,
        });

        return <div data-testid="node" {...props} />;
      };

      const { getByTestId } = render(<Component />);
      const animatingNode = getByTestId('node');

      expect(animatingNode).toHaveStyle({
        transform: 'translateX(0px)',
      });
    });

    it('should respect user-supplied values for a transform animation using translateZ', () => {
      const Component = () => {
        const [props] = useFriction({
          from: { transform: 'scale(1) translateZ(50px)' },
          to: { transform: 'scale(0) translateX(0px)' },
        });

        return <div data-testid="node" {...props} />;
      };

      const { getByTestId } = render(<Component />);
      const animatingNode = getByTestId('node');

      expect(animatingNode).toHaveStyle({
        transform: 'scale(1) translateZ(50px)',
      });
    });
  });
});
