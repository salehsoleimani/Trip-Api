const mongoose = require("mongoose");
const { dev } = require("../config/config");

module.exports = (config) => {
  mongoose
    .connect(dev.db)
    .then(() => console.log("Connected to MongoDB ..."))
    .catch((err) => console.log("an Error Occured" + err));

  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
};
