const express = require("express")
const path = require("path")
const app = express()
const cookieParser = require("cookie-parser")
const ownersRouter = require("./routes/ownersRouter.js")
const usersRouter = require("./routes/usersRouter.js")
const productRouter = require("./routes/produtsRouters.js")

const db = require("./config/mongoose-connection.js")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")


app.use("/owners", ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productRouter)


app.listen(3000);