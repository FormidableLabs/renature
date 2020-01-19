// This file modifies react-static's default webpack config with a few custom rules.
const path = require('path');

const staticWebpackConfig = (config, { defaultLoaders }) => {
  config.devtool = false;
  config.module.rules = [
    {
      oneOf: [
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: Number.MAX_SAFE_INTEGER,
              },
            },
          ],
        },
        {
          test: /\.md$/,
          use: 'raw-loader',
        },
        defaultLoaders.cssLoader,
        defaultLoaders.jsLoader,
        defaultLoaders.fileLoader,
      ],
    },
  ];
  return config;
};

module.exports = staticWebpackConfig;
