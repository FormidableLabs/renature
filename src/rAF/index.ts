import { Entity } from "../forces/Force.gen";

interface RAFState {
  lastFrame: DOMHighResTimeStamp;
  animationFrameId: number | null;
  listener: (
    timestamp: DOMHighResTimeStamp,
    lastFrame: DOMHighResTimeStamp,
    mover: Entity
  ) => Entity;
  mover: Entity;
}

export const rAF = () => {
  const state: RAFState = {
    lastFrame: performance.now(),
    animationFrameId: null,
    listener: ((() => {}) as unknown) as RAFState["listener"],
    mover: {
      mass: 0,
      acceleration: [0, 0],
      velocity: [0, 0],
      position: [0, 0]
    }
  };

  const start = (listener: RAFState["listener"]) => {
    state.listener = listener;
    draw(state.lastFrame);
  };

  const draw = (timestamp: DOMHighResTimeStamp) => {
    state.mover = state.listener(timestamp, state.lastFrame, state.mover);
    console.log(state.mover);
    state.lastFrame = timestamp;
    state.animationFrameId = requestAnimationFrame(timestamp => {
      draw(timestamp);
    });
  };

  const stop = () => {
    state.animationFrameId !== null &&
      cancelAnimationFrame(state.animationFrameId);
  };

  return {
    start,
    stop
  };
};
