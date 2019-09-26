'use strict';
const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers } = require('./lib/schemas');

const server = new ApolloServer({
  typeDefs,
  resolvers
});

async function start() {
  const { url } = await server.listen({ port: 4001, host: '0.0.0.0' });
}

return start();