const minionsRouter = require("express").Router();

module.exports = minionsRouter;

const { getAllFromDatabase } = require("./db");

minionsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("minions"));
});
