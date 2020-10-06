import Document from './src/html';
import constants from './src/constants';
import { samples } from './src/screens/gallery/samples';

const basePath = 'open-source/renature';

export default {
  paths: {
    src: 'src',
    dist: `dist/${basePath}`,
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
    'react-static-plugin-styled-components',
    'react-static-plugin-sitemap',
    'react-static-plugin-react-router',
  ],
  basePath,
  stagingBasePath: basePath,
  devBasePath: basePath,
  Document,
  getSiteData: () => ({
    title: constants.title,
  }),
  getRoutes: async () => [
    {
      path: '/',
      template: require.resolve('./src/screens/home'),
    },
    {
      path: '/gallery',
      template: require.resolve('./src/screens/gallery'),
      children: samples('gallery').map((sample) => ({
        path: `${sample.slug}`,
        template: require.resolve('./src/screens/gallery/sample'),
        getData: async () => sample,
      })),
    },
    {
      path: '404',
      template: require.resolve('./src/screens/404'),
    },
  ],
};
