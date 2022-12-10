const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const config = require('./config');
const resolvers = require('./graphql/resolvers');
const { PubSub } = require('graphql-subscriptions');
const typeDefs = './graphql/typedefs';

const pubsub = new PubSub();

const PORT = process.env.PORT || 4000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  connectToDevTools: true,
  introspection: true,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(config.MONGO_DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to Mongodb');
    return server.listen(PORT);
  })
  .then((res) => {
    console.log('Listening at: ' + res.url);
  })
  .catch((e) => {
    console.log('Error: ' + e);
  });
