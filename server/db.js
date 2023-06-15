const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: 'tasky'
});

const test_connection = async () => {
    try{
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', ['juansito@gmail.com']);
        console.log(todos.rows);
    }
    catch(err){
        console.error(err);
    }
};

test_connection();


module.exports = pool;
