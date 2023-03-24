const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");

const { UserType, PostType } = require("../../graphql/Types");

module.exports.Signup = async (parent, args) => {
  const { validationErr } = require("../../helpers/userValidation")(args);

  const userExists = await User.findOne({ Email: args.Email });
  if (userExists) throw new Error("user already exists");

  const hashSalt = await bcrypt.genSalt(10);
  const passHashed = await bcrypt.hash(args.Password, hashSalt);

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
};
