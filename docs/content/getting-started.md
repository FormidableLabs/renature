---
title: Getting Started
order: 0
---

<a name="getting-started"></a>

# Getting Started

[Installation](#installation)

[Using Your First Hook](#using-your-first-hook)

[Controlling Animation States](#controlling-animation-states)

<a name="installation"></a>

## Installation

To begin using `renature`, install it from the package manager of your choice:

```bash
npm install --save renature
# or
yarn add renature
```

Also make sure you install its `peerDependencies`, `react` and `react-dom`, if you haven't already. You'll need to use a hooks compatible version of `react` and `react-dom`, i.e. `>=16.8.0`.

```bash
npm install --save react react-dom
# or
yarn add react react-dom
```

That's it! You're now ready to use `renature`.

<a name="using-your-first-hook"></a>

## Using Your First Hook

Once you've installed `renature`, you can start off by `import`ing one of the hooks exposed by the library. Let's start off by using the `useFriction` hook.

```typescript
import React from 'react';
import { useFriction } from 'renature';

const MyAnimatingElement: React.FC = () => {
  const [props] = useFriction<HTMLDivElement>({
    from: {
      transform: 'translateX(0px)',
    },
    to: {
      transform: 'translateX(200px)',
    },
    config: {
      mu: 0.1,
      mass: 20,
      initialVelocity: 5,
    },
  });

  return <div {...props} />;
};
```

`useFriction`, like the others hooks in `renature`, expects a `from` and `to` configuration describing the CSS states you want to animate from and to. You can pass any known CSS property in here, and you can combine multiple properties in your animation.

The `config` object represents the parameters that can be used to tweak your physics simulations. These will vary from hook to hook depending on the force that you are using (i.e. gravity, friction, fluid resistance, etc).

### What is the props object returned by the hook?

The `props` object returned by the hooks in `renature` is just a mutable React `ref` object. We attach that `ref` using the object spread operator to your DOM node, which allows `renature` to update that node's `style` attribute during the course of the `requestAnimationFrame` loop. In this way, we can animate UI elements synchronously without re-rendering your entire component on every frame. This is a must to keep your animations performing at 60 frames per second, as tracking animation values in React state would be lead to too many enqueued re-renders.

<a name="controlling-animation-states"></a>

## Controlling Animation States

By default, all animations in `renature` will run immediately when the associated component mounts. However, you can alter this behavior using `renature`'s `controller` API.

The `controller` is the second object returned by a `renature` hook, and comes with two methods, `start` and `stop`, for interacting with your animation's play state. If you want to start your animation in response to an event, for example, you can call `controller.start`. Note that you'll need to combine this with `immediate: false` in your animation configuration.

```typescript
import React from 'react';
import { useGravity } from 'renature';

const MyAnimatingElement: React.FC = () => {
  const [props, controller] = useGravity<HTMLDivElement>({
    from: {
      transform: 'rotate(0deg) scale(0)',
    },
    to: {
      transform: 'rotate(720deg) scale(2)',
    },
    config: {
      moverMass: 10000,
      attractorMass: 1000000000,
      r: 75,
    },
    immediate: false // Signal that the animation should not run on mount.
  });

  return (
    <>
      /* Call controller.start when a user clicks on a button. */
      <button onClick={controller.start}>Run The Animation!</button>
      <div {...props}>
    </>
  )
};
```

### Stopping Animations

By default, once the backing physics simulation has completed `renature` will stop your animation. However, there may be cases where you want to preemptively stop your animation in response to some user event or side effect. In those cases, you can access `controller.stop`.

```typescript
import React from 'react';
import { useGravity } from 'renature';

const MyAnimatingElement: React.FC = () => {
  const [props, controller] = useGravity<HTMLDivElement>({
    from: {
      transform: 'rotate(0deg) scale(0)',
    },
    to: {
      transform: 'rotate(720deg) scale(2)',
    },
    config: {
      moverMass: 10000,
      attractorMass: 1000000000,
      r: 75,
    },
  });

  React.useEffect(() => {
    someSubscription.subscribe((message) => {
      if (message.done) {
        // Stop the animation in response to a side effect or state change.
        controller.stop();
      }
    });

    return () => someSubscription.unsubscribe();
  }, [controller]);

  return <div {...props}>;
};
```

### Delaying Animations

You can also delay animations in `renature` by specifying the `delay` property in your animation configuration. `delay` expects a number in milliseconds and will start the animation once the specified `delay` has elapsed. For example, if you wanted your animation to run two seconds after your component has mounted:

```typescript
import React from 'react';
import { useGravity } from 'renature';

const MyAnimatingElement: React.FC = () => {
  const [props] = useGravity<HTMLDivElement>({
    from: {
      transform: 'rotate(0deg) scale(0)',
    },
    to: {
      transform: 'rotate(720deg) scale(2)',
    },
    config: {
      moverMass: 10000,
      attractorMass: 1000000000,
      r: 75,
    },
    delay: 2000, // Wait 2s before starting the animation.
  });

  return <div {...props} />;
};
```

### Running Animations Infinitely

Sometimes you want your animations to run infinitely, without stopping. You can do this with `renature` by applying `infinite` to your animation configuration. Of course, you can still use `controller.stop` to end the animation whenever you want to.

```typescript
import React from 'react';
import { useGravity } from 'renature';

const MyAnimatingElement: React.FC = () => {
  const [props, conntroller] = useGravity<HTMLDivElement>({
    from: {
      transform: 'rotate(0deg) scale(0)',
    },
    to: {
      transform: 'rotate(720deg) scale(2)',
    },
    config: {
      moverMass: 10000,
      attractorMass: 1000000000,
      r: 75,
    },
    infinite: true, // Run the animation infinitely.
  });

  // Use controller.stop to stop your animation whenever you want to.
  React.useEffect(() => {
    if (someStoppingConditionMet) {
      controller.stop();
    }
  }, [controller]);

  return <div {...props} />;
};
```
