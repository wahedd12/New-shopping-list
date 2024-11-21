const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoutes = require("./routes/user")

const app = express()
const port = 3000

app.use(express.json())
app.use("/user", userRoutes)


dotenv.config()
mongoose.connect(process.env.MONGO_DB).then(()=>{
    console.log("mongoose connected")
})

app.listen(port, ()=>{
    console.log("seerver on 3000")
})  

module.exports = app