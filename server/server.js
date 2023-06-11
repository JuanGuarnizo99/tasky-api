const PORT = process.env.PORT ?? 8000;
const cors = require('cors');
const express = require('express');
const app = express();
const pool = require('./db');


app.use(cors());

// DEMO ROUTE get all todos
app.get('/todos/:userEmail', async (req, res)=>{

    console.log(req);
    const {userEmail} = req.params;

    try{
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail]);
        console.log(todos.rows);
        res.json(todos.rows);
    }
    catch(err){
        console.error(err);
    }
});

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
});
