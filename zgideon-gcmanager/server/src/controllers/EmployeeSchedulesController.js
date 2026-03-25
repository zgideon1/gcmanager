const {employees:Employee, schedules:Schedule, users:User} = require('../models')

module.exports = {
    async createSchedule(req, res) {
        try {
            const schedule = await Schedule.create(req.body)

            const scheduleJson = schedule.toJSON()

            res.send(scheduleJson)
        } catch(err) {
            res.status(400).send({
                error: 'Schedule could not be created.'
            })
        }
    },
    async getSchedules(req, res) {
        try {
            const schedules = await Schedule.findAll({
            include: [
                {
                    model: Employee,
                    include: [
                        {
                        model: User,
                        attributes: ['firstname']
                        }]
            }]})

            const result = schedules.map(s => ({
                sid: s.sid,
                starttime: s.starttime,
                endtime: s.endtime,
                firstname: s.employee.user.firstname
            }))

            res.send(result)
        } catch(err) {
            res.status(400).send({
                error: 'Schedules could not be loaded.'
            })
        }
    },
    async getSchedule(req, res) {
        try {
            const schedule = await Schedule.findOne({
                where: {id: req.params.sid}
            })

            const scheduleJSON = schedule.toJSON()

            return res.send(scheduleJSON)
        } catch(err) {

        }
    },
    async updateSchedule(req, res) {
        try {
            const { id } = req.params

            const schedule = await Schedule.findByPk(id)

            if (!schedule) {
            return res.status(404).send({
                error: 'Schedule not found'
            })
            }

            await schedule.update({
            schedule_employeeid: req.body.schedule_employeeid,
            starttime: req.body.starttime,
            endtime: req.body.endtime
            })

            res.send(schedule.toJSON())
        } catch (err) {
            console.error(err)
            res.status(400).send({
            error: 'Schedule could not be updated'
            })
        }
    },  
    async deleteSchedule(req, res) {
        try {
            const { id } = req.params

            const schedule = await Schedule.findByPk(id)

            if (!schedule) {
            return res.status(404).send({
                error: 'Schedule not found'
            })
            }

            await schedule.destroy()

            res.send({
            message: 'Schedule deleted successfully'
            })

        } catch (err) {
            console.error(err)
            res.status(400).send({
            error: 'Schedule could not be deleted'
            })
        }
    }
}