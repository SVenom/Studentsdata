const express = require("express")
const app = express()
const route = require("./routes/routs")
const db = require("./utils/db")
const bodyParser = require("body-parser")

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }))

app.use(route)
// app.use(express.json())
db()
// app.get("/",(req,res,next)=>{
//     res.send("hello World")
// })



app.listen(4000,()=>{
    console.log("Server running on 4000");
})