const redis = require("redis");

module.exports = (url) => {
  client = redis.createClient(url);
  client.on("connect", () => {
    console.log("Redis client connected ... ");
    return client;
  });
  client.on("error", function (err) {
    console.log("an Error Occured :" + err);
  });
};
