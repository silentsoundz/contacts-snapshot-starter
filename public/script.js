document.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM fully loaded and parsed")

  const confirmDelete = function (event) {
    if (!confirm('Are you sure you want to delete this contact?')) {
      event.preventDefault()
    }
  };
  [].forEach.call(document.querySelectorAll('.delete-contact'), function (link) {
    link.addEventListener("click", confirmDelete)
  })

  const isBlank = function (value) {
    return !value || /^\s*$/.test(value)
  }


  const newContactform = document.querySelector('.new-contact-form')
  if (newContactform) {
    newContactform.addEventListener('submit', function (event) {
      const errors = []

      const validateInput = function (name, humanizedName) {
        const input = newContactform.querySelector(`input[name="${name}"]`)
        if (isBlank(input.value)) {
          errors.push(`${humanizedName} cannot be blank`)
        }
      }

      validateInput('first_name', 'First name')
      validateInput('last_name', 'Last name')

      if (errors.length) {
        event.preventDefault()
        newContactform.querySelector('.new-contact-form-errors').innerText = errors.join("\n")
      }
    })
  }
})
