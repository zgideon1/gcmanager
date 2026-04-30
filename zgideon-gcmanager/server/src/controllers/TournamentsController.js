const {tournaments:Tournament} = require('../models')

module.exports = {
    async createTournament(req, res) {
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
    async getTournaments(req, res) {
        try {
            const tournaments = await Tournament.findAll()

            const tournJson = tournaments.map(t => t.toJSON())

            return res.send(tournJson)
        } catch (err) {
            console.log(err)
            return res.status(400).send({
                error: 'Tournaments could not be loaded.'
            })
        }
    },
    async editTournament(req, res) {
        try {
            const { id } = req.params

            const tournament = await Tournament.findByPk(id)

            if(!tournament) {
                return res.status(404).send({
                    error: 'Tournament not found'
                })
            }

            await tournament.update({
                starttime: req.body.starttime,
                endtime: req.body.endtime
            })

            return res.send(tournament.toJSON())
        } catch (err) {
            res.status(400).send({
                error: 'Tournament could not be updated'
            })
        }
    },
    async getTournament(req, res) {
        try {
            const tournament = await Tournaments.findAll(t => t.id == req.body.id)

            const tournJson = tournament.toJSON()

            return res.send(tournJson)
        } catch(err) {
            return null;
        }
    },
    async deleteTournament(req, res) {
        try {
            const { id } = req.params

            const tournament = await Tournament.findByPk(id)

            if(!tournament) {
                return res.status(404).send({
                    error: 'Tournament not found'
                })
            }

            await tournament.destroy()

            return res.send({
            message: 'Tournament deleted successfully'
            })

        } catch (err) {
            res.status(400).send({
            error: 'Tournament could not be deleted'
            })
        }
    }
}