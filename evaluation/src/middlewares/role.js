function checkRole(reqrole) {
    return async(req, res, next) => {
    const userRole = req.user.roles.map(role => role.name)
    const hashRole = reqrole.some(role => userRole.includes(role))

    if(!hashRole) {
        return res.json('Role not provided')
    }
    next()
}
}
module.exports = checkRole