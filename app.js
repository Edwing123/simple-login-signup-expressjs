require("./source/config/env")
const path = require("path")
const db = require("./source/db/db")

// server and routes
const express = require("express")
const app = express()
const authRouter = require("./source/routes/auth")


// middleware modules
const bodyParser = require("body-parser")
const morgan = require("morgan")


// static files
app.use("/static", express.static(path.resolve("./public")))


// settings
app.set("views", "./source/views")
app.set("view engine", "ejs")


// using middlewares app
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan("tiny"))


// middleware routing
app.use("/auth", authRouter)


// routes
app.get("/", (req, res) => {
  res.render("pages/index")
})

app.get("/login", (req, res) => {
  res.render("pages/login")
})

app.get("/signup", (req, res) => {
  res.render("pages/signup", {
    registered: false
  })
})

app.get("/about", (req, res) => {
  res.render("pages/about")
})

app.get("*", (req, res) => {
  res.status(404).render("pages/errors/not-found")
})


// launching server
const port = process.env.PORT
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`)
})
