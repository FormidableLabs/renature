import { getInterpolatorsForPairs } from '../../src/parsers';

describe('pairs', () => {
  describe('getInterpolatorsForPairs', () => {
    it('should infer a from / to pair of type number and return a numeric interpolator', () => {
      const pairs = {
        from: { opacity: 0 },
        to: { opacity: 1 },
      };

      const [{ interpolator }] = getInterpolatorsForPairs(pairs);

      const result = interpolator({
        range: [100, 400],
        domain: [pairs.from.opacity, pairs.to.opacity],
        value: 175,
      });
      expect(result).toEqual(0.25);
    });

    it('should infer a from / to pair of type string that matches a color and return a color interpolator', () => {
      const pairs = {
        from: { background: '#c86432bf' }, // rgba(200, 100, 50, 0.75)
        to: { background: '#64c84b' }, // rgba(100, 200, 75, 1)
      };
      const [{ interpolator }] = getInterpolatorsForPairs(pairs);

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
      const pairs = {
        from: { left: '10px' },
        to: { left: '200px' },
      };

      const [{ interpolator }] = getInterpolatorsForPairs(pairs);

      const result = interpolator({
        range: [100, 400],
        domain: [pairs.from.left, pairs.to.left],
        value: 175,
      });
      expect(result).toEqual('57.5px');
    });

    it('should infer a from / to pair of type string that matches a transform and return a transform interpolator', () => {
      const pairs = {
        from: { transform: 'rotate(20rad)' },
        to: { transform: 'rotate(50rad)' },
        disableHardwareAcceleration: true,
      };
      const [{ interpolator }] = getInterpolatorsForPairs(pairs);

      const result = interpolator({
        range: [100, 400],
        domain: [pairs.from.transform, pairs.to.transform],
        value: 175,
      });
      expect(result).toEqual('rotate(27.5rad)');
    });

    it('should infer a from / to pair of type string that matches a box-shadow and return a box-shadow interpolator', () => {
      const pairs = {
        from: { boxShadow: '10px 10px 10px rgba(0, 0, 0, 1)' },
        to: { boxShadow: '30px 20px rgba(100, 200, 160, 0)' },
      };
      const [{ interpolator }] = getInterpolatorsForPairs(pairs);

      const result = interpolator({
        range: [100, 400],
        domain: [pairs.from.boxShadow, pairs.to.boxShadow],
        value: 175,
      });
      expect(result).toEqual('15px 12.5px 7.5px 0px rgba(25, 50, 40, 0.75)');
    });

    it('should throw an error if attempting to animate two different properties', () => {
      const pairs = {
        from: { left: '10px' },
        to: { right: '200px' },
      };

      expect(() => getInterpolatorsForPairs(pairs)).toThrowError(
        'Could not find a to value for from property: left.'
      );
    });

    it('should throw an error if attempting to animate values of different types', () => {
      const pairs = {
        from: { left: '10px' },
        to: { left: 0 },
      };

      expect(() => getInterpolatorsForPairs(pairs)).toThrowError(
        'from and to values have mismatching types. from type: string does not match to type: number.'
      );
    });

    it('should throw an error if it cannot parse the passed in values', () => {
      const pairs = {
        from: { transform: 'try to parse this' },
        to: { transform: 'if you can' },
      };

      expect(() => getInterpolatorsForPairs(pairs)).toThrowError(
        "Unable to parse configuration from: 'try to parse this' or to: 'if you can'"
      );
    });

    it('should append translateZ(0) to a transform animation', () => {
      const pairs = {
        from: { transform: 'rotate(20rad)' },
        to: { transform: 'rotate(50rad)' },
        disableHardwareAcceleration: true,
      };
      const [{ interpolator, values }] = getInterpolatorsForPairs(pairs);

      expect(values).toEqual({
        from: 'rotate(20rad) translateZ(0)',
        to: 'rotate(50rad) translateZ(0)',
      });

      const result = interpolator({
        range: [100, 400],
        domain: [values.from, values.to],
        value: 175,
      });
      expect(result).toEqual('rotate(27.5rad) translateZ(0)');
    });

    it('should not append translateZ(0) to a transform animation if translateZ is already being animated', () => {
      const pairs = {
        from: { transform: 'rotate(20rad) translateZ(0rem)' },
        to: { transform: 'rotate(50rad) translateZ(10rem)' },
        disableHardwareAcceleration: true,
      };
      const [{ interpolator, values }] = getInterpolatorsForPairs(pairs);

      expect(values).toEqual({
        from: 'rotate(20rad) translateZ(0rem)',
        to: 'rotate(50rad) translateZ(10rem)',
      });

      const result = interpolator({
        range: [100, 400],
        domain: [values.from, values.to],
        value: 175,
      });
      expect(result).toEqual('rotate(27.5rad) translateZ(2.5rem)');
    });

    it('should get a set of interpolators for many from / to pairs', () => {
      const pairs = {
        from: { opacity: 0, transform: 'translateX(10px)' },
        to: { opacity: 1, transform: 'translateX(20px)' },
      };
      const [
        { interpolator: opacityInterpolator },
        { interpolator: transformInterpolator },
      ] = getInterpolatorsForPairs(pairs);

      const opacityResult = opacityInterpolator({
        range: [100, 400],
        domain: [pairs.from.opacity, pairs.to.opacity],
        value: 175,
      });
      expect(opacityResult).toEqual(0.25);

      const transformResult = transformInterpolator({
        range: [100, 400],
        domain: [pairs.from.transform, pairs.to.transform],
        value: 175,
      });

      expect(transformResult).toEqual('translateX(12.5px)');
    });
  });
});
