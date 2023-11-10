const minionsRouter = require("express").Router();

module.exports = minionsRouter;

const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

minionsRouter.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById("minions", id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("minions"));
});

minionsRouter.post("/", (req, res, next) => {
  const newMinion = addToDatabase("minions", req.body);
  res.status(201).send(newMinion);
});

minionsRouter.get("/:minionId", (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.put("/:minionId", (req, res, next) => {
  let updatedMinionInstance = updateInstanceInDatabase("minions", req.body);
  res.send(updatedMinionInstance);
});

minionsRouter.delete("/:minionId", (req, res, next) => {
  const deleted = deleteFromDatabasebyId("minions", req.params.minionId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

minionsRouter.get("/:minionId/work", (req, res, next) => {
  const work = getAllFromDatabase("work").filter((singleWork) => {
    return singleWork.minionId === req.params.minionId;
  });
  res.send(work);
});

minionsRouter.post("/:minionId/work", (req, res, next) => {
  const workToAdd = req.body;
  workToAdd.minionId = req.params.minionId;
  // It adds the minionId from the route parameters to the workToAdd object wjicj we get from the request body.
  // This ensures that the new work being added is associated with the correct minion.
  const newWork = addToDatabase("work", workToAdd);
  res.status(201).send(newWork);
});

minionsRouter.put("/:minionId/work/:workId", (req, res, next) => {
  if (req.params.minionId !== req.body.minionId) {
    res.status(400).send();
  } else {
    updatedWork = updateInstanceInDatabase("work", req.body);
    res.send(updatedWork);
  }
});

// route handler is designed to delete a specific work item associated with a particular minion
minionsRouter.delete("/:miniondId/work/:workId", (req, res, next) => {
  const deleted = deleteFromDatabasebyId("work", req.params.workId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});
