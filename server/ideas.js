const ideasRouter = require("express").Router();

module.exports = ideasRouter;

const { getAllFromDatabase } = require("./db");

ideasRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("ideas"));
});
