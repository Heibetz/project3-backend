import db from "../models/index.js";
const Goal = db.goal;
const exportsObj = {};

exportsObj.create = async (req, res) => {
  try {
    // Must be authenticated and an athlete
    const authUser = req.user;
    if (!authUser) return res.status(401).send({ message: "Unauthorized" });
    if (authUser.role !== "athlete")
      return res.status(403).send({ message: "Only athletes can create goals" });

    const { exercise_id, currentWeight, goalWeight } = req.body;
    if (!exercise_id) return res.status(400).send({ message: "exercise_id is required" });

    const goal = await Goal.create({
      user_id: authUser.id,
      exercise_id,
      currentWeight,
      goalWeight,
    });
    res.status(201).send(goal);
  } catch (err) {
    res.status(500).send({ message: err.message || "Error creating goal" });
  }
};

exportsObj.findAll = async (req, res) => {
  try {
    // If authenticated athlete, return only their goals; otherwise return all
    if (req.user && req.user.role === "athlete") {
      const goals = await Goal.findAll({ where: { user_id: req.user.id } });
      return res.send(goals);
    }
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
    const goal = await Goal.findByPk(id);
    if (!goal) return res.status(404).send({ message: "Goal not found" });

    // Only owner athlete can update their goal
    if (!req.user) return res.status(401).send({ message: "Unauthorized" });
    if (req.user.role !== "athlete" || req.user.id !== goal.user_id)
      return res.status(403).send({ message: "Forbidden" });

    // Prevent changing ownership
    const { user_id, ...updates } = req.body;
    const [count] = await Goal.update(updates, { where: { id } });
    const updated = await Goal.findByPk(id);
    res.send(updated);
  } catch (err) {
    res.status(500).send({ message: err.message || "Error updating goal" });
  }
};

exportsObj.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const goal = await Goal.findByPk(id);
    if (!goal) return res.status(404).send({ message: "Goal not found" });

    if (!req.user) return res.status(401).send({ message: "Unauthorized" });
    if (req.user.role !== "athlete" || req.user.id !== goal.user_id)
      return res.status(403).send({ message: "Forbidden" });

    const count = await Goal.destroy({ where: { id } });
    res.send({ message: "Goal deleted" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Error deleting goal" });
  }
};

export default exportsObj;