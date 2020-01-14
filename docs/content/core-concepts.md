---
title: Core Concepts
order: 1
---

<a name="core-concepts"></a>

# Core Concepts

<a name="vectors"></a>

## Vectors

`renature` uses two-dimensional vectors as the core data type for running our physics simulations. [Vectors](https://natureofcode.com/book/chapter-1-vectors/) are mathematical objects that have both magnitude and direction, and are typically represented in two dimensions using a directed line.

<img src="/static/pngs/vector.png" style="height: 10rem;" />

When modeling real-world motion in two dimensions, vectors are particularly useful. We can use vectors to represent where an object is in space (which we call `position` in `renature`), how fast an object is moving through space (`velocity`), and the rate of change of its speed (`acceleration`). `renature` tracks all of these vectors in animation state when running our physics simulations to keep track of how objects move over time.

We use [ReasonML](https://reasonml.github.io/) to model vectors in `renature`, using a data structure called a [tuple](https://reasonml.github.io/docs/en/tuple).

```reason
/* A moving object located at x: 5m, y: 10m in our coordinate system. */
let position = (5., 10.);

/* An object moving at -0.5m/s in the x direction and 2m/s in the y direction. */
let velocity = (-0.5, 2.);

/* An object decelerating at -0.1 m/s^2 in the x direction and 0.005 m/s^2 in the y direction. */
let acceleration = (-0.1, 0.005);
```

Forces can be modeled as vectors as well. Forces have a magnitude (how strong is the force) and a direction (in what direction is the force acting).

```reason
let force = (-5., -2.);
```

With this information in hand, we can determine how applying a force onto a moving object will alter the moving object's `acceleration`, `velocity`, and `position` vectors. To do that, we use the following equations from Newtonian physics.

**Force equals mass times acceleration.**

<img src="/static/pngs/force_equation.png" class="equation" style="height: 0.8em;"><br />

**Therefore, acceleration equals force divided by mass.**

<img src="/static/pngs/acceleration_equation.png" class="equation" style="height: 2.3em;"><br />

**The velocity of an object is equal to its current velocity plus acceleration times time.**

<img src="/static/pngs/velocity_equation.png" class="equation" style="height: 1em;"><br />

**The position, or displacement, of an object is equal to its current position plus velocity times time.**

<img src="/static/pngs/position_equation.png" class="equation" style="height: 1.3em;">

With just these laws, we can build a comprehensive model of motion in two dimensions. To learn more, check out Daniel Shiffman's excellent writing on [Vectors](https://natureofcode.com/book/chapter-1-vectors/).

<a name="from-to-style-animations">

## From / To Style Animations

`renature`'s core hooks, like `useGravity`, `useFriction`, and `useFluidResistance`, operate on the notion of animating **from** a specific CSS state (i.e. `opacity: 0`) **to** a new CSS state (i.e. `opacity: 1`). In this way, the API is quite similar to [`react-spring`](https://www.react-spring.io/) and even traditional CSS transitions. The difference is in the physics we use to determine how you get from one state to another.

Each force in `renature` has its own character and produces its own style of motion; depending on the effect you're trying to achieve, one force might be better suited for your needs than another. However, every force uses the same notion of a `mover` object (the object experiencing the force in our simulation) and a `force` vector. By applying the `force` vector to the `mover` object, we can determine the `position` of the mover at the current time.

We then determine where this `position` lies along the whole trajectory of the moving object's path (see how we determine this path in the [Simulate](#Simulate) section below). Is the mover halfway to its target destination? Two thirds of the way? This information helps us to determine what percentage "done" the animation is. It's almost like a physics-based version of a [tween](https://inventingwithmonster.io/20190304-how-to-write-a-tween/).

Finally, we use a technique called [linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation) to map this progress to your CSS state. For example, if the `mover` is halfway along its total trajectory, and you're animating from `opacity: 0` to `opacity: 1`, we know that the current `opacity` in this particular frame should be `0.5`. Check out the diagrams below to see a visual representation of the connections between our simulation and interpolation steps.

## The Lifecycle of an Animation

The lifecycle of an animation in `renature` can be thought of using a model we call **Simulate -> Interpolate -> Animate**. We discuss these phases in detail below.

### Simulate

The first step in a `renature` animation is to start the backing physics simulation in the `requestAnimationFrame` loop. This is what allows us to expose our `mover` object to the selected `force` vector. We then observe the changing `position` of the `mover` object over time as the `force` acts on it.

To track the `position` of the mover we use a standard Cartesian coordinate system, with the mover always beginning at the origin (0, 0). We also determine, before the animation ever runs, the ending position for the `mover`. This ending position varies force by force, and is based off a particular physics condition achieved by our simulations.

### The Gravity Simulation

For gravity, the backing simulation involves a `mover` object being pulled towards an `attractor` object. The `mover` object is assumed to start at rest, gradually accelerating as it gets pulled towards the `attractor`. To simplify the simulation, we only apply the gravitational force of the `attractor` on the `mover`. Once the `mover` has reached the `attractor`, we end the simulation and stop the animation. At this point, your animating element will have reached the `to` CSS state specified in your configuration.

<img src="/static/pngs/gravity_simulation.png" />

### The Friction Simulation

For `useFriction`, the backing simulation involves a `mover` object sliding across a rough surface. The `mover` object is assumed to have an initial velocity, provided by the user configuration. We also account for the strength of the normal force in this simulation using the acceleration of gravity at Earth's surface (roughly 9.80665 m/s²). Once the `mover` has come to rest on the surface (achieved `velocity` (0, 0)), we end the simulation and stop the animation. We use a variant of the [kinematic equations](https://www.khanacademy.org/science/physics/one-dimensional-motion/kinematic-formulas/a/what-are-the-kinematic-formulas) to derive the `position` at which the `mover` will come to rest.

<img src="/static/pngs/kinematic_equation.png" style="height: 10rem;" />

At this point, your animating element will have reached the `to` CSS state specified in your configuration.

<img src="/static/pngs/friction_simulation.png" />

### The Fluid Resistance Simulation

For `useFluidResistance`, the backing simulation involves dropping the `mover` object from rest into a fluid of density ρ. The `mover` object experiences the force of gravity acting at the Earth's surface in one direction and the force of drag in the other.
