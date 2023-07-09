const app = require("./app/index.js");
const authRouter = require("./app/routes/users.js");
const taskRouter = require("./app/routes/tasks.js");
const PORT = process.env.PORT ?? 8000;

app.use("/", authRouter);
app.use("/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
