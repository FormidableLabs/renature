import { gravity, vector } from "../src";

const el = document.createElement("div");
document.body.appendChild(el);

const positionAttractor = [500, 500] as vector<number>;
const attractorEl = document.createElement("div");
document.body.appendChild(attractorEl);

el.style.height = "10px";
el.style.width = "10px";
el.style.borderRadius = "50%";
el.style.background = "steelblue";

attractorEl.style.height = "25px";
attractorEl.style.width = "25px";
attractorEl.style.borderRadius = "50%";
attractorEl.style.background = "orange";
attractorEl.style.left = `${positionAttractor[0]}px`;
attractorEl.style.top = `${positionAttractor[1]}px`;
attractorEl.style.position = "absolute";

const [stop] = gravity({
  config: {
    moverMass: 2000,
    attractorMass: 100000000,
    attractor: positionAttractor,
    threshold: {
      min: 10,
      max: 750
    }
  },
  onUpdate: ({ position: [x, y] }) => {
    el.style.transform = `translate(${x}px, ${y}px)`;
  }
});
