const db = require('./db')

const admin = function () {
  return db.query(`INSERT INTO
     users (email, password, role)
     VALUES
     ('admin@admin.com', 'admin', 'admin')
     RETURNING
      *
     `)
}
const create = function (email, password) {
  return db.query(
    `INSERT INTO
    users (email, password)
    VALUES
    ($1::text, $2::text)
    RETURNING
     *
    `,
    [
      email,
      password
    ]
  )
    .catch((error) => {
      console.error({
        message: 'Error occurred while executing contacts.create',
        arguments
      })
      throw error
    })
}

const findValidUser = function (email) {
  return db.one(`SELECT * FROM users
      WHERE email = $1`, [email])
}

module.exports = {
  create, findValidUser
}
