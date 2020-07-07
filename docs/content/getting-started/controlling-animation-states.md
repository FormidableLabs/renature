---
title: Controlling Animation States
order: 2
---

## Controlling Animation States

In this section, we'll cover how to control animation states in `renature`. This includes starting, stopping, and delaying animations, as well as running them infinitely.

## The `Controller` API

By default, all animations in `renature` are declarative and will run immediately when your component mounts. Often this may be exactly what you want – an element appears and starts moving! However, you can alter this behavior using `renature`'s `controller` API.

The `controller` is the second object returned by a `renature` hook, and comes with two methods, `start` and `stop`, for interacting with your animation's play state. If you want to start your animation in response to a user event, for example, you can call `controller.start`. Note that you'll need to combine this with `pause: true` in your animation configuration to prevent the animation from immediately running on mount.

```js live=true
import React from 'react';
import { useGravity } from 'renature';

function ControlledMover() {
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
        Run The Animation!
      </button>
      <div className="live-preview__mover live-preview__mover--lg" {...props} />
    </div>
  );
}
```

### Stopping Animations

Once the backing physics simulation powering your animation has completed, `renature` will stop the `requestAnimationFrame` loop and leave your element in the state specified by the `to` parameter. However, there may be cases where you want to preemptively stop or pause your animation in response to some user event or side effect. In those cases, you can use `controller.stop`.

For example, if you only want your animation to run for 2 seconds after mounting before stopping, you could do the following.

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

  return (
    <div className="live-preview__mover live-preview__mover--lg" {...props} />
  );
}
```

You can of course call `controller.stop` in response to more than timers. Any time you want to stop your animations in response to an external event, like a user interaction or a change in a long-running subscription, you can use `controller.stop`.

`controller.start` and `controller.stop` will continue to work for the lifecycle of the animation, until the `to` state has been reached. In this way, they double as `resume` and `pause` functions. Read more about this behavior in the [Pausing and Resuming Animations](#pausing-and-resuming-animations) section below.

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

  return (
    <div className="live-preview__mover live-preview__mover--lg" {...props} />
  );
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

  return (
    <div className="live-preview__mover live-preview__mover--lg" {...props} />
  );
}
```

Infinite animations oscillate between your `from` and `to` states, creating a "yoyo" effect. They work by running the exact same underlying physics animation in a reversed direction.

### Pausing and Resuming Animations

If you want to pause and resume animations in relation to external events, `renature` allows for that as well using the same functions above from the Controller API, i.e. `controller.start` and `controller.stop`.

```js live=true
import React from 'react';
import { useGravity } from 'renature';

function InfiniteMover() {
  const [props, controller] = useGravity({
    from: {
      transform: 'rotate(0deg) scale(1)',
      opacity: 1,
    },
    to: {
      transform: 'rotate(360deg) scale(0)',
      opacity: 0,
    },
    config: {
      moverMass: 10000,
      attractorMass: 1000000000000,
      r: 7.5,
    },
    infinite: true,
  });

  return (
    <div className="live-preview__stack">
      <div className="live-preview__stack-h">
        <button
          onClick={controller.start}
          className="live-preview__button live-preview__button--lg"
        >
          Resume
        </button>
        <button
          onClick={controller.stop}
          className="live-preview__button live-preview__button--lg"
        >
          Pause
        </button>
      </div>
      <div className="live-preview__mover live-preview__mover--lg" {...props} />
    </div>
  );
}
```
