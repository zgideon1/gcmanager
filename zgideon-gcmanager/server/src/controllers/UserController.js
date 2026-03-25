const {users:User} = require('../models')

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.findAll()

            const userJson = users.map(u => u.toJSON())

            return res.send(userJson)
        } catch(err) {
            res.status(400).send({
                error: 'Users could not be loaded.'
            })
        }
    },
    async getUser(req, res) {
        try {
            const user = await User.findOne({
                where: {uid: req.params.uid}
            })

            if(!user) {
                return res.status(400).send({
                    error: 'User could not be found with specified id.'
                })
            }

            const userJson = user.toJSON()
            return res.send(userJson)
        } catch(err) {
            res.status(400).send({
                error: 'User could not be loaded'
            })
        }
    }
}