---
title: Grouped Animations
order: 2
---

## Grouped Animations

Often, you may want to animate more than one element at a time and orchestrate these elements according to some external user actions or effects. To support these use cases, `renature` has first-class support for _grouped animations_.

You can create a grouped animation in `renature` using one of the `use<Force>Group` hooks. Let's look at an example using `useGravityGroup`.

```js live=true
import React from 'react';
import { useGravityGroup } from 'renature';

function GravityGroup() {
  const [nodes] = useGravityGroup(3, (i) => ({
    from: {
      transform: 'translateY(0px)',
      opacity: 1,
      borderRadius: '10%',
    },
    to: {
      transform: 'translateY(50px)',
      opacity: 0,
      borderRadius: '50%',
    },
    delay: i * 1000,
    repeat: Infinity,
  }));

  return (
    <div className="lp__stack-h">
      {nodes.map((props, i) => (
        <div className="lp__m lp__m--lg" key={i} {...props} />
      ))}
    </div>
  );
}
```

### Use Different Configurations for Elements in a Group

You'll notice that `use<Force>Group` hooks take a function as their second parameter, passing along the index of each animating element as the argument to this function. This allows you to control the state of each animating element independently of its siblings. `renature` will batch all updates on multiple elements into a single frame update, so this stays performant even as the number of animating elements grows.

```js live=true
import React from 'react';
import { useFrictionGroup } from 'renature';

function FrictionGroup() {
  const getConfigForIndex = (i) => {
    switch (i) {
      case 0:
        return {
          from: {
            transform: 'rotate(0deg) translate(0px, 0px)',
          },
          to: {
            transform: 'rotate(360deg) translate(-50px, -50px)',
          },
        };
      case 1:
        return {
          from: {
            boxShadow: '-1rem 1rem teal, 1rem -1rem #f2cf63',
          },
          to: {
            boxShadow: '1rem -1rem orange, -1rem 1rem #f25050',
          },
        };
      case 2:
        return {
          from: {
            opacity: 1,
            background: 'purple',
          },
          to: {
            opacity: 0,
            background: 'magenta',
          },
        };
      default:
        return {
          from: {},
          to: {},
        };
    }
  };

  const [nodes] = useFrictionGroup(3, (i) => ({
    ...getConfigForIndex(i),
    repeat: Infinity,
  }));

  return (
    <div className="lp__stack-h">
      {nodes.map((props, i) => (
        <div className="lp__m lp__m--lg" key={i} {...props} />
      ))}
    </div>
  );
}
```
