import db from "../models/index.js";
const Exercise = db.exercise;
const Op = db.Sequelize.Op;
const exports = {};

// Create and Save a new Exercise
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "name is required" });
    return;
  }
  if (!req.body.created_by) {
    res.status(400).send({ message: "created_by is required" });
    return;
  }

  const exercise = {
    exercise_id: req.body.exercise_id,
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    created_by: req.body.created_by,
  };

  Exercise.create(exercise)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Exercise.",
      });
    });
};

// Retrieve all Exercises
exports.findAll = (req, res) => {
  const name = req.query.name;
  const type = req.query.type;
  const created_by = req.query.created_by;

  const where = {};
  if (name) where.name = { [Op.like]: `%${name}%` };
  if (type) where.type = type;
  if (created_by) where.created_by = created_by;

  Exercise.findAll({ where })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({ message: err.message || "Error retrieving exercises." });
    });
};

// Find a single Exercise by id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Exercise.findByPk(id)
    .then((data) => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Cannot find Exercise with id=${id}.` });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Exercise with id=" + id });
    });
};

// Update an Exercise by id
exports.update = (req, res) => {
  const id = req.params.id;
  Exercise.update(req.body, { where: { exercise_id: id } })
    .then((num) => {
      const updated = Array.isArray(num) ? num[0] : num;
      if (updated == 1) res.send({ message: "Exercise was updated successfully." });
      else res.send({ message: `Cannot update Exercise with id=${id}.` });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating Exercise with id=" + id });
    });
};

// Delete an Exercise by id
exports.delete = (req, res) => {
  const id = req.params.id;
  Exercise.destroy({ where: { exercise_id: id } })
    .then((num) => {
      if (num == 1) res.send({ message: "Exercise was deleted successfully!" });
      else res.send({ message: `Cannot delete Exercise with id=${id}.` });
    })
    .catch((err) => {
      res.status(500).send({ message: "Could not delete Exercise with id=" + id });
    });
};

export default exports;
