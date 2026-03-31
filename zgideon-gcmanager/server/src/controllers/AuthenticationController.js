const {users: User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register (req, res) {
        try {
            const user = await User.create(req.body)

            const userJson = user.toJSON()
            delete userJson.password

            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err) {
            res.status(400).send({
                error: 'This email account is already in use.'
            })
        }
    },
    async login (req, res) {
        try{
            const {email, password} = req.body
            const user = await User.findOne({
                where: {email}
            })
            if(!user) {
                return res.status(403).send({
                    error: 'No user. The login information was incorrect'
                })
            }
            const validPassword = await user.comparePassword(password)

            if(!validPassword) {
                return res.status(403).send({
                    error: 'Password incorrect. The login information was incorrect'
                })
            }
            const secureUser = user 
            secureUser.password = null

            const userJson = secureUser.toJSON()

            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured while trying to login'
            })
        }
    },
    async getUsers(req, res) {
        try {
            const users = await User.findAll({
                attributes: ['uid', 'firstname', 'lastname','email', 'role', 'handicap']
            })

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
                where: {uid: req.params.uid}, attributes: ['uid', 'firstname', 'lastname','email', 'role', 'handicap']
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