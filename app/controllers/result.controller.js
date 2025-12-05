import db from "../models/index.js";
const Result = db.result;
const Exercise = db.exercise;
const exports = {};

// Create and Save a new Result
exports.create = (req, res) => {
  // Validate request
  if (!req.body.exercise_id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Result
  const result = {
    user_id: req.body.user_id,
    exercise_id: req.body.exercise_id,
    date: req.body.date || new Date(),
    resultMeasure1: req.body.resultMeasure1,
    resultMeasure2: req.body.resultMeasure2,
    resultMeasure3: req.body.resultMeasure3,
    notes: req.body.notes,
  };

  // Save Result in the database
  Result.create(result)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Result.",
      });
    });
};

// Retrieve all Results from the database.
exports.findAll = (req, res) => {
  const exercise_id = req.query.exercise_id;
  const user_id = req.query.user_id;
  var condition = {};
  if (exercise_id) condition.exercise_id = exercise_id;
  if (user_id) condition.user_id = user_id;

  Result.findAll({ 
    where: condition,
    include: [{
      model: Exercise,
      as : "exercise",
      attributes: ["exercise_id", "name", "description", "type"]
    }],
    order: [["date", "DESC"]]
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving results.",
      });
    });
};

// Find a single Result with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Result.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Result with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Result with id=" + id,
      });
    });
};

// Update a Result by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Result.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Result was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Result with id=${id}. Maybe Result was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error updating Result with id=" + id,
      });
    });
};

// Delete a Result with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Result.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Result was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Result with id=${id}. Maybe Result was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Could not delete Result with id=" + id,
      });
    });
};

// Find all Results for an Exercise
exports.findAllForExercise = (req, res) => {
  const exerciseId = req.params.exerciseId;
  Result.findAll({
    where: { exercise_id: exerciseId },
    include: [{ 
      model: Exercise, 
      as : "exercise",
      attributes: ["exercise_id", "name", "description", "type"]
    }],
    order: [["date", "DESC"]]
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Results for exercise with id=${exerciseId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Results for exercise with id=" +
            exerciseId,
      });
    });
};

export default exports;

