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
        'Renature emphasizes mathematical precision and correctness, all backed by the type safety and speed of ReScript.',
      icon: require('../../assets/feature-3.svg'),
    },
  ],
  getStarted: {
    description: (
      <>
        Renature comes equipped with a lightweight set of production ready React
        hooks.
        <br />
        Dig into the documentation to start animating!
      </>
    ),
    link: '/docs',
  },
  oss: {
    cards: [
      {
        title: 'Victory',
        description:
          'An ecosystem of modular data visualization components for React. Friendly and flexible.',
        link: 'https://formidable.com/open-source/victory',
        featured: true,
      },
      {
        title: 'urql',
        description:
          'Universal React Query Library is a blazing-fast GraphQL client, exposed as a set of ReactJS components.',
        link: 'https://formidable.com/open-source/urql/',
        featured: true,
      },
      {
        title: 'Spectacle',
        description:
          'A React.js based library for creating sleek presentations using JSX syntax that gives you the ability to live demo your code.',
        link: 'https://formidable.com/open-source/spectacle/',
        featured: true,
      },
      {
        title: 'Runpkg',
        description:
          'The online package explorer. Runpkg turns any npm package into an interactive and informative browsing experience.',
        link: 'https://runpkg.com',
        abbreviation: 'Rp',
        color: '#80EAC7',
      },
    ],
    link: 'https://formidable.com/open-source/',
  },
};

export default content;
