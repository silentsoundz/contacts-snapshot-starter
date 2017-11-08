const router = require('express').Router()
const contactsRoutes = require('./contacts')
const contacts = require('../../models/contacts')
const authRoutes = require('./auth')
const middlewares = require('../middlewares')

router.get('/', (request, response, next) => {
  console.log("trying to log in");
  if (request.session.user) {
    console.log(request.session.user)
    contacts.findAll()
      .then((contacts) => { response.render('contacts/index', { contacts }) })
      .catch(error => next(error))
  } else {
    response.redirect('/users/signup')
  }
})

router.use('/contacts', contactsRoutes)
router.use('/users', authRoutes)
router.use(middlewares.logErrors)
router.use(middlewares.errorHandler)
router.use(middlewares.notFoundHandler)

module.exports = router
