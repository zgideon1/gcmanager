const {tourns:Tournament} = require('../models')

module.exports = {
    async create (req, res) {
            try {
                const tournament = await Tournament.create(req.body)
    
                const tournJson = tournament.toJSON()
    
                return res.send(tournJson)
            } catch (err) {
                return res.status(400).send({
                    error: 'Tournament could not be created.'
                })
            }
        },
    async getAll(req, res) {
        try {
            const tournaments = await Tournaments.create(req.body)

            const tournJson = tournaments.toJSON()

            return res.send(tournJson)
        } catch (err) {
            return null;
        }
    },
    async get(req, res) {
        try {
            const tournament = await Tournaments.findAll(t => t.id == req.body.id)

            const tournJson = tournament.toJSON()

            return res.send(tournJson)
        } catch(err) {
            return null;
        }
    },
    async delete(req, res) {
        try {
            return null;
        } catch(err) {
            return null;
        }
    }
}