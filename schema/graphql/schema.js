const { GraphQLSchema } = require("graphql");

const RootQuery = require("../graphql/RootQuery"),
  Mutation = require("../graphql/Mutation");

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
