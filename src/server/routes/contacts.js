const contacts = require('../../models/contacts')
const { userHasAccess } = require('./roles')
const router = require('express').Router()
const { renderError, renderUnauthorized } = require('../utils')
const { isLoggedIn } = require('../middlewares')

router.get('/', isLoggedIn, (request, response, next) => {
  contacts.findAll()
    .then((contact) => { response.render('contacts/index', { contact }) })
    .catch(error => next(error))
})


router.get('/search', (request, response, next) => {
  const query = request.query.q
  contacts.search(query)
    .then(function (contact) {
      if (contact) return response.render('contacts/index', { query, contact })
      next()
    })
    .catch(error => next(error))
})

router.get('/:contactId', (request, response, next) => {
  const { contactId } = request.params
  if (!contactId || !/^\d+$/.test(contactId)) return next()
  contacts.findById(contactId)
    .then(function (contact) {
      if (contact) return response.render('contacts/show', { contact })
      next()
    })
    .catch(error => next(error))
})

router.get('/new', isLoggedIn, (request, response) => {
  response.render('contacts/new')
})

router.post('/', (request, response, next) => {
  const { user } = request.session
  console.log("this is to create contact", request.session)
  console.log("are we here yet", request.session.user)
  const action = 'createContact'
  console.log(userHasAccess(user, action))
  if (userHasAccess(user, action)) {
    contacts.create(request.body)
      .then(function (contact) {
        if (contact) return response.redirect(`/contacts/${contact[0].id}`)
        next()
      })
      .catch(error => next(error))
  } else {
    renderUnauthorized(response)
  }
})


router.delete('/:contactId', (request, response, next) => {
  const contactId = request.params.contactId
  contacts.destroy(contactId)
    .then(function (contact) {
      if (contact) return response.redirect('/')
      next()
    })
    .catch(error => next(error))
})


module.exports = router
