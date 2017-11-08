const users = require('./db/users')

function comparePasswords() {

}

module.exports = { ...users, comparePasswords }

// module.exports = {users.findValidUser, users.create}