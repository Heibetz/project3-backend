import db from "../models/index.js";
const Goal = db.goal;

const controller = {};

controller.create = async (req, res) => {
  try {
    const { exerciseName, currentWeight, goalWeight } = req.body;
    if (!exerciseName || exerciseName.trim() === "") {
      return res.status(400).send({ message: "exerciseName is required." });
    }
    const cw = parseFloat(currentWeight);
    const gw = parseFloat(goalWeight);
    if (isNaN(cw) || isNaN(gw) || cw <= 0 || gw <= 0) {
      return res.status(400).send({ message: "currentWeight and goalWeight must be positive numbers." });
    }
    const created = await Goal.create({
      exerciseName: exerciseName.trim(),
      currentWeight: cw,
      goalWeight: gw,
      userId: req.userId,
    });
    return res.status(201).send(created);
  } catch (err) {
    console.error("Error creating goal:", err);
    return res.status(500).send({ message: err.message || "Some error occurred while creating the Goal." });
  }
};

controller.findAll = async (req, res) => {
  try {
    const data = await Goal.findAll({ where: { userId: req.userId }, order: [["createdAt", "DESC"]] });
    return res.send(data);
  } catch (err) {
    console.error("Error retrieving goals:", err);
    return res.status(500).send({ message: err.message || "Some error occurred while retrieving goals." });
  }
};

controller.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const goal = await Goal.findByPk(id);
    if (!goal) return res.status(404).send({ message: `Goal with id=${id} not found.` });
    if (goal.userId !== req.userId) return res.status(403).send({ message: "Forbidden" });
    return res.send(goal);
  } catch (err) {
    console.error("Error retrieving goal:", err);
    return res.status(500).send({ message: "Error retrieving Goal." });
  }
};

controller.update = async (req, res) => {
  try {
    const id = req.params.id;
    const goal = await Goal.findByPk(id);
    if (!goal) return res.status(404).send({ message: `Goal with id=${id} not found.` });
    if (goal.userId !== req.userId) return res.status(403).send({ message: "Forbidden" });

    const { exerciseName, currentWeight, goalWeight } = req.body;
    const updates = {};
    if (exerciseName !== undefined) updates.exerciseName = exerciseName.trim();
    if (currentWeight !== undefined) {
      const cw = parseFloat(currentWeight);
      if (isNaN(cw) || cw <= 0) return res.status(400).send({ message: "currentWeight must be a positive number." });
      updates.currentWeight = cw;
    }
    if (goalWeight !== undefined) {
      const gw = parseFloat(goalWeight);
      if (isNaN(gw) || gw <= 0) return res.status(400).send({ message: "goalWeight must be a positive number." });
      updates.goalWeight = gw;
    }

    await Goal.update(updates, { where: { id } });
    const updated = await Goal.findByPk(id);
    return res.send(updated);
  } catch (err) {
    console.error("Error updating goal:", err);
    return res.status(500).send({ message: `Error updating Goal with id=${req.params.id}` });
  }
};

controller.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const goal = await Goal.findByPk(id);
    if (!goal) return res.status(404).send({ message: `Goal with id=${id} not found.` });
    if (goal.userId !== req.userId) return res.status(403).send({ message: "Forbidden" });
    await Goal.destroy({ where: { id } });
    return res.send({ message: "Goal was deleted successfully!" });
  } catch (err) {
    console.error("Error deleting goal:", err);
    return res.status(500).send({ message: `Could not delete Goal with id=${req.params.id}` });
  }
};

export default controller;