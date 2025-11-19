import db from "../models/index.js";
const ExercisePlan = db.exercisePlan;
const Exercise = db.exercise;
const Op = db.Sequelize.Op;
const exports = {};

// Create and Save a new Exercise Plan
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "name is required" });
    return;
  }
  if (!req.body.created_by) {
    res.status(400).send({ message: "created_by is required" });
    return;
  }

  const exercisePlan = {
    name: req.body.name,
    description: req.body.description,
    created_by: req.body.created_by,
    is_standard: req.body.is_standard || false,
    day: req.body.day || null,
    sport: req.body.sport || "All",
  };

  ExercisePlan.create(exercisePlan)
    .then((plan) => {
      // If exercises are provided, add them to the plan
      if (req.body.exercises && Array.isArray(req.body.exercises)) {
        const exerciseData = req.body.exercises.map((ex, index) => ({
          plan_id: plan.plan_id,
          exercise_id: ex.exercise_id || ex.id,
          order: ex.order || index,
          sets: ex.sets || 3,
          reps: ex.reps || 10,
          duration: ex.duration || null,
        }));
        return db.exercisePlanExercise.bulkCreate(exerciseData).then(() => plan);
      }
      return plan;
    })
    .then((plan) => res.send(plan))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Exercise Plan.",
      });
    });
};

// Retrieve all Exercise Plans
exports.findAll = (req, res) => {
  const name = req.query.name;
  const is_standard = req.query.is_standard;
  const created_by = req.query.created_by;
  const sport = req.query.sport;

  const where = {};
  if (name) where.name = { [Op.like]: `%${name}%` };
  if (is_standard !== undefined) where.is_standard = is_standard === "true";
  if (created_by) where.created_by = created_by;
  
  // Filter by sport: show plans that match user's sport OR are marked as "All"
  if (sport) {
    where[Op.or] = [
      { sport: sport },
      { sport: "All" }
    ];
  }

  ExercisePlan.findAll({ 
    where,
    include: [{
      model: Exercise,
      as: "exercises",
      through: { attributes: ["order", "sets", "reps", "duration"] }
    }]
  })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({ message: err.message || "Error retrieving exercise plans." });
    });
};

// Find a single Exercise Plan by id
exports.findOne = (req, res) => {
  const id = req.params.id;
  ExercisePlan.findByPk(id, {
    include: [{
      model: Exercise,
      as: "exercises",
      through: { attributes: ["order", "sets", "reps", "duration"] }
    }]
  })
    .then((data) => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Cannot find Exercise Plan with id=${id}.` });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Exercise Plan with id=" + id });
    });
};

// Update an Exercise Plan by id
exports.update = (req, res) => {
  const id = req.params.id;
  ExercisePlan.update(req.body, { where: { plan_id: id } })
    .then((num) => {
      const updated = Array.isArray(num) ? num[0] : num;
      if (updated == 1) {
        // If exercises are provided, update them
        if (req.body.exercises && Array.isArray(req.body.exercises)) {
          // Delete existing exercises for this plan
          return db.exercisePlanExercise.destroy({ where: { plan_id: id } })
            .then(() => {
              // Add new exercises
              const exerciseData = req.body.exercises.map((ex, index) => ({
                plan_id: id,
                exercise_id: ex.exercise_id || ex.id,
                order: ex.order || index,
                sets: ex.sets || 3,
                reps: ex.reps || 10,
                duration: ex.duration || null,
              }));
              return db.exercisePlanExercise.bulkCreate(exerciseData);
            });
        }
      }
      return updated;
    })
    .then(() => res.send({ message: "Exercise Plan was updated successfully." }))
    .catch((err) => {
      res.status(500).send({ message: "Error updating Exercise Plan with id=" + id });
    });
};

// Delete an Exercise Plan by id
exports.delete = (req, res) => {
  const id = req.params.id;
  ExercisePlan.destroy({ where: { plan_id: id } })
    .then((num) => {
      if (num == 1) res.send({ message: "Exercise Plan was deleted successfully!" });
      else res.send({ message: `Cannot delete Exercise Plan with id=${id}.` });
    })
    .catch((err) => {
      res.status(500).send({ message: "Could not delete Exercise Plan with id=" + id });
    });
};

// Add exercise to a plan
exports.addExercise = (req, res) => {
  const planId = req.params.id;
  const { exercise_id, sets, reps, duration, order } = req.body;

  console.log("addExercise - Request body:", req.body);
  console.log("addExercise - exercise_id:", exercise_id);

  if (!exercise_id) {
    res.status(400).send({ 
      message: "exercise_id is required",
      receivedBody: req.body 
    });
    return;
  }

  db.exercisePlanExercise.create({
    plan_id: planId,
    exercise_id,
    sets: sets || 3,
    reps: reps || 10,
    duration: duration || null,
    order: order || 0,
  })
    .then((data) => res.send(data))
    .catch((err) => {
      console.error("Error creating exercisePlanExercise:", err);
      res.status(500).send({
        message: err.message || "Error adding exercise to plan.",
      });
    });
};

// Update exercise in a plan
exports.updateExercise = (req, res) => {
  const { planId, exerciseId } = req.params;
  const { sets, reps, duration, order } = req.body;

  db.exercisePlanExercise.update(
    {
      sets: sets !== undefined ? sets : undefined,
      reps: reps !== undefined ? reps : undefined,
      duration: duration !== undefined ? duration : undefined,
      order: order !== undefined ? order : undefined,
    },
    {
      where: { plan_id: planId, exercise_id: exerciseId },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Exercise updated successfully!" });
      } else {
        res.status(404).send({ message: "Exercise not found in plan." });
      }
    })
    .catch((err) => {
      console.error("Error updating exercise in plan:", err);
      res.status(500).send({ message: "Error updating exercise in plan." });
    });
};

// Remove exercise from a plan
exports.removeExercise = (req, res) => {
  const { planId, exerciseId } = req.params;

  db.exercisePlanExercise.destroy({
    where: { plan_id: planId, exercise_id: exerciseId },
  })
    .then((num) => {
      if (num == 1) res.send({ message: "Exercise removed from plan successfully!" });
      else res.send({ message: "Cannot remove exercise from plan." });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error removing exercise from plan." });
    });
};

export default exports;
