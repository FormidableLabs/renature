import type { CSSProperties, RefObject } from 'react';

import type { vector as Vector } from '../core';
import type { entity as Entity } from '../forces';

interface MotionVectors {
  position: Vector<number>;
  velocity: Vector<number>;
  acceleration: Vector<number>;
}

export type VectorSetter = (motionVectors: MotionVectors) => void;

export type Listener = (
  timestamp: DOMHighResTimeStamp,
  lastFrame: DOMHighResTimeStamp,
  stop: () => void
) => void;

export interface Controller {
  start: () => void;
  stop: () => void;
  pause: () => void;
  set: (to: CSSProperties, i?: number) => void;
}

export interface AnimationParams {
  onUpdate: VectorSetter;
  onComplete: () => void;
}

type RepeatType = 'loop' | 'mirror';

export interface HooksParams {
  pause?: boolean;
  delay?: number;
  repeat?: number;
  repeatType?: RepeatType;
  onFrame?: (progress: number, motionVectors: MotionVectors) => void;
  onAnimationComplete?: () => void;
  disableHardwareAcceleration?: boolean;
  reducedMotion?: {
    from: CSSProperties;
    to: CSSProperties;
  };
}

export type PlayState = 'forward' | 'reverse';

export interface AnimatingElement<
  C,
  E extends HTMLElement | SVGElement | null = any
> {
  ref: RefObject<E>;
  config: C;
  onUpdate: VectorSetter;
  onComplete: (playState?: PlayState) => void;
  repeat?: number;
  repeatType?: RepeatType;
  delay?: number;
  pause?: boolean;
}

export interface StatefulAnimatingElement<
  C,
  E extends HTMLElement | SVGElement = any
> extends AnimatingElement<C, E> {
  state: {
    mover: Entity;
    attractor?: Entity;
    playState: PlayState;
    maxDistance: number;
    complete: boolean;
    paused: boolean;
    delayed: boolean;
    repeatCount: number;
  };
}

export interface AnimationCallbacks<C> {
  checkReversePlayState: (
    animatingElement: StatefulAnimatingElement<C>
  ) => void;
  applyForceForStep: (animatingElement: StatefulAnimatingElement<C>) => Entity;
  checkStoppingCondition: (
    animatingElement: StatefulAnimatingElement<C>
  ) => boolean;
}

export interface AnimationGroup<C, E extends HTMLElement | SVGElement = any> {
  elements: StatefulAnimatingElement<C, E>[];
  start: (c?: { isImperativeStart: boolean }) => void;
  pause: () => void;
  stop: () => void;
}

export type AnimationCache = Map<number, CSSProperties>;
