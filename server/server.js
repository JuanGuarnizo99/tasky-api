const PORT = process.env.PORT ?? 8000;
const express = require('express');
const app = express();
const pool = require('./db');

// DEMO ROUTE get all todos
app.get('/todos', async (req, res)=>{

    const userEmail = "juansito1@test.com"

    try{
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail]);
        res.json(todos.rows);
    }
    catch(err){
        console.error(err);
    }
});

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
});
