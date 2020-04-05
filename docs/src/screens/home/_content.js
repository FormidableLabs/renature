import React from 'react';

const content = {
  features: [
    {
      title: 'Declarative React hooks for animating with ease',
      description:
        'Tweak your physics parameters, set from and to values for your CSS properties, and let renature do the rest.',
      icon: require('../../assets/feature-1.svg'),
    },
    {
      title: 'Gravity, Friction, Fluid Resistance, and more',
      description:
        'Renature explores forces that other physics-based animation libraries typically leave out, giving your animations unique feeling and intuitive motion.',
      icon: require('../../assets/feature-2.svg'),
    },
    {
      title: 'An animation library for physics nerds',
      description:
        'Renature emphasizes mathematical precision and correctness, all backed by the type safety and speed of ReasonML.',
      icon: require('../../assets/feature-3.svg'),
    },
  ],
  getStarted: {
    description: (
      <p>
        Renature comes equipped with a lightweight set of production ready React
        hooks.
        <br />
        Dig into the documentation to start animating!
      </p>
    ),
    link: '/docs',
  },
  oss: [
    {
      title: 'Victory',
      description:
        'An ecosystem of modular data visualization components for React. Friendly and flexible.',
      logo: require('../../assets/badge_victory.svg'),
      link: 'https://formidable.com/open-source/victory',
    },
    {
      title: 'urql',
      description:
        'Universal React Query Library is a blazing-fast GraphQL client, exposed as a set of ReactJS components.',
      logo: require('../../assets/badge_urql.svg'),
      link: 'https://formidable.com/open-source/urql/',
    },
    {
      title: 'Spectacle',
      description:
        'A React.js based library for creating sleek presentations using JSX syntax that gives you the ability to live demo your code.',
      logo: require('../../assets/badge_spectacle.svg'),
      link: 'https://formidable.com/open-source/spectacle/',
    },
    {
      title: 'Runpkg',
      description:
        'The online package explorer. Runpkg turns any npm package into an interactive and informative browsing experience',
      logo: require('../../assets/badge_runpkg.svg'),
      link: 'https://www.runpkg.com/',
    },
  ],
};

export default content;
