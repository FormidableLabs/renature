# Development

Thanks for contributing! We want to ensure that `renature` remains useful and fun
for the entire community while holding to its core tenets of type-safety, speed,
and mathematical correctness at the forefront. We're grateful you want to help!

## How to contribute?

We follow fairly standard but lenient rules around pull requests and issues.
Please pick a title that describes your change briefly, in the imperative
mood if possible.

If you have an idea for a feature or want to fix a bug, consider opening an issue
first. We're also happy to discuss and help you open a PR and get your changes
in!

## How do I set up the project?

After cloning the repo, install dependencies using yarn.
Please don't use `npm` to respect the lockfile.

```sh
yarn
```

`renature` is implemented in a combination of ReScript and TypeScript. To compile
the ReScript source to JavaScript, run:

```sh
yarn build:res

# Or, to watch for changes and immediately rebuild.
yarn start:res
```

To clean the ReScript build and remove all JS artifacts:

```sh
yarn clean:res
```

Once you've built the ReScript source, you can run Storybook to open up an interactive playground
for developing features on `renature`. Simply run:

```sh
yarn storybook
```

## How do I test my changes?

It's always good practice to run the tests when making changes.
It might also make sense to add more tests when you're adding features
or fixing a bug, but we'll help you in the pull request, if necessary.

```sh
yarn test            # Single pass
yarn test --watch    # Watched
```

## How do I lint my code?

We ensure consistency in `renature`'s codebase using [`typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint) and `prettier`.
You can run:

```sh
yarn lint
```

to lint your code and:

```sh
yarn format
```

to run `prettier`.

If you have them set up in your editor, even better!

## How do I publish a new version?

If you're a core contributor or maintainer this will certainly come
up once in a while.

First, please update the [CHANGELOG](/CHANGELOG.md) with release notes
on the new version.

Next, make sure you create a new version. The following commands
bump the version in the `package.json`, create a commit,
and tag the commit on git:

```sh
yarn version --[major|minor|patch]
```

There's a `preversion` hook in place that'll clean and build
`renature` automatically.

Next, run `npm publish --dry-run` to check the output.

Then run `npm publish` (`npm` is recommended here, not `yarn`)

```sh
npm publish
```

Don't forget to push afterwards:

```sh
git push && git push --tags
```
