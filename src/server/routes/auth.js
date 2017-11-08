const users = require("../../models/users")
const router = require("express").Router()
const bcrypt = require("bcrypt")


router.get("/login", (request, response) => {
  response.status(200).render("users/login", {
    errorMsg: ""
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
      } else {
        users.comparePasswords(userData, password)
          .then((result) => {
            if (result) {
              session.user = user
              response.status(200).redirect('/')
            } else {
              response.render("users/login", {
                errorMsg: "Incorrect email or password"
              })
            }
          })
      }
    })
})

router.get("/signup", (request, response) => {
  response.status(200).render("users/signup")
})

router.post("/signup", (request, response) => {
  const session = request.session
  const { email, password, role } = request.body
  session.email = request.body.email
  session.role = request.body.role
  const saltRounds = 10
  bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      users.create(email, hash)
    })
    .then((userProfile) => {
      response.redirect("/")
    })
    .catch(error => next(error))
})

module.exports = router
