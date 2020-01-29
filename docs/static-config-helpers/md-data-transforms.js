/* eslint-disable func-style */
const upperFirst = require('lodash.upperfirst');
const orderBy = require('lodash.orderby');
const path = require('path');
const getMdFiles = require('./get-md-files');

const sidebarTitleSlugMutation = (mdData, mdPath) => {
  const { name } = path.parse(mdPath);

  mdData.slug = name.toLowerCase();
  mdData.path = `/${name.toLowerCase()}/`;
  const spacedCappedName = name
    .split('-')
    .map(n => upperFirst(n))
    .join(' ');

  mdData.title = spacedCappedName;

  if (spacedCappedName.includes('api')) {
    mdData.title = spacedCappedName.replace(/(api)/, v => v.toUpperCase());
  }
};

const sidebarSort = items => orderBy(items, ['data.order'], 'asc');

const getSidebarItems = (
  mdPath = 'content/',
  items = [],
  mutations = [sidebarTitleSlugMutation],
  sort = sidebarSort
) => getMdFiles(mdPath, items, mutations, sort);

module.exports = {
  getSidebarItems,
};
