---
title: Accessible Animations
order: 4
---

## Accessible Animations

Accessibility is vitally important to all aspects of web development and animation is no exception! To support accessible animations, `renature` provides a first-class API to define how an animation should run if an end user prefers reduced motion (i.e. has the [`prefers-reduced-motion: reduce` CSS media feature enabled](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) at the operating system or browser level).

### The `reducedMotion` Parameter

When you write your `renature` hook, you can specify a `reducedMotion` object as part of the hook's configuration. `reducedMotion` is an object containing `from` and `to` properties, which represent the states to animate from and to when a user prefers reduced motion. Note that these properties will be used instead of the top-level `from` and `to` to perform the animation.

To give you a sense of what this looks like, enable reduced motion in your accessibility settings and see how the example below changes:

```js live=true
import React from 'react';
import { useFriction } from 'renature';

function Mover() {
  const [props] = useFriction({
    from: {
      transform: 'translateX(-100px)',
    },
    to: {
      transform: 'translateX(100px)',
    },
    reducedMotion: {
      from: {
        opacity: 1,
      },
      to: {
        opacity: 0,
      },
    },
    config: {
      mu: 0.5,
      mass: 30,
      initialVelocity: 5,
    },
    repeat: Infinity,
  });

  return <div className="lp__m lp__m--lg" {...props} />;
}
```

You'll notice that rather than animating the `transform` property, `renature` animates the `opacity` property. You could, of course, specify a different `from` and `to` configuration inside of the `reducedMotion` parameter. Just be mindful that this will be the configuration `renature` will use to animate elements for users who prefer _reduced motion_.

`renature` will also set up an event listener to detect changes in the end user's reduced motion preference. If a user changes this preference while an animation is executing, `renature` will immediately switch the `from` / `to` configuration it uses to match this preference. Taking the example above, if a user switches their reduced motion preference to `reduce` while the animating element is part way through the `transform` animation, `renature` will immediately stop animating `transform` and start the `opacity` animation from the `from` state (`opacity: 1`). Likewise, if a user then switches their reduced motion preference to `no-preference`, the `transform` animation will start from the beginning.

For more information on accessible animations and reduced motion, check out [Section 2.3 of the WCAG guidelines](https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold).

### Accessibility by Default

`renature` takes the philosophy that animations should be accessible by default rather than by opting in. What does this mean for you users?

If your end user prefers reduced motion and you've specified a `reducedMotion` configuration, your animation will run using the `reducedMotion` configuration, as expetced. But if you haven't added a `reducedMotion` configuration to your hook, `renature` will immediately set the animating element to the `to` state. This would be similar to setting [`immediate: true` on a `useSpring` hook](https://www.react-spring.io/docs/hooks/api) in [`react-spring`](https://www.react-spring.io/). This ensures that a user who prefers reduced motion isn't subjected to an animation that could potentially have adverse effects.

We encourage you to _always_ specify a `reducedMotion` configuration for your `renature` hooks. To read more about the inspiration for this philosophy, check out [Josh Comeau's excellent writing on his `prefersReducedMotion` hook](https://www.joshwcomeau.com/react/prefers-reduced-motion/).

### `usePrefersReducedMotion`

Internally, `renature` uses the `usePrefersReducedMotion` hook to determine whether or not an end user prefers reduced motion. We also expose this hook as part of `renature`'s public API so that you can use it to make additional accessibility decisions in a way that works best for your end users. For example, if you want to use the [`controller.set` API](./controlling-animation-states.md#setting-animations-to-arbitrary-states) but conditionally set your animating element to a different state based on whether or not your end user prefers reduced motion, you could do the following.

```js live=true
import React from 'react';
import { useFriction, usePrefersReducedMotion } from 'renature';

function Mover() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [props, controller] = useFriction({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    reducedMotion: {
      from: {
        background: 'orange',
      },
      to: {
        background: 'steelblue',
      },
    },
    config: {
      mu: 0.5,
      mass: 300,
      initialVelocity: 10,
    },
  });

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const target = prefersReducedMotion
        ? { opacity: Math.random() }
        : {
            transform: `translateX(${
              Math.floor(Math.random() * 300) * (Math.random() > 0.5 ? 1 : -1)
            }px
              rotate(${Math.random() * 360}deg)
              scale(${Math.random()})
            `,
          };

      controller.set(target);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [controller, prefersReducedMotion]);

  return <div className="lp__m lp__m--lg" {...props} />;
}
```

You can even use this hook for code unrelated to a `renature` hook! Anywhere you need to fork logic based on whether or not your end users prefers reduced motion, `usePrefersReducedMotion` has you covered!
