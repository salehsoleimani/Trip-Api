const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");

const { UserType, TokenType } = require("../graphql/Types");

module.exports = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    User: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        if (args.id) return { id: args.id };
        else throw new Error("please specify an id");
      },
    },
    userAuth: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        if (!args.email || !args.password)
          throw new Error('please specify "name" and "password"');
      },
    },
    validateToken: {
      type: TokenType,
      args: {
        token: { type: GraphQLString },
      },
      resolve(parent, args) {
        if (!args.token) {
          throw new Error('please specify the "token"');
        } else {
          let decoded = jwt.verify(args.token, dev.jwt);
          return { isValid: decoded ? true : false };
        }
      },
    },
  },
});
