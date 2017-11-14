const contacts = require('../../models/contacts')
const userHasAccess = require('./roles')
const router = require('express').Router()
const { renderError, renderUnauthorized } = require('../utils')

router.get('/', (request, response, next) => {
  if (!request.session.user.email) {
    response.redirect('/users/login')
  } else {
    contacts.findAll()
      .then((contacts) => { response.render('contacts/index', { contacts }) })
      .catch(error => next(error))
  }
})


router.get('/search', (request, response, next) => {
  const query = request.query.q
  contacts.search(query)
    .then(function (contacts) {
      if (contacts) return response.render('contacts/index', { query, contacts })
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

router.get('/new', (request, response) => {
  response.render('contacts/new')
})

router.post('/', (request, response, next) => {
  const { user } = request
  console.log(request.session)
  const action = 'createContact'
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
