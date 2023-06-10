const PORT = process.env.PORT ?? 8000;
const express = require('express');
const app = express();

// //get all todos
// app.get('/todos', async (req, res)=>{
//     try{

//     }
//     catch(err){
//         console.error(err);
//     }
// });

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
});
