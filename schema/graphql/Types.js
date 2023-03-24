const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
} = require("graphql");

module.exports.UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    Name: { type: GraphQLString },
    Username: { type: GraphQLString },
    Password: { type: GraphQLString },
    Email: { type: GraphQLString },
    Credit: { type: GraphQLInt },
    Token: { type: GraphQLString },
    date: { type: GraphQLString },
  }),
});

module.exports.PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLID },
    Image: { type: GraphQLString },
    Description: { type: GraphQLString },
    UserId: { type: GraphQLString },
  }),
});

module.exports.TokenType = new GraphQLObjectType({
  name: "Token",
  fields: () => ({
    isValid: { type: GraphQLBoolean },
  }),
});
