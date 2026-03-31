const {scores:Score, holes:Hole} = require('../models')

module.exports = {
    async postScore(req, res) {
        try {
            const score = await Score.create(req.body)

            const scoreJson = score.toJSON()

            return res.send(scoreJson)
        } catch(err) {
            res.status(400).send({
                error: 'Score could not be recorded.'
            })
        }
    },
    async viewScores(req, res) {
        try {
            const scores = await Score.findAll( {
                where: {
                    score_uid: req.user.id
                }
            })

            return res.send(scores)
        } catch(err) {
            res.status(400).send({
                error: 'Your scores could not be loaded.'
            })
        }
    },
    async editScore(req, res) {
        try {
            const { id } = req.params
            const { holes, ...scoreData } = req.body

            const score = await Score.findByPk(id)

            if (!score) {
                return res.status(404).send({ error: 'Score not found' })
            }

            if (score.score_uid !== req.user.id) {
                return res.status(403).send({ error: 'Unauthorized' })
            }

            await score.update(scoreData)

            if (Array.isArray(holes)) {
                const updates = holes.map((strokes, index) => {
                    return Hole.upsert({
                        score_id: id,
                        hole_number: index + 1,
                        strokes
                    })
                })

                await Promise.all(updates)
            }

            return res.send({ message: 'Score updated successfully' })
        } catch (err) {
            res.status(400).send({
                error: 'Score could not be updated'
            })
        }
    },
    async deleteScore(req, res) {
        try {

        } catch(err) {

        }
    }
}