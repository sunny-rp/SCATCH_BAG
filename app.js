const express = require("express")
const path = require("path")
const app = express()
const cookieParser = require("cookie-parser")

const db = require("./config/mongoose-connection.js")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")


app.get("/", (req,res)=>{
    res.send("hello bro..............!!!!!!!!!!!!!!")
})

app.listen(3000);