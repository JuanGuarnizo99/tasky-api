const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require('../../db.js');
//Signup controller
const signup_controller = async (req, res) => {
  //Get data from client
  const { email, password } = req.body;
  //Create the hashsed password
  const hashedPassword = await bcrypt.hash(password, 10);
  //Insert the hashsed password in the database
  await pool
    .query(
      "INSERT INTO users (email, hashed_password) VALUES ($1, $2) RETURNING email",
      [email, hashedPassword]
    )
    .then(() => {
      console.log(email);
      //create token
      const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });
      //send response with eamil and token for the cookies
      return res.status(200).json({ email: email, token: token });
    })
    .catch((error) => {
      return res.json({ detail: error.detail });
    });
};

//Login controller
const login_controller = async (req, res) => {
  //get data from client
  const { email, password } = req.body;
  //get the user from the db
  const users = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  //check for 'user not in database' error
  if (users.rowCount === 0) {
    return res.status(404).json({ detail: "User does not exist" });
  }
  //compare password against db password
  const success = await bcrypt.compare(password, users.rows[0].hashed_password);
  if (success) {
    //create token
    const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });
    return res.status(200).json({ email: users.rows[0].email, token: token });
  } else {
    return res.status(401).json({ detail: "Incorrect password" });
  }
};

module.exports = {signup_controller, login_controller}
