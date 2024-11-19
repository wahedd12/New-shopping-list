const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")



const app = express()
const port = 3000

dotenv.config()

mongoose.connect(process.env.MONGO_DB).then(()=>{
    console.log("mongoose connected")
})

app.listen(port, ()=>{
    console.log("seerver on 3000")
})