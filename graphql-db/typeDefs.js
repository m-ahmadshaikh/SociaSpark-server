const { gql } = require('apollo-server');
const Post = require('../models/Post');

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
    comments: [Comments]!
    likes: [Like]!
    likeCount: String
    commentCount: String
  }

  type Comments {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type Query {
    posts: [Post]!
    getPost(postID: ID!): Post!
  }

  type Subscription {
    newPost: Post!
  }

  type Mutation {
    register(input: RegisterInput): User!
    login(input: LoginInput): User!
    createPost(body: String!): Post!
    deletePost(id: ID!): String!

    createComment(postId: ID!, body: String!): Post!
    deleteComment(commentId: ID!, postId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;

module.exports = typeDefs;
