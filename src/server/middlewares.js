const errorHandler = (error, request, response, next) => {
  response.status(500).send('Something bad happened. This page should be nicer looking')
}

const logErrors = (error, request, response, next) => {
  console.error(error.stack)
  next(error)
}

const notFoundHandler = (request, response) => {
  response.status(404).render('common/not_found')
}

const setDefaultResponseLocals = (request, response, next) => {
  response.locals.query = ''
  response.locals.errorMessage = undefined

  if (response.locals.session) {
    response.locals.session = true
  } else {
    response.locals.session = false
  }

  next()
}

const isLoggedIn = (request, response, next) => {
  console.log("checking test test")
  if (!request.session.user) {
    response.redirect('/users/login')
  } else {
    next()
  }
}

module.exports = {
  errorHandler, logErrors, notFoundHandler, setDefaultResponseLocals, isLoggedIn
}
