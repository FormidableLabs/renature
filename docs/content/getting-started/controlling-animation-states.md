---
title: Controlling Animation States
order: 2
---

## Controlling Animation States

In this section, we'll cover how to control animation states in `renature`. This includes starting, stopping, and delaying animations, as well as running them infinitely.

## The `Controller` API

By default, all animations in `renature` are declarative and will run immediately when your component mounts. Often this may be exactly what you want – an element appears and starts moving! However, you can alter this behavior using `renature`'s `controller` API.

The `controller` is the second object returned by a `renature` hook, and comes with three methods, `start`, `pause`, and `stop`, for interacting with your animation's play state.

### Starting Animations

If you want to start your animation in response to a user event, for example, you can call `controller.start`. Note that you'll need to combine this with `pause: true` in your animation configuration to prevent the animation from immediately running on mount.

```js live=true
import React from 'react';
import { useGravity } from 'renature';

function StartAnimation() {
  const [props, controller] = useGravity({
    from: {
      transform: 'rotate(0deg) scale(1)',
    },
    to: {
      transform: 'rotate(360deg) scale(0)',
    },
    config: {
      moverMass: 10000,
      attractorMass: 1000000000000,
      r: 7.5,
    },
    pause: true, // Signal that the animation should not run on mount.
  });

  return (
    <div className="live-preview__stack">
      <button
        className="live-preview__button live-preview__button--lg"
        onClick={controller.start}
      >
        Start
      </button>
      <div className="live-preview__mover live-preview__mover--lg" {...props} />
    </div>
  );
}
```

### Pausing Animations

Occasionally, you may want to have the ability to pause an existing animation, especially if the animation is running infinitely or needs to be conditionally stopped and restarted. For these cases, `controller.pause` is a great fit. `controller.pause` will stop the frame loop but **preserve animation state**. This means that you can resume an animation at any time using `controller.start`.

```js live=true
import React from 'react';
import { useFriction } from 'renature';

function PauseAnimation() {
  const [props, controller] = useFriction({
    from: {
      transform: 'rotate(0deg) scale(1)',
    },
    to: {
      transform: 'rotate(360deg) scale(0)',
    },
    pause: true, // Signal that the animation should not run on mount.
    infinite: true,
  });

  return (
    <div className="live-preview__stack-h">
      <div className="live-preview__stack">
        <button
          className="live-preview__button live-preview__button--lg"
          onClick={controller.start}
        >
          Start
        </button>
        <button
          className="live-preview__button live-preview__button--lg"
          onClick={controller.pause}
        >
          Pause
        </button>
      </div>
      <div className="live-preview__mover live-preview__mover--lg" {...props} />
    </div>
  );
}
```

### Stopping Animations

Once the backing physics simulation powering your animation has completed, `renature` will stop the `requestAnimationFrame` loop and leave your element in the state specified by the `to` parameter. However, there may be cases where you want to preemptively stop your animation in response to some user event or side effect. In those cases, you can use `controller.stop`. `controller.stop`, unlike `controller.pause`, will destroy animation state; use it when you're sure you want your animation to end.

```js live=true
import React from 'react';
import { useFluidResistance } from 'renature';

function StopAnimation() {
  const [props, controller] = useFluidResistance({
    from: {
      transform: 'rotate(0deg) scale(0)',
    },
    to: {
      transform: 'rotate(360deg) scale(1)',
    },
    infinite: true,
  });

  return (
    <div className="live-preview__stack">
      <button
        className="live-preview__button live-preview__button--lg"
        onClick={controller.stop}
      >
        Stop
      </button>
      <div className="live-preview__mover live-preview__mover--lg" {...props} />
    </div>
  );
}
```

You can of course call `controller.stop` in response to more than timers. Any time you want to stop your animations in response to an external event, like a user interaction or a change in a long-running subscription, you can use `controller.stop`.

### Delaying Animations

You can delay animations in `renature` by specifying the `delay` property in your animation configuration. `delay` expects a number in milliseconds and will start the animation once the specified `delay` has elapsed. This is most commonly used for [**grouped animations**](../api.md#grouped-animations) where you want to stagger children animating by a certain time offset.

```js live=true
import React from 'react';
import { useGravityGroup } from 'renature';

function DelayedMover() {
  const [nodes, controller] = useGravityGroup(3, i => ({
    from: {
      transform: 'rotate(0deg) scale(1)',
    },
    to: {
      transform: 'rotate(360deg) scale(0)',
    },
    config: {
      moverMass: 10000,
      attractorMass: 1000000000000,
      r: 7.5,
    },
    delay: i * 500,
    infinite: true,
  }));

  return (
    <div className="live-preview__stack-h">
      {nodes.map(props => (
        <div
          className="live-preview__mover live-preview__mover--lg"
          {...props}
        />
      ))}
    </div>
  );
}
```

### Running Animations Infinitely

Sometimes you want your animations to run infinitely, without stopping. You can do this with `renature` by applying `infinite` to your animation configuration. Of course, you can still use `controller.stop` to end the animation whenever you want to.

```js live=true
import React from 'react';
import { useFrictionGroup } from 'renature';

function InfiniteMover() {
  const getRandomHex = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  const [nodes] = useFrictionGroup(3, i => ({
    from: {
      transform: 'translateX(0px)',
      background: getRandomHex(),
      borderRadius: `${Math.floor(Math.random() * 100)}%`,
    },
    to: {
      transform: 'translateX(50px)',
      background: getRandomHex(),
      borderRadius: `${Math.floor(Math.random() * 100)}%`,
    },
    infinite: true, // Specify that the animation should run infinitely.
    delay: i * 500,
  }));

  return (
    <div className="live-preview__stack-h">
      {nodes.map(props => (
        <div
          className="live-preview__mover live-preview__mover--lg"
          {...props}
        />
      ))}
    </div>
  );
}
```

Infinite animations oscillate between your `from` and `to` states, creating a "yoyo" effect. They work by running the exact same underlying physics animation in a reversed direction.
