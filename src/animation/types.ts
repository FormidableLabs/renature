import type { CSSProperties, RefObject } from 'react';

import type { vector as Vector } from '../core';
import type { entity as Entity } from '../forces';

export type VectorSetter = (values: {
  position: Vector<number>;
  velocity?: Vector<number>;
}) => void;

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

export interface HooksParams {
  pause?: boolean;
  delay?: number;
  repeat?: number;
  onFrame?: (progress: number) => void;
  onAnimationComplete?: () => void;
  disableHardwareAcceleration?: boolean;
}

export enum PlayState {
  Forward = 'forward',
  Reverse = 'reverse',
}

export interface AnimatingElement<
  C,
  E extends HTMLElement | SVGElement | null = any
> {
  ref: RefObject<E>;
  config: C;
  onUpdate: VectorSetter;
  onComplete: (playState?: PlayState) => void;
  repeat?: number;
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
