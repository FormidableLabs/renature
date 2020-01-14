// Environmental variables by stage in react-static 5.9.12
// react-static start, aka development: REACT_STATIC_ENV="development" && REACT_STATIC_STAGING=undefined
// react-static stage, aka staging: REACT_STATIC_ENV="production" && REACT_STATIC_STAGING="true"
// react-static build, aka production:  REACT_STATIC_ENV="production" && REACT_STATIC_STAGING=undefined

const stage =
  process.env.REACT_STATIC_STAGING === 'true'
    ? 'staging'
    : process.env.REACT_STATIC_ENV;
const landerBasePath = 'open-source/renature';
const metaData = {
  title: 'Renature',
  description:
    'A physics-based animation library for React inspired by the natural world.',
  url: 'http://www.formidable.com/open-source/renature/',
};

module.exports = { stage, landerBasePath, metaData };
