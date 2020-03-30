---
title: FAQ
order: 3
---

## Frequently Asked Questions

This page covers some commonly asked questions when getting going with `renature`. Don't see your question here? Open an issue on GitHub and we'll add it!

### What is the props object returned by the hook?

The `props` object returned by the hooks in `renature` is just a mutable React `ref` object. We attach that `ref` using the object spread operator to your DOM node, which allows `renature` to update that node's `style` attribute during the course of the `requestAnimationFrame` loop. In this way, we can animate UI elements synchronously without re-rendering your entire component on every frame. This is a must to keep your animations performing at 60 frames per second, as tracking animation values in React state would be lead to too many enqueued re-renders.

### When do my animations run?

By default, animations in `renature` run immediately when your component mounts. This is often expected and desirable behavior – an element appears and starts moving right away. However, you have full control over when and how you want your animations to run. To learn more, read up on `renature`'s [`controller` API](./controlling-animation-states#the-controller-api).

### What CSS properties are supported?

`renature` supports the vast majority of CSS properties, including complex properties like `transform` and `box-shadow`, colors represented in hexadecimal, `rgba`, `hsla`, and CSS colors names, and SVG properties like `stroke-dasharray` and `stroke-dashoffset`. Trying to animate something and it doesn't seem supported? Please open an issue! We'd love to ensure we're supporting the full spectrum of animatable CSS properties!
