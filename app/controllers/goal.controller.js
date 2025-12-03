import db from "../models/index.js";
const Goal = db.goal;
const exportsObj = {};

exportsObj.create = async (req, res) => {
  try {
    const { exercise_id, currentWeight, goalWeight } = req.body;
    if (!exercise_id) return res.status(400).send({ message: "exercise_id is required" });
    const goal = await Goal.create({ exercise_id, currentWeight, goalWeight });
    res.status(201).send(goal);
  } catch (err) {
    res.status(500).send({ message: err.message || "Error creating goal" });
  }
};

exportsObj.findAll = async (req, res) => {
  try {
    const goals = await Goal.findAll();
    res.send(goals);
  } catch (err) {
    res.status(500).send({ message: err.message || "Error retrieving goals" });
  }
};

exportsObj.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const goal = await Goal.findByPk(id);
    if (!goal) return res.status(404).send({ message: "Goal not found" });
    res.send(goal);
  } catch (err) {
    res.status(500).send({ message: err.message || "Error retrieving goal" });
  }
};

exportsObj.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [count] = await Goal.update(req.body, { where: { id } });
    if (count === 0) return res.status(404).send({ message: "Goal not found" });
    const updated = await Goal.findByPk(id);
    res.send(updated);
  } catch (err) {
    res.status(500).send({ message: err.message || "Error updating goal" });
  }
};

exportsObj.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const count = await Goal.destroy({ where: { id } });
    if (count === 0) return res.status(404).send({ message: "Goal not found" });
    res.send({ message: "Goal deleted" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Error deleting goal" });
  }
};

export default exportsObj;