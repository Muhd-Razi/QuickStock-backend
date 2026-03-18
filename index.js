const express = require('express')
const db= require('./config/db')
const cors = require('cors')
const router = require('./router/route');
const app=express()

app.use(cors());
app.use(express.json());


app.use(router)
app.use('/uploads',express.static('./uploads'))

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`server running on${port}`)
})