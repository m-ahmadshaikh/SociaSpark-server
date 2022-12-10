const commentResolver = require('./comments');
const postResolvers = require('./post');
const userResolvers = require('./user');

resolvers = {
  Post: {
    likeCount: (post) => {
      return post.likes.length;
    },
    commentCount: (post) => {
      return post.comments.length;
    },
  },
  Query: {
    ...userResolvers.Query,
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolver.Mutation,
  },
  Subscription: {
    ...postResolvers.Subscription,
  },
};

module.exports = resolvers;
