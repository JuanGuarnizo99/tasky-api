const {
  create_task_controller,
  edit_task_controller,
  delete_task_controller,
  get_tasks_controller,
} = require("../controllers/tasks.js");
const express = require("express");
const router = express.Router();

//create task route
router.post("/create", create_task_controller);

//edit task route
router.put("/edit/:id", edit_task_controller);

//delete task route
router.delete("/delete:id", delete_task_controller);

//get tasks route
router.get("/get/:userEmail", get_tasks_controller);

module.exports = router;
