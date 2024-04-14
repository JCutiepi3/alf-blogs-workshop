require('dotenv').config();
const express = require('express');
const app = express();
const connectDb = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware')

//connection to Database
connectDb();
//server
app.use(express.static('public'))

app.get('/AWS', (req, res) =>{
    res.status(200).json({message: 'HELLO MHIMASAUR'});
})

//Post Routes:

const PostRouter = require('./routers/postRouter')
app.use('/posts', PostRouter)

app.use(errorHandler)

app.listen(8080, ()=>{
    console.log('Server is running in port 8080');
})