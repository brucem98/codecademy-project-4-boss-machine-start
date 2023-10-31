const meetingsRouter = require("express").Router();

module.exports = meetingsRouter;

const { getAllFromDatabase } = require("./db");

meetingsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("meetings"));
});
