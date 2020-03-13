import {
  parsePairs,
  getInterpolatorForPair,
  Interpolator,
  rgba,
} from '../../src/parsers';

describe('pairs', () => {
  describe('parsePairs', () => {
    it('should parse a from / to pair to its property and value representations', () => {
      const pair = { from: { opacity: 0 }, to: { opacity: 1 } };
      expect(parsePairs(pair)).toEqual({
        from: { property: 'opacity', value: 0 },
        to: { property: 'opacity', value: 1 },
      });
    });
  });

  describe('getInterpolatorForPair', () => {
    it('should infer a from / to pair of type number and return a numeric interpolator', () => {
      const pair = { from: { opacity: 0 }, to: { opacity: 1 } };
      const { interpolator } = getInterpolatorForPair(pair);

      const result = interpolator({
        range: [100, 400],
        domain: [0.3, 0.5],
        value: 175,
      });
      expect(result).toEqual(0.35);
    });

    it('should infer a from / to pair of type string that matches a color and return a color interpolator', () => {
      const pair = {
        from: { background: '#c86432bf' }, // rgba(200, 100, 50, 0.75)
        to: { background: '#64c84b' }, // rgba(100, 200, 75, 1)
      };
      const { interpolator } = (getInterpolatorForPair(pair) as unknown) as {
        interpolator: Interpolator<rgba, string>;
      };

      const result = interpolator({
        range: [100, 400],
        domain: [
          { r: 200, g: 100, b: 50, a: 0.75 },
          { r: 100, g: 200, b: 75, a: 1 },
        ],
        value: 175,
      });
      expect(result).toEqual('rgba(175, 125, 56, 0.8125)');
    });

    it('should infer a from / to pair of type string that matches a united number and return a unit interpolator', () => {
      const pair = {
        from: { left: '10px' },
        to: { left: '200px' },
      };
      const { interpolator } = (getInterpolatorForPair(pair) as unknown) as {
        interpolator: Interpolator<string, string>;
      };

      const result = interpolator({
        range: [100, 400],
        domain: ['10px', '200px'],
        value: 175,
      });
      expect(result).toEqual('57.5px');
    });

    it('should infer a from / to pair of type string that matches a transform and return a transform interpolator', () => {
      const pair = {
        from: { transform: 'rotate(20rad)' },
        to: { transform: 'rotate(50rad)' },
      };
      const { interpolator } = (getInterpolatorForPair(pair) as unknown) as {
        interpolator: Interpolator<string, string>;
      };

      const result = interpolator({
        range: [100, 400],
        domain: ['rotate(20rad)', 'rotate(50rad)'],
        value: 175,
      });
      expect(result).toEqual('rotate(27.5rad)');
    });

    it('should throw an error if attempting to animate two different properties', () => {
      const pair = {
        from: { left: '10px' },
        to: { right: '200px' },
      };
      const result = () =>
        (getInterpolatorForPair(pair) as unknown) as {
          interpolator: Interpolator<string, string>;
        };

      expect(result).toThrowError(
        'from and to are not the same property. fromProperty: left does not match toProperty: right.'
      );
    });

    it('should throw an error if attempting to animate values of different types', () => {
      const pair = {
        from: { left: '10px' },
        to: { left: 0 },
      };
      const result = () =>
        (getInterpolatorForPair(pair) as unknown) as {
          interpolator: Interpolator<string, string>;
        };

      expect(result).toThrowError(
        'from and to values have mismatching types. from type: string does not match to type: number.'
      );
    });
  });
});
