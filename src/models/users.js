const users = require('./db/users')
const bcrypt = require("bcrypt")

const comparePasswords = (user, password) => bcrypt.compare(password, user.password)


module.exports = { ...users, comparePasswords }

