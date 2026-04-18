const {course_scorecards:CourseScorecard, holes:Hole } = require('../models')

module.exports = {
    async postScorecard(req, res) {
    try {
        const { name, holes } = req.body

        console.log(name)
        console.log(holes)

        const scorecard = await CourseScorecard.create(
            {
                name,
                holes: holes
            },
            {
                include: [{ model: Hole }]
            }
        )

        const result = await CourseScorecard.findOne({
            where: { id: scorecard.id },
            include: [Hole]
        })

        return res.status(200).send(result)

        } catch (err) {
            console.log(err)
            return res.status(400).send({
                error: 'Scorecard could not be created.'
            })
        }
    },
    async viewScorecards(req, res) {
        try {
            const scorecards = await CourseScorecard.findAll({
                include: [
                    {
                        model: Hole,
                        attributes: ['holenum', 'par', 'yardage']
                    }
                ]})
            
            if (scorecards.length === 0) {
                return res.status(404).send({error: 'No scorecards found'})
            }

            const scJSON = scorecards.map(sc => sc.toJSON())

            return res.send(scJSON)
        } catch(err) {
            console.log(err)
            res.status(400).send({
                error: 'Your scorecards could not be loaded.'
            })
        }
    },
    async viewScorecard(req, res) {

    },
    async editScorecard(req, res) {
        try {
            const { id } = req.params

            const scorecard = await CourseScorecard.findByPk(id)

            return res.send({ message: 'Scorecard updated successfully' })
        } catch (err) {
            res.status(400).send({
                error: 'Scorecard could not be updated'
            })
        }
    },
    async deleteScorecard(req, res) {
            try {

            const sc = await CourseScorecard.findOne({
            where: { id: req.params.id }
            })

            if (!sc) {
            return res.status(404).send({
                error: 'Scorecard not found.'
            })
            }

            if (req.user.role === 3) {
                await Hole.destroy({
                    where: { sc_id: sc.id },
                })


                await sc.destroy()
                return res.status(204).send()
            }

            return res.status(403).send({
            error: 'Not authorized to delete this scorecard.'
            })

        } catch (err) {
            res.status(400).send({
            error: 'Scorecard could not be deleted.'
            })
        }
    }
}