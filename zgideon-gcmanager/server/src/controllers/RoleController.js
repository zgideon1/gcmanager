const {roles:Role} = require('../models')

module.exports = {
    async getRoles(req, res) {
        try {
            const roles = await Role.findAll()

            const rolesJson = roles.map(r => r.toJSON())

            return res.send(rolesJson)
        } catch(err) {
            res.status(400).send({
                error: 'Roles could not be loaded.'
            })
        }
    },
    async getRole(req, res) {
        try {
            const role = await Role.findAll({
                where: { id: req.params.id }
            })
            const roleJson = role.toJSON()

            return res.send(roleJson)
        } catch(err) {
            res.status(400).send({
                error: 'Role could not be loaded.'
            })
        }
    }
}