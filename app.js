const { process } = require("joi/lib/errors");

const express = require("express"),
  app = express(),
  morgan = require("morgan"),
  config = require("./config/config");

require("dotenv").config();

require("./config/mongoose.config")(config);
require("./config/express.config")(app);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

if (process.env.USE_REDIS === "true") {
  require("./config/redis.config")(config.dev.redisUrl);
}

app.listen(config.dev.port, () => {
  console.log(`listening to the port : ${config.dev.port}`);
});