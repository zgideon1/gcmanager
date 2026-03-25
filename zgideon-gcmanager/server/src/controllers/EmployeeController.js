const {employees:Employee, users:User} = require('../models')

module.exports = {
    async createEmployee(req, res) {
        try {
            const employee = await Employee.create(req.body)

            const employeeJson = employee.toJSON()

            res.send(employeeJson)
        } catch(err) {
            res.status(400).send({
                error: 'Employee could not be created.'
            })
        }
    },
    async getEmployees(req, res) {
        try {
            const employees = await Employee.findAll({
                include: [
            {
                model: User,
                attributes: ['uid', 'firstname', 'lastname']
            }]})

            const employeeJson = employees.map(e => ({
                id: e.id,
                firstname: e.user.firstname,
                lastname: e.user.lastname
            }))

            res.send(employeeJson)
        } catch(err) {
            res.status(400).send({
                error: 'Employees could not be loaded.'
            })
        }
    },
    async getEmployee(req, res) {
        try {
            const employee = await Employee.findOne({
                where: {id: req.params.id}
            })

            if(!employee) {
                return res.status(400).send({
                    error: 'Employee could not be found with specified id.'
                })
            }

            const employeeJson = employee.toJSON()
            return res.send(employeeJson)
        } catch(err) {
            res.status(400).send({
                error: 'Employee could not be found.'
            })
        }
    },
    async updateEmployee(req, res) {
        try {
            const { id } = req.params
            const { employeeData } = req.body

            const employee = await Employee.findByPk(id)

            if (!employee) {
                return res.status(404).send({ error: 'Employee not found' })
            }

            if (req.user.role != 3) {
                return res.status(403).send({ error: 'Unauthorized' })
            }

            await employee.update(employeeData)

            res.send({ message: 'Employee updated successfully' })
        } catch (err) {
            res.status(400).send({
                error: 'Employee could not be updated'
            })
        }
    },
    async deleteEmployee(req, res) {
        try {
            const employee = await Employee.findOne({
                where: {id: req.params.id}
            })
            
            if(!employee) {
                return res.status(400).send({
                    error: 'Employee not found.'
                })
            }

            if(req.user.role === 3) {
                await employee.destroy()
                return res.status(204).send()
            }
            else {
                return res.status(403).send({
                    error: 'Not authorized to delete this employee.'
                })
            }
        } catch(err) {
            res.status(400).send({
                error: 'Employee could not be deleted.'
            })
        }
    }
}