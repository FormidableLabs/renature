---
title: Core Concepts
order: 2
---

# Core Concepts

In this section, we'll discuss some of the core concepts behind `renature`, including some of the fundmental mathematics that power the library. While it isn't necessary to understand these concepts to use `renature`, it can give you a better understanding of why your animations behave the way they do. It'll also help you gain context on the library if you decide you'd like to contribute – and we hope you will!

## Sections

The Core Concepts section of the docs is split into the following sections:

- [**Vectors**](./vectors.md) – Learn what vectors are and how we model them in `renature`.
- [**From – To Style Animations**](./from-to-style-animations.md) – The basic hooks in `renature` animate between a `from` and `to` state. Learn how `renature` maps values from an underlying physics simulation to CSS values based on the supplied `from` and `to` states.
- [**The Lifecycle of an Animation**](./the-lifecycle-of-an-animation.md) – `renature` animations have a three stage lifecycle – **Simulate**, **Interpolate**, **Animate**. Learn about each of these lifecycles to better control your animations.
