const express = require("express")
const router = express.Router()
const _ = require("lodash")
const db = require("../db/db")
const bcrypt = require("bcrypt")
const shortId = require("shortid")


//
router.post("/login", (req, res) => {
  let{ body } = req
  let credentials = _.pick(body, ["username", "password"])
})

router.post("/signup", (req, res) => {
  let{ body } = req
  let { password, username: name, age, gender } = _.pick(body, ["username", "password", "age", "gender"])

  // is user already in db ?
  let users = db.get("users").value()
  let userFromDb = users.find((user) => user.name === name)
  let userNotFound = !userFromDb

  // let's check if a user was not found
  if (userNotFound) {
    // encrypt password
    let hash = bcrypt.hashSync(password, 10)

    // create user with the information, an id and hashed password
    let id = shortId.generate()
    let user = {
      id,
      name: name,
      password: hash,
      age,
      gender
    }

    // save user to db
    db.get("users")
      .push(user)
      .write()

    // sending response ok
    res.status(201).send("Registered")
  }
})


module.exports = router