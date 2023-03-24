const { GraphQLString } = require("graphql");

module.exports.UserInputType = new GraphQLInputObjectType({
  name: "UserInput",
  description: "Input user payload",
  fields: () => ({
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});
