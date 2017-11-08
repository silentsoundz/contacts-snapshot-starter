const users = require("../../models/db/users");
const router = require("express").Router();
const bcrypt = require("bcrypt");
// const myPlaintextPassword = request.body.password;

router.get("/login", (request, response) => {
  response.status(200).render("users/login");
});

/* eslint-disable */
router.post("/login", (request, response) => {
  const session = request.session;
  const { email, password } = request.body;
  users
    .findValidUser(email)
    .then(userData => {
      console.log("User Data: ", userData)

      return bcrypt.compare(password, userData.password, (err, result) => {
        if (err) {
          console.log("BCRYPT ERROR!!!", err)
        }
        if (result) {
          session.email = userData.email;
          session.role = userData.role;
          response.redirect("/");
        } else {
          console.log("password compare failed")
          response.render("users/login", {
            errorMsg: "Incorrect email or password"
          });
        }

      })

    })
    .catch(console.log);
});

router.get("/signup", (request, response) => {
  response.status(200).render("users/signup");
});

router.post("/signup", (request, response) => {
  console.log("I made it to post signup");
  const session = request.session;
  const { email, password, role } = request.body;
  session.email = request.body.email;
  session.role = request.body.role;
  const saltRounds = 10;
  bcrypt
    .hash(password, saltRounds)
    .then(hash => {
      console.log(hash);
      users.create(email, hash);
    })
    .then(userProfile => {
      response.redirect("/");
    })
    .catch(error => next(error));
});

module.exports = router;
