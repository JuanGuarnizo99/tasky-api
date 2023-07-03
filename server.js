const PORT = process.env.PORT ?? 8000;
const cors = require('cors');
const express = require('express');
const app = express();
const pool = require('./db');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


app.use(cors());
app.use(express.json());

// DEMO ROUTE get all todos
app.get('/todos/:userEmail', async (req, res)=>{

    const {userEmail} = req.params;

    await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
    .then((todos) => {
        console.log(todos.rows);
        return res.json(todos.rows);

    })
    .catch((err) => {
        console.error(err);
    });   
    
});

// Create a new todo
app.post('/todos', async (req, res)=>{
    const {user_email, title, progress, date} = req.body;
    console.log(user_email, title, progress, date);
    // call uuidv4 to get a unique id
    const id = uuidv4();
    // insert the todo into the database
    await pool.query('INSERT INTO todos (id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [id, user_email, title, progress, date])
    .then((newTask) => {
        console.log(newTask.rows);
        return res.status(200).json(newTask.rows);
    })
    .catch((err) => {
        console.error(err);
    }); 
});

// Edit a todo
app.put('/todos/:id', async (req, res)=>{
    const {id} = req.params;
    const {user_email, title, progress, date} = req.body;

    await pool.query('UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5 RETURNING *',
    [user_email, title, progress, date, id])
   .then((newTask) => {
        console.log(newTask.rows);
        return res.status(200).json(newTask.rows);
    })
   .catch((err) => {
        console.error(err);
    }); 
});

// Delete a todo
app.delete('/todos/:id', async (req, res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id])
    .then((deletedTask) => {
        console.log(deletedTask.rows);
        return res.status(200).json(deletedTask.rows);
    })
    .catch((err) => console.error(err));
});

// login route
app.post('/login', async (req, res)=>{
    //get data from client
    const {email, password} = req.body;
    //get the user from the db
    const users = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    //check for 'user not in database' error
    if(users.rowCount === 0) {
        return res.status(404).json({detail: 'User does not exist'});
    }
    //compare password against db password
    const success = await bcrypt.compare(password, users.rows[0].hashed_password);
    if(success) {
        //create token
        const token = jwt.sign({email}, 'secret', {expiresIn: '1h'});
        return res.status(200).json({'email': users.rows[0].email, 'token': token});
    }
    else{
        return res.status(401).json({'detail': 'Incorrect password'});
    }

})

// sign up route
app.post('/signup', async (req, res)=>{
    //Get data from client
    const {email, password} = req.body;
    //Create the hashsed password
    const hashedPassword = await bcrypt.hash(password, 10);
    //Insert the hashsed password in the database
    await pool.query('INSERT INTO users (email, hashed_password) VALUES ($1, $2) RETURNING email', [email, hashedPassword])
    .then(() => {
        console.log(email);
        //create token
        const token = jwt.sign({email}, 'secret', {expiresIn: '1h'});
        //send response with eamil and token for the cookies
        return res.status(200).json({'email': email, 'token': token});
    })
    .catch((error) => { return res.json({'detail': error.detail})});


});


app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
});
