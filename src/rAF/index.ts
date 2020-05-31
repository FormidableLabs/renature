import { Listener } from '../animation';

interface RAFState {
  lastFrame: DOMHighResTimeStamp;
  animationFrameId: number | null;
  listener: Listener;
}

export const rAF = () => {
  const state: RAFState = {
    lastFrame: typeof window !== 'undefined' ? performance.now() : Date.now(),
    animationFrameId: null,
    listener: ((() => {}) as unknown) as RAFState['listener'],
  };

  const stop = () => {
    state.animationFrameId !== null &&
      cancelAnimationFrame(state.animationFrameId);
  };

  const draw = (timestamp: DOMHighResTimeStamp) => {
    state.animationFrameId = requestAnimationFrame(timestamp => {
      draw(timestamp);
    });

    state.listener(timestamp, state.lastFrame, stop);
    state.lastFrame = timestamp;
  };

  const start = (listener: RAFState['listener']) => {
    state.listener = listener;
    draw(state.lastFrame);
  };

  return {
    start,
    stop,
  };
};
