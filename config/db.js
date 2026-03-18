require('dotenv').config()
const mongoose = require('mongoose')

dbString= process.env.connectionString

mongoose.connect(dbString).then(()=>{
    console.log('Mongodb connected')
}).catch((err)=>{
    console.log('mongodb connecting error'+err)
})