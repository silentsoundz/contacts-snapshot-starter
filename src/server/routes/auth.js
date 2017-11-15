const users = require("../../models/users")
const router = require("express").Router()
const bcrypt = require("bcrypt")

router.get("/login", (request, response) => {
  response.status(200).render("users/login", {
    errorMsg: "You are not signed up."
  })
})


router.post("/login", (request, response) => {
  const { session } = request
  const { email, password } = request.body
  const user = { email, password }
  users
    .findValidUser(email)
    .then((userData) => {
      if (!userData) {
        response.render("users/login", {
          errorMsg: "Incorrect email or password"
        })
      }
      return userData
    })
    .then((userData) => {
      users.comparePasswords(password, userData)
        .then((result) => {
          if (result) {
            session.user = userData
            response.status(200).redirect('/contacts')
          }
          response.render("users/login", {
            errorMsg: "Incorrect email or password"
          })
        })
    })
    .catch((error) => {
      console.log("this is a bad one", error)
    })
})

router.get("/signup", (request, response) => {
  response.status(200).render("users/signup")
})

router.post("/signup", (request, response) => {
  const { session } = request
  const { email, password, role } = request.body
  session.email = email
  session.role = role
  const saltRounds = 10
  bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      users.create(email, hash)
    })
    .then((userProfile) => {
      response.redirect("/contacts")
    })
    .catch(error => next(error))
})

module.exports = router
