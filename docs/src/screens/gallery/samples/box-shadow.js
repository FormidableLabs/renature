const code = (context) => `
import React from "react";
import { useFriction } from "renature";

function BoxShadow() {
  const [props] = useFriction({
    from: {
      boxShadow: "-1rem 1rem teal, 1rem -1rem #f2cf63",
      transform: "translate(-2rem, -2rem)"
    },
    to: {
      boxShadow: "1rem -1rem orange, -1rem 1rem #f25050",
      transform: "translate(2rem, 2rem)"
    },
    config: {
      mu: 0.4,
      mass: 25,
      initialVelocity: 10
    },
    infinite: true
  });

  return (
    <div
      className="live-preview__mover ${
        context === 'gallery-preview'
          ? 'live-preview__mover--sm'
          : 'live-preview__mover--lg'
      }"
    {...props} />
  );
}
`;

export const boxShadow = (context) => ({
  title: 'Box Shadow',
  slug: 'box-shadow/',
  code: code(context),
});
