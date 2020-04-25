# CHANGELOG

All notable changes to this project will be documented in this file. If a change is missing an attribution, it may have been made by a Core Contributor.

- Critical bugfixes or breaking changes are marked using a warning symbol: ⚠️
- Significant new features or enhancements are marked using the sparkles symbol: ✨

The format is based on Keep a Changelog.

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
