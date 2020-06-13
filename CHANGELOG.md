# CHANGELOG

All notable changes to this project will be documented in this file. If a change is missing an attribution, it may have been made by a Core Contributor.

- Critical bugfixes or breaking changes are marked using a warning symbol: ⚠️
- Significant new features or enhancements are marked using the sparkles symbol: ✨

The format is based on Keep a Changelog.

## v0.4.1

In this release, we expose the `onFrame` and `onAnimationComplete` APIs for the `useGravity` hook. These were accidentally missed in the v0.4.0 release 😱.

### Fixed

- Ensure `onFrame` and `onAnimationComplete` supplied to `useGravity` are picked up and applied in the lifecycle of an animation. PR by @parkerziegler [here](https://github.com/FormidableLabs/renature/pull/67).

[Diff](https://github.com/FormidableLabs/renature/compare/v0.4.0...v0.4.1)

## v0.4.0

In this release, we add a few new APIs to `renature` to fix some pain points identified by community members. The most notable of these are `onFrame` and `onAnimationComplete` callbacks that can be provided to `renature` hooks.

⚠️ **There are also some breaking changes in this release.** ⚠️ See more details below on how to safely migrate your code.

### Added

- An `onFrame` callback can now be provided to `renature` hooks, which allows you to execute some logic on each call to `requestAnimationFrame`. The callback is handed a single argument, `progress`, which is a number between 0 and 1 representing your progress from the `from` state to the `to` state. PR by @parkerziegler [here](https://github.com/FormidableLabs/renature/pull/60).
- An `onAnimationComplete` callback can now be provided to `renature` hooks, which allows you to execute logic when an animation ends. This behaves similarly to adding a listener on the DOM's [native `animationend` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/animationend_event). If a `renature` animation is stopped or unmounted before it has completed, this ca llback will _not_ be executed. PR by @parkerziegler [here](https://github.com/FormidableLabs/renature/pull/60).
- Default configs have been added for all hooks. You'll now get a default physics config loaded if you don't specify a `config` field on your hook! PR by @parkerziegler [here](https://github.com/FormidableLabs/renature/pull/62).

### Changed

- **Breaking Change** `controller.stop` is now the canonical way to stop or pause a `renature` animation. Previously, if you started an animation by calling `controller.start`, you could only stop or pause it by accessing a returned stop function.

```js
const { stop } = controller.start();
```

Now, you can just call `controller.stop()`. This codifies and simplifies the API – when you want to imperatively start / resume an animation, use `controller.start`. When you want to stop or pause an animation, whether it was initiated on mount or by `controller.start`, just use `controller.stop`. PR by @parkerziegler [here](https://github.com/FormidableLabs/renature/pull/62).

- **Breaking Change** The `immediate` flag was renamed to `pause` and the logic behind it is now inverted. If `pause` is set to `true`, the animation will not start running until `controller.start` has been called or if the component re-renders and `pause` evaluates to `false`. PR by @parkerziegler [here](https://github.com/FormidableLabs/renature/pull/62).

[Diff](https://github.com/FormidableLabs/renature/compare/v0.3.0...v0.4.0)

## v0.3.0

In this release, we add support for using `renature` in Node.js environments for server-side rendering. Previously, using `renature` in server-rendered React applications would result in a runtime error.

### Fixed

- Fallback to `Date.now` in lieu of `performance.now` in Node.js environments when tracking frame timestamps in `rAF`. PR by @parkerziegler [here](https://github.com/FormidableLabs/renature/pull/54).

[Diff](https://github.com/FormidableLabs/renature/compare/v0.2.1...v0.3.0)

## v0.2.1

In this release, we allow users to supply their own value for `G`, the Universal Gravitational Constant, in the configuration of `useGravity` and `useGraviyt2D` hooks. This allows users to achieve similar animation effects without needing to provide extremely large mass values for the `mover` and `attractor`.

### Added

- A user-configurable `G` parameter for the `useGravity` and `useGravity2D` hooks. PR by @parkerziegler [here](https://github.com/FormidableLabs/renature/pull/50).

[Diff](https://github.com/FormidableLabs/renature/compare/v0.2.0...v0.2.1)

## v0.2.0

In this release, we added type support for animating SVG elements, normalize our parser and interpolator structure, and include better support complex CSS properties like `transform` and `box-shadow`. We also released a new iteration of our docs site on `react-static` v7 – live [here](https://formidable.com/open-source/renature).

### Added

- Type support for SVG elements. PR by @parkerziegler [here](https://github.com/FormidableLabs/renature/pull/37).
- Add support for `box-shadow` as an animatable CSS property. PR by @parkerziegler [here](https://github.com/FormidableLabs/renature/pull/41).

### Fixed

- Normalize parser and interpolator structure and move them to separate directories. PR by @parkerziegler [here](https://github.com/FormidableLabs/renature/pull/42).
- Improvements to our docs site and a migration to `react-static` v7. PR by @parkerziegler [here](https://github.com/FormidableLabs/renature/pull/46).

[Diff](https://github.com/FormidableLabs/renature/compare/v0.1.0...v0.2.0)

## v0.1.0

This release represents the first publish of `renature`!
