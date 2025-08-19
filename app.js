const express = require("express")
const path = require("path")
const app = express()
const cookieParser = require("cookie-parser")
const expressSession = require("express-session")
const flash = require("connect-flash")

const ownersRouter = require("./routes/ownersRouter.js")
const usersRouter = require("./routes/usersRouter.js")
const productRouter = require("./routes/produtsRouters.js")
const indexRouter = require("./routes/index.js")  

require("dotenv").config();

const db = require("./config/mongoose-connection.js")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
}))
app.use(flash());
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")


app.use("/", indexRouter)      
app.use("/owners", ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productRouter)

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000")
});
