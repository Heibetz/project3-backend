import db from "../models/index.js";
const Goal = db.goal;
const Op = db.Sequelize.Op;
const exports = {};

// Create and Save a new Goal
exports.create = (req, res) => {
  const { title, description, targetDate, status } = req.body;
    
  if (!title || !description) {
    res.status(400).send({
      message: "Title and description are required!"
    });
    return;
  }

  const goal = {
    title,
    description,
    targetDate,
    status,
    userId: req.userId // From JWT token
  };

  Goal.create(goal)
    .then(data => res.status(201).send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Goal."
      });
    });
};

// Retrieve all Goals
exports.findAll = (req, res) => {
  Goal.findAll({
    where: { userId: req.userId }, // Only fetch goals for the authenticated user
    order: [['createdAt', 'DESC']]
  })
    .then(data => res.send(data))
    .catch(err => {
      console.error("Error in findAll goals:", err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving goals."
      });
    });
};

// Find a single Goal with an id
// Find a single Goal by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Goal.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Goal with id=${id} not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Goal with id=${id}`
      });
    });
};

// Update a Goal
exports.update = (req, res) => {
  const id = req.params.id;

  Goal.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      const updated = Array.isArray(num) ? num[0] : num;
      if (updated === 1) {
        Goal.findByPk(id)
          .then(updatedGoal => res.send(updatedGoal))
          .catch(() => res.send({ message: "Goal was updated successfully." }));
      } else {
        res.status(404).send({
          message: `Goal with id=${id} not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating Goal with id=${id}`
      });
    });
};

// Delete a Goal
exports.delete = (req, res) => {
  const id = req.params.id;

  Goal.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "Goal was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `Goal with id=${id} not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Goal with id=${id}`
      });
    });
};