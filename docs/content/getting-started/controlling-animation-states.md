---
title: Controlling Animation States
order: 2
---

## Controlling Animation States

In this section, we'll cover how to control animation states in `renature`. This includes starting, stopping, and delaying animations, as well as running them infinitely.

## The `Controller` API

By default, all animations in `renature` will run immediately when your component mounts. Often this may be exactly what you want – an element appears and starts moving! However, you can alter this behavior using `renature`'s `controller` API.

The `controller` is the second object returned by a `renature` hook, and comes with two methods, `start` and `stop`, for interacting with your animation's play state. If you want to start your animation in response to a user event, for example, you can call `controller.start`. Note that you'll need to combine this with `immediate: false` in your animation configuration.

```js live=true
import React from 'react';
import { useGravity } from 'renature';

function ControlledMover() {
  const [props, controller] = useGravity({
    from: {
      transform: 'rotate(0deg) scale(0)',
    },
    to: {
      transform: 'rotate(360deg) scale(1)',
    },
    config: {
      moverMass: 10000,
      attractorMass: 1000000000000,
      r: 7.5,
    },
    immediate: false, // Signal that the animation should not run on mount.
  });

  return (
    <div className="stack">
      <button className="button" onClick={controller.start}>
        Run The Animation!
      </button>
      <div className="mover" {...props} />
    </div>
  );
}
```

### Stopping Animations

By default, once the backing physics simulation has completed `renature` will stop your animation. However, there may be cases where you want to preemptively stop your animation in response to some user event or side effect. In those cases, you have two ways to stop your animations.

#### Stopping Animations Initiated on Mount

When an animation is initiated on mount (the default behavior) you can stop the animation using `controller.stop`. For example, if you only want your animation to run for 2 seconds before stopping, you could do the following.

```js live=true
import React from 'react';
import { useGravity } from 'renature';

function ControlledMover() {
  const [props, controller] = useGravity({
    from: {
      transform: 'rotate(0deg) scale(0)',
    },
    to: {
      transform: 'rotate(360deg) scale(1)',
    },
    config: {
      moverMass: 10000,
      attractorMass: 1000000000000,
      r: 7.5,
    },
  });

  React.useEffect(() => {
    setTimeout(controller.stop, 2000);
  }, [controller]);

  return <div className="mover" {...props} />;
}
```

You can of course call `controller.stop` in response to more than timers. Any time you want to stop your animations in response to an external event, like a user interaction or a change in a long-running subscription, you can use `controller.stop`.

#### Stopping Animations Initiated by `controller.start`

When you initiate your animation using `controller.start` rather than allowing the animation to run on mount, the `stop` function is returned by calling `controller.start`. For example:

```js
const { stop } = controller.start();
```

This ensures that the `stop` function corresponds precisely to a specific animation instance when using multiple animations. If we want to stop the current animation two seconds after a user initiates it with `controller.start`, we can do the following.

```js live=true
import React from 'react';
import { useGravity } from 'renature';

function ControlledMover() {
  const [props, controller] = useGravity({
    from: {
      transform: 'rotate(0deg) scale(0)',
    },
    to: {
      transform: 'rotate(360deg) scale(1)',
    },
    config: {
      moverMass: 10000,
      attractorMass: 1000000000000,
      r: 7.5,
    },
    immediate: false, // Signal that the animation should not run on mount.
  });

  const onClick = () => {
    // Obtain the stop function off of controller.start.
    const { stop } = controller.start();

    // Stop the animation after two seconds.
    setTimeout(() => {
      stop();
    }, 2000);
  };

  return (
    <div className="stack">
      <button className="button" onClick={onClick}>
        Run The Animation!
      </button>
      <div className="mover" {...props} />
    </div>
  );
}
```

### Delaying Animations

You can delay animations in `renature` by specifying the `delay` property in your animation configuration. `delay` expects a number in milliseconds and will start the animation once the specified `delay` has elapsed. For example, if you wanted your animation to run two seconds after your component has mounted:

```js live=true
import React from 'react';
import { useGravity } from 'renature';

function DelayedMover() {
  const [props] = useGravity({
    from: {
      transform: 'rotate(0deg) scale(0)',
    },
    to: {
      transform: 'rotate(360deg) scale(1)',
    },
    config: {
      moverMass: 10000,
      attractorMass: 1000000000000,
      r: 7.5,
    },
    delay: 2000, // Delay the animation by two seconds after mount.
  });

  return <div className="mover" {...props} />;
}
```

Currently, delaying animations in combination with `controller.start` is not supported. We're hoping to change this in a future version of `renature`.

### Running Animations Infinitely

Sometimes you want your animations to run infinitely, without stopping. You can do this with `renature` by applying `infinite` to your animation configuration. Of course, you can still use `controller.stop` to end the animation whenever you want to.

```js live=true
import React from 'react';
import { useGravity } from 'renature';

function InfiniteMover() {
  const [props] = useGravity({
    from: {
      transform: 'rotate(0deg) scale(0)',
    },
    to: {
      transform: 'rotate(360deg) scale(1)',
    },
    config: {
      moverMass: 10000,
      attractorMass: 1000000000000,
      r: 7.5,
    },
    infinite: true, // Specify that the animation should run infinitely.
  });

  return <div className="mover" {...props} />;
}
```

Infinite animations oscillate between your `from` and `to` states, creating a "yoyo" effect. They work by running the exact same underlying physics animation in a reversed direction.
