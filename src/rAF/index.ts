interface RAFState {
  lastFrame: DOMHighResTimeStamp;
  animationFrameId: number | null;
  listener: (
    timestamp: DOMHighResTimeStamp,
    lastFrame: DOMHighResTimeStamp,
    stop: () => void
  ) => void;
}

export const rAF = () => {
  const state: RAFState = {
    lastFrame: performance.now(),
    animationFrameId: null,
    listener: ((() => {}) as unknown) as RAFState["listener"]
  };

  const start = (listener: RAFState["listener"]) => {
    state.listener = listener;
    draw(state.lastFrame);

    return { stop };
  };

  const draw = (timestamp: DOMHighResTimeStamp) => {
    state.animationFrameId = requestAnimationFrame(timestamp => {
      draw(timestamp);
    });

    state.listener(timestamp, state.lastFrame, stop);
    state.lastFrame = timestamp;
  };

  const stop = () => {
    state.animationFrameId !== null &&
      cancelAnimationFrame(state.animationFrameId);
  };

  return {
    start
  };
};
