const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");

const { UserType, PostType } = require("../graphql/Types");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"),
  { dev } = require("../../config/config");

const User = require("../../models/User.model");

module.exports = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    Signup: {
      type: UserType,
      args: {
        Name: { type: GraphQLString },
        Username: { type: GraphQLString },
        Password: { type: GraphQLString },
        Email: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const userExists = await User.findOne({ Email: args.Email });
        if (userExists) throw new Error("user already exists");

        const hashSalt = await bcrypt.genSalt(10),
          passHashed = await bcrypt.hash(args.Password, hashSalt);

        const user = new User({
          Username: args.Username,
          Email: args.Email,
          Password: passHashed,
        });

        try {
          const savedUser = await user.save();
          const Token = jwt.sign(
            {
              id: savedUser._id,
              Username: args.Username,
              password: passHashed,
            },
            dev.jwt
          );
          return {
            Name: savedUser.Name,
            Username: savedUser.Username,
            Password: savedUser.Password,
            Email: savedUser.Email,
            date: savedUser.date,
            Token,
          };
        } catch (ex) {
          throw new Error(ex.message);
        }
      },
    },
  },
});
