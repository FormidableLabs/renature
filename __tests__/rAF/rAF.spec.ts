import { rAF } from '../../src/rAF';

describe('rAF', () => {
  let mockFrameId = 0;
  const requestAnimationFrameMock: jest.SpyInstance<
    number,
    [FrameRequestCallback]
  > = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => {
    mockFrameId++;
    return mockFrameId;
  });

  afterEach(() => {
    mockFrameId = 0;
    requestAnimationFrameMock.mockClear();
  });

  it('should return a start and stop function for initiating and stopping the frame loop', () => {
    const { start, stop } = rAF();
    expect(typeof start).toBe('function');
    expect(typeof stop).toBe('function');
  });

  it('should execute an arbitrary listener function inside the frameloop', () => {
    const { start } = rAF();

    const listener = jest.fn();
    start(listener);

    expect(listener).toHaveBeenCalled();
  });

  it('should stop the frameloop when stop is called', () => {
    const cancelAnimationFrame = jest.spyOn(window, 'cancelAnimationFrame');

    const { start, stop } = rAF();

    const listener = jest.fn();
    start(listener);

    stop();

    expect(cancelAnimationFrame).toHaveBeenCalledWith(1);
  });
});
