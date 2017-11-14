const allUsers = ['admin', 'basic']

const capabilityRoles = {
  viewContacts: ['admin', 'basic'],
  viewContact: ['admin', 'basic'],
  createContact: ['admin'],
  deleteContact: ['admin']
}

const userHasAccess = (user, action) => {
  const { role } = user
  const allActions = Object.keys(capabilityRoles)
  const isValidRole = allUsers.includes(role)
  if (!isValidRole) {
    throw new Error(`User with email: ${user.email} does not have a role!`)
  } else if (!allActions.includes(action)) {
    throw new Error(`Tried to get permissions for an invalid action. Action: ${action}`)
  } else {
    const capabilities = capabilityRoles[action]
    return capabilities.includes(user.role)
  }
}

module.exports = { userHasAccess }
