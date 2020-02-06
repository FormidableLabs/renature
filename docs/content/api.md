---
title: API
order: 3
---

<a name="api"></a>

# API

This document contains all information on `renature`'s public facing API.

<a name="hooks"></a>

## Hooks

`renature`'s hooks form the core of the API. Every hook in `renature` takes the same set of parameters, although the physics `config` options depend on the specific force being used.

## Shared Parameters

| Property    | Type                                        | Description                                                                                                                                                                             |
| ----------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `from`      | `{ [key: keyof React.CSSProperties]: any }` | The CSS property or properties you're animating **from**. Accepts an arbitrary number of key-value pairs.                                                                               |
| `to`        | `{ [key: keyof React.CSSProperties]: any }` | The CSS property or properties you're animating **to**. Accepts an arbitrary number of key-value pairs.                                                                                 |
| `config`    | `object`                                    | The physics parameters used to model the selected force. This varies from force to force. See [Config](#Config) below for specific force paramters.                                     |
| `immediate` | `boolean?`                                  | Optional. Instructs `renature` to run the animation on mount. If `false`, the animation will not run until `controller.start` is called. Defaults to `true`.                            |
| `delay`     | `number?`                                   | Optional. Instructs `renature` to delay the start of the animation by the provided number of milliseconds. Defaults to `undefined`.                                                     |
| `infinite`  | `boolean?`                                  | Optional. Instructs `renature` to restart the animation in the reverse direction when the animation completes in the forward direction, producing a "yoyo" effect. Defaults to `false`. |

## Config

Each hook in `renature` accepts a `config` object for tweaking the physics parameters of the underlying simulation. These vary force by force.

### useGravity Config

The force of gravity is modeled using Newton's Law of Universal Gravitation. We use the real value of **G**, the Universal Gravitational Constant, approximated to 6.67428 x 10^-11.

<img src="/pngs/gravity_equation.png" alt="Newton's Law of Universal Gravitation" style="height: 6rem;" />

The physics parameters used to tweak the `useGravity` animation include the following:

| Property        | Type     | Description                                                                                                                                                                                   |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `moverMass`     | `number` | The mass of the moving body (`mover`) in our simulation. Typically you want this to be the smaller of the two masses, otherwise your animation may never complete. Provided in unit kg.       |
| `attractorMass` | `number` | The mass of the attracting body (`attractor`) in our simulation. Typically you want this to be the larger of the two masses, such that the `mover` is pulled towards it. Provided in unit kg. |
| `r`             | `number` | The initial distance between the `mover` and the `attractor`. Provided in unit m.                                                                                                             |

The animation will continue to run until the `mover` in the physics simulation has reached the position of the `attractor`.

<img src="/pngs/gravity_animation.png" alt="The useGravity animation in renature." style="margin: 5rem 0;" />

#### Example

```playground
function GravityBasic() {
  const [props] = useGravity({
    from: { opacity: 0.25 },
    to: { opacity: 1 },
    config: {
      moverMass: 10000,
      attractorMass: 1000000000000,
      r: 10,
    },
  });

  return <div className="mover" {...props} />;
};
```

### useFriction Config

The force of friction is modeled using the standard equation for friction.

<img src="/pngs/friction_equation.png" alt="Standard Equation of Friction" style="height: 3rem;" />

The physics parameters used to tweak the `useFriction` animation include the following:

| Property          | Type     | Description                                                                                                                                                                                                        |
| ----------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mu`              | `number` | The coefficient of kinetic friction. This is a unitless scalar value, and typically falls (though it does not have to) within the range [0, 1].                                                                    |
| `mass`            | `number` | The mass of the moving body (`mover`) in our simulation. This is used to calculate the magnitude of the normal force, **N**, using the acceleration due to gravity at Earth's surface, **g**. Provided in unit kg. |
| `initialVelocity` | `number` | The initial velocity of the `mover` on the rough surface in our simulation. Provided in unit m/s.                                                                                                                  |

The animation will continue to run until the `mover` in the physics simulation has come to rest (reached a velocity of 0). This means that animations will run slower as the value of `initialVelocity` increases, because a moving object with a higher initial velocity will take longer to come to rest. Inversely, animations with higher values of `mu` and `mass` will run faster, because a moving object will come to rest more quickly if it is traveling over a rougher surface or is heavier.

<img src="/pngs/friction_animation.png" alt="The useFriction animation in renature." style="margin: 5rem 0;" />

#### Example

```typescript
const [props] = useFriction<HTMLDivElement>({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(180deg)',
  },
  config: {
    mu: 0.5,
    mass: 300,
    initialVelocity: 10,
  },
});

return <div {...props} />;
```

### useFluidResistance Config

The force of fluid resistance, or the drag force, is modeled using the standard drag equation.

<img src="/pngs/drag_equation.png" alt="Standard Drag Equation" style="height: 6rem;" />

The physics paramters used to tweak the `useFluidResistance` animation include the following:

| Property | Type       | Description                                                                                                                                                                                  |
| -------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rho`    | `number`   | The density of the fluid the moving body (`mover`) is traveling through. Provided in unit kg/m³.                                                                                             |
| `mass`   | `number`   | The mass of the `mover` in our simulation. This is used to calculate the gravitational force vector, using the acceleration due to gravity at Earth's surface, **g**. Provided in unit kg.   |
| `area`   | `number`   | The frontal area of the `mover` in our simulation. Provided in unit m².                                                                                                                      |
| `cDrag`  | `number`   | The coefficient of drag. This is a unitless scalar value, and typically falls (though it does not have to) within the range [0, 1].                                                          |
| `settle` | `boolean?` | Optional. Instructs `renature` to apply a "settling" or "bouncing" effect when the `mover` reaches terminal velocity, as though the `mover` has collided with a surface. Default to `false`. |

The animation will continue to run until the `mover` in the physics simulation has achieved [terminal velocity](https://en.wikipedia.org/wiki/Terminal_velocity), the velocity at which the force of gravity and the drag force are equivalent. Increasing the `mass` will make the animation run slower, since heavier objects will take a longer time to reach terminal velocity. Increasing `rho`, `area`, or `cDrag` will all make the animation run faster, since they increase the magnitude of the drag force and bring the `mover` to terminal velocity more rapidly.

<img src="/pngs/fluid_resistance_animation.png" alt="The useFluidResistance animation in renature." style="margin: 5rem 0;" />

#### Example

```typescript
export const FluidResistanceBasic: React.FC = () => {
  const [props] = useFluidResistance<HTMLDivElement>({
    from: {
      transform: 'scale(0.5)',
    },
    to: {
      transform: 'scale(1.5)',
    },
    config: {
      mass: 25,
      rho: 10,
      area: 20,
      cDrag: 0.1,
      settle: true,
    },
  });

  return <div {...props} />;
};
```

### Working in Two Dimensions

Since everything in `renature` is modeled using two dimensional vectors, the library already comes equipped with the physics it needs to simulate two-dimensional motion. In this way, `renature`'s two-dimensional hooks are more like a small physics drawing engine, allowing you to achieve something simple that you might otherwise do in [p5.js](https://p5js.org/).

Currently, `renature` only supports a single two-dimensional hook – `useGravity2D`. `useGravity2D` is great for producing two-dimensional gravity simulations, using the same `mover` and `attractor` model as `useGravity`. You can find its API below. In the near future we hope to support `useFriction` and `useFluidResistance` in two dimensions.

### useGravity2D Config

The same equation used to calculate the force of gravity in `useGravity` is also used in `useGravity2D`. However, in `useGravity2D` you have a few more parameters to finely tune the simulation.

| Property               | Type                            | Description                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `moverMass`            | `number`                        | The mass of the moving body (`mover`) in our simulation. Provided in unit kg.                                                                                                                                                                                                                                                                                                                        |
| `attractorMass`        | `number`                        | The mass of the attracting body (`attractor`) in our simulation. Typically you want this to be the larger of the two masses, such that the `mover` is pulled towards it. Provided in unit kg.                                                                                                                                                                                                        |
| `initialMoverPosition` | `[number, number]?`             | Optional. A vector describing the (x, y) location of the `mover` at the start of the animation, in reference to the origin (upper left corner of the containing element). Defaults to [0, 0].                                                                                                                                                                                                        |
| `attractorPosition`    | `[number, number]`              | A vector describing the (x, y) location of the `attractor` at the start of the animation, in reference to the origin (upper left corner of the containing element).                                                                                                                                                                                                                                  |
| `initialMoverVelocity` | `[number, number]?`             | Optional. A vector describing the initial velocity of the `mover` in the x and y directions. Defaults to [0, 0].                                                                                                                                                                                                                                                                                     |
| `threshold`            | `{ min: number, max: number }?` | Optional. A special object that helps to limit the magnitude of an applied gravitational force. If the `mover` gets closer than `min` m to the `attractor`, a force correspoding to strength at `min` is applied. If the `mover` gets farther than `max` m from the `attractor`, a force corresponding to strength at `max` is applied. Useful for ensuring your `mover` doesn't fly off into space! |
| `timeScale`            | `number`                        | Optional. Speeds up or slows down the time frame of your animation. By default, all force calculations use seconds as the base time unit. If you want to speed up (`timeScale` > 1) or slow down (`timeScale` < 1) your animation, you can use `timeScale` to do so.                                                                                                                                 |

### Example

```typescript
const [props] = useGravity2D({
  config: {
    attractorMass: 1000000000000,
    moverMass: 10000,
    attractorPosition: [400, 400],
    initialMoverPosition: [400, 200],
    initialMoverVelocity: [100, 0],
    threshold: {
      min: 20,
      max: 100,
    },
    timeScale: number('timeScale', 10),
  },
});
```

## Controller

Every hook in `renature` also returns a special object called a `controller`. You can access the `controller` in the second position of the tuple returned by any `renature` hook.

```typescript
const [props, controller] = useGravity2D({ ...config });
```

A `controller` provides access to two functions, `start` and `stop`, which allow you to control when your animation begins and ends. They have the following types:

| Property | Type         | Description                                                                                                                                                           |
| -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `start`  | `() => void` | A function instructing the animation to start the frame loop and begin animating. Typically used in conjunction with `immediate: false`.                              |
| `stop`   | `() => void` | A function instructing the animation to stop the frame loop. The animating element will stay in whatever CSS state it had achieved when `controller.stop` was called. |

See our [Getting Started guide](https://github.com/FormidableLabs/renature/blob/master/docs/content/getting-started.md#controlling-animation-states) for more examples of starting and stopping animations according to events or effects.
