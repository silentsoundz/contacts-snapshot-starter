const users = require('./db/users')
const bcrypt = require("bcrypt")

const comparePasswords = (password, user) => bcrypt.compare(password, user.password)


module.exports = { ...users, comparePasswords }
