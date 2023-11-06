const ideasRouter = require("express").Router();

module.exports = ideasRouter;

const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

const checkMillionDollarIdea = require("./checkMillionDollarIdea");

ideasRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("ideas"));
});
