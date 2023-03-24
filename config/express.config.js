const graphqlHTTP = require("express-graphql"),
  GraphQLSchema = require("../schema/graphql/schema"),
  bodyParser = require("body-parser"),
  helmet = require("helmet"),
  path = require("path"),
  express = require("express");

module.exports = (app) => {
  app.use(helmet());

  app.use("/photos", express.static(path.join(__dirname, "images")));
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  require("../helpers/cache");

  app.use(
    "/graphql",
    graphqlHTTP({
      schema: GraphQLSchema,
      graphiql: true,
    })
  );

  function notFound(req, res, next) {
    res.status(404);
    const error = new Error("Not Found");
    next(error);
  }

  function errorHandler(error, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
      message: error.message,
    });
  }

  app.use(notFound);
  app.use(errorHandler);
};
