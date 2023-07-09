const pool = require("../../db.js");
const {v4: uuidv4} = require('uuid');

//Create task controller
const create_task_controller = async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  console.log(user_email, title, progress, date);
  // call uuidv4 to get a unique id
  const id = uuidv4();
  // insert the todo into the database
  await pool
    .query(
      "INSERT INTO todos (id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id, user_email, title, progress, date]
    )
    .then((newTask) => {
      return res.status(200).json(newTask.rows);
    })
    .catch((err) => {
      console.error(err);
    });
};

//Edit task controller
const edit_task_controller = async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;

  await pool
    .query(
      "UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5 RETURNING *",
      [user_email, title, progress, date, id]
    )
    .then((newTask) => {
      return res.status(200).json(newTask.rows);
    })
    .catch((err) => {
      console.error(err);
    });
};

//Delete task controller
const delete_task_controller = async (req, res) => {
  const { id } = req.params;
  await pool
    .query("DELETE FROM todos WHERE id = $1 RETURNING *", [id])
    .then((deletedTask) => {
      return res.status(200).json(deletedTask.rows);
    })
    .catch((err) => console.error(err));
};

//Get all task controller
const get_tasks_controller = async (req, res) => {
  const { userEmail } = req.params;
  await pool
    .query("SELECT * FROM todos WHERE user_email = $1", [userEmail])
    .then((todos) => {
      console.log(todos.rows);
      return res.json(todos.rows);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  create_task_controller,
  edit_task_controller,
  delete_task_controller,
  get_tasks_controller,
};
