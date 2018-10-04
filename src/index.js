require('dotenv').config()

import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'

global.IS_DEBUG = process.env.NODE_ENV !== 'production'


// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const GRAPHQL_PLAYGROUND_CONFIG = {
  settings: {
    'editor.cursorShape': 'line',
    'editor.fontSize': 14,
    'editor.reuseHeaders': true,
    'editor.theme': 'light'
  }
};

const server = new ApolloServer({ playground: IS_DEBUG ? GRAPHQL_PLAYGROUND_CONFIG : false, typeDefs, resolvers });


const app = express();
server.applyMiddleware({ app });

app.listen({ port: process.env.APP_PORT }, () => {
  console.log(`🚀 Server ready at port ${process.env.APP_PORT}, and graphql on ${server.graphqlPath}`)
});
