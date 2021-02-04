/**
 * Formideploy configuration overrides.
 */
module.exports = {
  lander: {
    name: 'renature',
  },
  // TODO(GH): Remove this after we've fully dog-fooded our switch to GH actions.
  production: {
    domain:
      'tmp-experiment-02.formidable.com.s3-website-us-east-1.amazonaws.com',
    bucket: 'tmp-experiment-02.formidable.com',
  },
};
