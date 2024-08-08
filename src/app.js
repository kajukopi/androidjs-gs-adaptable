require("dotenv").config()
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const logger = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const hbs = require("hbs")

hbs.registerHelper("localDate", function (dateTimeString, options) {
  const date = new Date(dateTimeString)
  const localDateString = date.toLocaleDateString("ID-id")
  return localDateString
})

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to mongodb!")
  })
  .catch((error) => {
    console.log(error)
  })

const app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.use(cookieParser())
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))
app.use("/assets", express.static(path.join(__dirname, "..", "/assets")))
app.use(
  session({
    secret: "karimroy",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60 * 60000},
  })
)

// Routes
app.use("/", require("./routes/"))

module.exports = app
