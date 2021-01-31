---
title: Your First Animation
order: 1
---

## Your First Animation

Once you've installed `renature`, you can start off by importing one of the hooks exposed by the library. Let's start off by using the `useFriction` hook.

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
    config: {
      mu: 0.2,
      mass: 20,
      initialVelocity: 5,
    },
    infinite: true,
  });

  return <div className="lp__m lp__m--lg" {...props} />;
}
```

`useFriction`, like the others hooks in `renature`, expects a `from` and `to` configuration describing the CSS states you want to animate from and to. These are objects with an arbitrary number of key-value pairs of CSS properties, just like you'd pass to an element's `style` property in React.

The `config` object represents the parameters that can be used to tweak your physics simulations. You can see the full variety of config options in the [API reference](../api.md#config); these will vary from hook to hook depending on the force that you are using. The best way to see what these parameters do is to play with them in our live code blocks (like the one above 👆). You can read more about `renature`'s physics simulations in the [Core Concepts](../core-concepts.md) section.

### Animating Multiple Properties

With `renature`, you can animate as many CSS properties as you like at once! You can also specify multiple values for complex properties like `transform` and `box-shadow`, and `renature` will interpolate each of them automatically for you ✨. Let's look at an example.

```js live=true
import React from 'react';
import { useFriction } from 'renature';

function MoverMultiple() {
  const [props] = useFriction({
    from: {
      transform: 'scale(0) rotate(0deg)',
      background: 'orange',
      borderRadius: '0%',
    },
    to: {
      transform: 'scale(2) rotate(360deg)',
      background: 'steelblue',
      borderRadius: '50%',
    },
    config: {
      mu: 0.2,
      mass: 20,
      initialVelocity: 5,
    },
    infinite: true,
  });

  return <div className="lp__m lp__m--lg" {...props} />;
}
```

In general, you always want to specify a matching `to` value for any property specified in `from`; not doing so will result in the property not being animated. In future versions of `renature` we may provide safe defaults for unspecified `from` and `to` properties.
