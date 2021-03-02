---
title: Controlling Animation States
order: 3
---

## Controlling Animation States

In this section, we'll cover how to control animation states in `renature`. This includes starting, stopping, and delaying animations, as well as running them infinitely or a pre-specified number of iterations.

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
    <div className="lp__stack">
      <button className="lp__button lp__button--lg" onClick={controller.start}>
        Start
      </button>
      <div className="lp__m lp__m--lg" {...props} />
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
    repeat: Infinity,
  });

  return (
    <div className="lp__stack-h">
      <div className="lp__stack">
        <button
          className="lp__button lp__button--lg"
          onClick={controller.start}
        >
          Start
        </button>
        <button
          className="lp__button lp__button--lg"
          onClick={controller.pause}
        >
          Pause
        </button>
      </div>
      <div className="lp__m lp__m--lg" {...props} />
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
    repeat: Infinity,
  });

  return (
    <div className="lp__stack">
      <button className="lp__button lp__button--lg" onClick={controller.stop}>
        Stop
      </button>
      <div className="lp__m lp__m--lg" {...props} />
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
  const [nodes, controller] = useGravityGroup(3, (i) => ({
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
    repeat: Infinity,
  }));

  return (
    <div className="lp__stack-h">
      {nodes.map((props) => (
        <div className="lp__m lp__m--lg" {...props} />
      ))}
    </div>
  );
}
```

### Running Animations Infinitely

Sometimes you want your animations to run infinitely, without stopping. You can do this with `renature` by applying `repeat: Infinity` to your animation configuration. Of course, you can still use `controller.stop` to end the animation whenever you want to.

```js live=true
import React from 'react';
import { useFrictionGroup } from 'renature';

function InfiniteMover() {
  const getRandomHex = () =>
    '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');

  const [nodes] = useFrictionGroup(3, (i) => ({
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
    repeat: Infinity, // Specify that the animation should run infinitely.
    delay: i * 500,
  }));

  return (
    <div className="lp__stack-h">
      {nodes.map((props) => (
        <div className="lp__m lp__m--lg" {...props} />
      ))}
    </div>
  );
}
```

Infinite animations oscillate between your `from` and `to` states, creating a "yoyo" effect. They work by running the exact same underlying physics animation in a reversed direction.

### Running Animations a Specific Number of Times

`renature` also allows you to run an animation a specific number of times. To do this, specify a concrete number greater than 0 for the `repeat` parameter. For example:

```js live=true
import React from 'react';
import { useFrictionGroup } from 'renature';

function InfiniteMover() {
  const getRandomHex = () =>
    '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');

  const [nodes] = useFrictionGroup(3, (i) => ({
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
    repeat: 3, // Specify that the animation should repeat three times after the first run.
    delay: i * 500,
  }));

  return (
    <div className="lp__stack-h">
      {nodes.map((props) => (
        <div className="lp__m lp__m--lg" {...props} />
      ))}
    </div>
  );
}
```

The number specified in `repeat` determines how many times the animation runs **in addition to** the initial run. For example, the above animation runs as follows:

1. Animates from the `from` configuration to the `to` configuration (initial run).
2. Continually reverses `from` and `to` for the next three iterations, as specified by `repeat`.
3. Comes to a stop.

This behavior is quite useful when you want an animation to continue for a specific number of iterations and come to a neat stop. You can preemptively stop the animation using `controller.stop`.

### Setting Animations to Arbitrary States

While `renature` emphasizes declarative paradigms for updating animation state, sometimes you want an imperative escape hatch to animate directly to a new CSS state. For these cases, you can use the `controller.set` API.

`controller.set` accepts a `to` style object representing the styles you want your object to animate to. `renature` handles deriving the current state of your animating element and smoothly interpolating to the new values.

```js live=true
import React from 'react';
import { useFriction } from 'renature';

function Mover() {
  const [props, controller] = useFriction({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      mu: 0.5,
      mass: 300,
      initialVelocity: 10,
    },
  });

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      controller.set({
        transform: `translateX(${
          Math.floor(Math.random() * 300) * (Math.random() > 0.5 ? 1 : -1)
        }px
          rotate(${Math.random() * 360}deg)
          scale(${Math.random()})
        `,
        opacity: Math.random(),
      });
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [controller]);

  return <div className="lp__m lp__m--lg" {...props} />;
}
```

### Setting a Single Node to An Arbitrary State

If you're using grouped animations, you can pass a second argument, `i` to `controller.set` to only animate the nth element in a group. For example:

```js live=true
import React from 'react';
import { useFrictionGroup } from 'renature';

function App() {
  const [nodes, controller] = useFrictionGroup(3, (i) => ({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      mu: 0.5,
      mass: 300,
      initialVelocity: 10,
    },
    delay: i * 500,
  }));

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      controller.set(
        {
          transform: `translateX(${
            Math.floor(Math.random() * 300) * (Math.random() > 0.5 ? 1 : -1)
          }px rotate(${Math.random() * 360}deg) scale(${Math.random()})`,
          opacity: Math.random(),
        },
        1
      );
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [controller]);

  return (
    <div className="lp__stack-h">
      {nodes.map((props) => (
        <div className="lp__m lp__m--lg" {...props} />
      ))}
    </div>
  );
}
```
