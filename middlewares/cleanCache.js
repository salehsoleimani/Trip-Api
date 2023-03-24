const { clearHash } = require("../helpers/cache");

module.exports = async (req, res, next) => {
  await next();
  // (After saving user object)
  clearHash(req.userId);
};
