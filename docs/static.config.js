import Document from './src/html';
import constants from './src/constants';
import { getSidebarItems } from './static-config-helpers/md-data-transforms';

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
    devDist: 'tmp/dev-server', // The development scratch directory.
    public: 'public', // The public directory (files copied to dist during build)
  },
  plugins: [
    'react-static-plugin-react-router',
    'react-static-plugin-sitemap',
    'react-static-plugin-styled-components',
  ],
  basePath: landerBasePath,
  stagingBasePath: landerBasePath,
  devBasePath: '',
  getRoutes: async () => {
    const sidebarItems = await getSidebarItems();
    const sidebarHeaders = sidebarItems.map(d => ({
      title: d.title,
      path: `/${d.slug}/`,
      slug: d.slug,
    }));

    return [
      {
        path: '/',
        template: 'src/screens/home',
      },
      {
        path: '/docs',
        template: 'src/screens/docs',
        getData: () => ({
          title: `${constants.title} | Documentation`,
          markdown: sidebarItems[0].markdown,
          renderedMd: sidebarItems[0].content,
          sidebarHeaders,
          tocArray: sidebarItems[0].data.subHeadings.map(sh => ({
            content: sh.value,
            level: sh.depth,
          })),
        }),
        // move slug + path to data in transform, renderedMd to data, and nuke markdown prop
        children: sidebarItems.map(
          ({ slug, path, markdown, content, data }) => ({
            path,
            template: 'src/screens/docs',
            getData: () => ({
              title: data.title,
              markdown,
              path: `/${slug}/`,
              renderedMd: content,
              sidebarHeaders,
              tocArray: data.subHeadings.map(sh => ({
                content: sh.value,
                level: sh.depth,
              })),
            }),
          })
        ),
      },
    ];
  },
  Document,
};
