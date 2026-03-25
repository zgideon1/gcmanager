const { teetimes:Teetime, users:User } = require('../models')

module.exports = {
    async bookTeetime(req, res) {
        try {
            const teeTime = await Teetime.create(req.body)

            const ttJson = teeTime.toJSON()

            return res.send(ttJson)
        } catch(err) {
            res.status(400).send({
                error: 'Tee time could not be posted.'
            })
        }
    },
    async viewTeetimes(req, res) {
        try {
            const teeTimes = await Teetime.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['firstname', 'lastname']
                    }
                ]
            })

            const ttJson = teeTimes.map(t => t.toJSON())

            return res.send(ttJson)
        } catch(err) {
            res.status(400).send({
                error: 'Tee times could not be loaded.'
            })
        }
    },
    async delete(req, res) {
    try {

        const teeTime = await Teetime.findOne({
        where: { teeid: req.params.teeid }
        })

        if (!teeTime) {
        return res.status(404).send({
            error: 'Tee time not found.'
        })
        }

        if (req.user.role === 3 || teeTime.userid === req.user.uid) {
        await teeTime.destroy()
        return res.status(204).send()
        }

        return res.status(403).send({
        error: 'Not authorized to delete this tee time.'
        })

    } catch (err) {
        res.status(400).send({
        error: 'Tee time could not be deleted.'
        })
    }}
}