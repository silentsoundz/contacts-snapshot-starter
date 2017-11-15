const renderError = function (error, request, response) {
  response.send(`ERROR: ${error.message}\n\n${error.stack}`)
}

const renderUnauthorized = (response) => {
  response.send('You do not have access to this page.')
}

module.exports = { renderError, renderUnauthorized }
