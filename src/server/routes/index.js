const router = require('express').Router()
const contactsRoutes = require('./contacts')
const contacts = require('../../models/contacts')
const authRoutes = require('./auth')
const middlewares = require('../middlewares')

router.get('/', (request, response, next) => {
  response.render('contacts/splash')
})

router.get('/logout', (request, response) => {
  request.session.destroy(err => console.log)
  response.redirect('/users/login')
})

router.use('/contacts', contactsRoutes)
router.use('/users', authRoutes)
router.use(middlewares.logErrors)
router.use(middlewares.errorHandler)
router.use(middlewares.notFoundHandler)

module.exports = router
