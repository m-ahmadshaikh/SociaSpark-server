const { UserInputError, AuthenticationError } = require('apollo-server');
const { Types } = require('mongoose');
const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');

const commentResolver = {
  Mutation: {
    likePost: async (_, { postId }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // Post already likes, unlike it
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // Not liked, like post
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    },

    deleteComment: async (_, params, context) => {
      const { postId, commentId } = params;
      const { username } = checkAuth(context);

      const post = await Post.findById(Types.ObjectId(postId));
      if (!post) {
        throw new UserInputError('Post not found');
      }

      const commentIndex = post.comments.findIndex(
        (com) => com.id === commentId
      );
      if (commentIndex === -1) {
        throw new UserInputError('Comment doesnot exist');
      }
      if (post.comments[commentIndex].username === username) {
        post.comments.splice(commentIndex, 1);
        await post.save();
        return post;
      } else {
        throw new AuthenticationError('Action not allowed');
      }
    },
    createComment: async (_, { postId, body }, context) => {
      const user = checkAuth(context);
      const post = await Post.findById(Types.ObjectId(postId));
      if (body.trim() === '') {
        throw new UserInputError('Empty Comment', {
          errors: {
            body: 'Comment body must not be empty',
          },
        });
      }
      if (post) {
        post.comments.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      }
      throw new UserInputError('Post not found');
    },
  },
};
module.exports = commentResolver;
