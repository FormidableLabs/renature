// This file modifies react-static's default webpack config with a few custom rules.
const path = require('path');

const staticWebpackConfig = (config, { defaultLoaders }) => {
  config.devtool = false;
  config.module.rules = [
    {
      oneOf: [
        {
          test: /\.js$/,
          include: [
            'node_modules', require.resolve('unicode-match-property-value-ecmascript'),
            'node_modules', require.resolve('unicode-match-property-ecmascript'),
            'node_modules', require.resolve('regexpu-core')
         ],
          use: {
            loader: 'babel-loader',
          }
        },
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
