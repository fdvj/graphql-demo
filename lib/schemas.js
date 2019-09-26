'use strict';
const fs = require('fs');
const { gql } = require('apollo-server');
const merge = require('lodash/merge');

require.extensions['.graphql'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

const typeDefs = [];
let resolvers = { Query: {} };
const schemas = {};

// Required for now to be able to do the dynamic import
const rootSchema = gql`
  type Query {
    "[DEPRECATED] Not used at all"
    root: String
  }

  type Mutation {
    "[DEPRECATED] Not used at all"
    root: String
  }
`;

typeDefs.push(rootSchema);

// Get schemas
fs.readdirSync('./schemas').forEach((file) => {
  if (file === 'index.js') {
    return;
  }
  const schema = require(`../schemas/${file}`);
  if (schema) {
    typeDefs.push(gql(schema));
    const name = file.replace(/\.graphql$/, '');
    schemas[name.charAt(0).toLocaleUpperCase() + name.slice(1)] = schema;
  }
});

// Get resolvers
fs.readdirSync('./resolvers').forEach((file) => {
  const resolver = require(`../resolvers/${file}`);
  // Get resol
  if (resolver) {
    resolvers = merge(resolvers, resolver);
  }
});

module.exports = { typeDefs, resolvers, schemas };