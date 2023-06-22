const PORT = process.env.PORT ?? 8000;
const cors = require('cors');
const express = require('express');
const app = express();
const pool = require('./db');
const {v4: uuidv4} = require('uuid');


app.use(cors());
app.use(express.json());

// DEMO ROUTE get all todos
app.get('/todos/:userEmail', async (req, res)=>{

    const {userEmail} = req.params;

    await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
    .then((todos) => {
        console.log(todos.rows);
        res.json(todos.rows);

    })
    .catch((err) => {
        console.error(err);
    });   
    
});

// Create a new todo
app.post('/todos', async (req, res)=>{
    const {user_email, title, progress, date} = req.body;
    console.log(user_email, title, progress, date);
    //call uuidv4 to get a unique id
    const id = uuidv4();

    try {
        const insertion = await pool.query('INSERT INTO todos (id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, user_email, title, progress, date]);
        console.log(insertion.rows);
        res.json(insertion.rows);
    } 
    catch (error) {
        console.error(error);
    }
});

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
});
