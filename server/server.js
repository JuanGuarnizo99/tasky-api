const PORT = process.env.PORT ?? 8000;
const express = require('express');
const app = express();
const pool = require('./db');

//get all todos
app.get('/todos', async (req, res)=>{
    try{
        const todos = await pool.query('SELECT * FROM todos');
        res.json(todos.rows);
    }
    catch(err){
        console.error(err);
    }
});

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
});
