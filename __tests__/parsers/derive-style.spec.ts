import { deriveStyle } from '../../src/parsers';

describe('deriveStyle', () => {
  it('should derive the style of an animating element from its style property (number)', () => {
    const el = document.createElement('div');
    el.style.opacity = '0.5';

    const { from } = deriveStyle(el, { opacity: 1 });

    expect(from).toEqual({ opacity: 0.5 });
  });

  it('should derive the style of an animating element from its style property (string)', () => {
    const el = document.createElement('div');
    el.style.width = '25rem';

    const { from } = deriveStyle(el, { width: '12.5rem' });

    expect(from).toEqual({ width: '25rem' });
  });

  it('should use the computed style of an animating element no style can be found on the style property (number)', () => {
    const el = document.createElement('div');

    const getPropertyValueMock = jest.fn();
    const getComputedStyleSpy = jest
      .spyOn(window, 'getComputedStyle')
      .mockImplementation(
        () =>
          (({
            getPropertyValue: getPropertyValueMock,
          } as unknown) as CSSStyleDeclaration)
      );

    deriveStyle(el, { opacity: 0 });

    expect(getComputedStyleSpy).toHaveBeenCalledWith(el);
    expect(getPropertyValueMock).toHaveBeenCalledWith('opacity');
  });

  it('should build a transfrom with animatable none values to match to values', () => {
    const el = document.createElement('div');

    const { from } = deriveStyle(el, {
      transform: 'rotate(360deg) scale(1.5) perspective(200px)',
    });

    expect(from).toEqual({
      transform: 'rotate(0deg) scale(1) perspective(0px)',
    });
  });

  it('should merge currently applied transforms into the from value', () => {
    const el = document.createElement('div');
    el.style.transform = 'translateX(100px)';

    const { from } = deriveStyle(el, {
      transform: 'rotate(360deg) scale(1.5) perspective(200px)',
    });

    expect(from).toEqual({
      transform: 'translateX(100px) rotate(0deg) scale(1) perspective(0px)',
    });
  });

  it('should build a transform with animatable none values to match from values', () => {
    const el = document.createElement('div');
    el.style.transform = 'translateX(100px) skewY(1rad)';

    const { from, to } = deriveStyle(el, {
      transform: 'rotate(360deg) scale(1.5) perspective(200px)',
    });

    expect(from).toEqual({
      transform:
        'translateX(100px) skewY(1rad) rotate(0deg) scale(1) perspective(0px)',
    });
    expect(to).toEqual({
      transform:
        'rotate(360deg) scale(1.5) perspective(200px) translateX(0px) skewY(0rad)',
    });
  });
});
