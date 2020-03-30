import Document from './src/html';
import constants from './src/constants';

const isStaging = process.env.REACT_STATIC_STAGING === 'true';
const landerBasePath = 'open-source/renature';

export default {
  getSiteData: () => {
    return {
      title: constants.title,
    };
  },
  paths: {
    root: process.cwd(), // The root of your project. Don't change this unless you know what you're doing.
    src: 'src', // The source directory. Must include an index.js entry file.
    // See app.js for how stage is used to make client-side routing resolve correctly by stage.
    dist: isStaging ? `dist/${landerBasePath}` : 'dist', // The production output directory.
    buildArtifacts: 'node_modules/.cache/react-static/artifacts/',
    devDist: 'node_modules/.cache/react-static/dist/',
    temp: 'node_modules/.cache/react-static/temp/',
    public: 'public', // The public directory (files copied to dist during build)
  },
  plugins: [
    [
      'react-static-plugin-md-pages',
      {
        location: './content',
        template: './src/screens/docs',
        pathPrefix: 'docs',
      },
    ],
    'react-static-plugin-react-router',
    'react-static-plugin-sitemap',
    'react-static-plugin-styled-components',
  ],
  basePath: landerBasePath,
  stagingBasePath: landerBasePath,
  devBasePath: '',
  getRoutes: async () => {
    return [
      {
        path: '/',
        template: 'src/screens/home',
      },
    ];
  },
  Document,
};
