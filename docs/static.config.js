import React from 'react';
import { reloadRoutes } from 'react-static/node';
import chokidar from 'chokidar';
import { ServerStyleSheet } from 'styled-components';

import { getSidebarItems } from './static-config-helpers/md-data-transforms';
import staticWebpackConfig from './static-config-parts/static-webpack-config';
import {
  stage,
  landerBasePath,
  metaData,
} from './static-config-parts/constants';

chokidar.watch('src/content').on('all', () => reloadRoutes());

export default {
  paths: {
    root: process.cwd(), // The root of your project. Don't change this unless you know what you're doing.
    src: 'src', // The source directory. Must include an index.js entry file.
    // See app.js for how stage is used to make client-side routing resolve correctly by stage.
    dist: stage === 'staging' ? `dist/${landerBasePath}` : 'dist', // The production output directory.
    devDist: 'tmp/dev-server', // The development scratch directory.
    public: 'public', // The public directory (files copied to dist during build)
  },
  basePath: landerBasePath,
  stagingBasePath: landerBasePath,
  devBasePath: '',
  getSiteData: () => ({
    title: metaData.title,
  }),
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
        component: 'src/screens/home',
      },
      {
        path: '/docs',
        component: 'src/screens/docs',
        getData: () => ({
          title: `${metaData.title} | Documentation`,
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
            component: 'src/screens/docs',
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
  renderToHtml: (render, Component, meta) => {
    // Check out https://github.com/react-static/react-static/blob/v5/examples/styled-components/static.config.js
    const sheet = new ServerStyleSheet();
    const html = render(sheet.collectStyles(<Component />));

    meta.styleTags = sheet.getStyleElement();
    return html;
  },
  // So this is kinda cutesy, it's the equivalent of html.js in gatsby, it defines
  // the root html page as a react component:
  // https://github.com/nozzle/react-static/blob/master/docs/config.md#document
  Document: require('./static-config-parts/document').default,
  // turn this on if it helps your local development workflow for build testing
  bundleAnalyzer: false,
  webpack: staticWebpackConfig,
};
