const {employee_types:EmployeeType} = require('../models')

module.exports = {
    async createEmployeeType(req, res) {
        try {
            const employeeType = await EmployeeType.create(req.body)

            const typeJson = employeeType.toJSON()

            return res.send(typeJson)
        } catch(err) {
            res.status(400).send({
                error: 'Employee type could not be created.'
            })
        }
    },
    async getEmployeeTypes(req, res) {
        try {
            const employeeTypes = await EmployeeType.findAll()            

            const typeJson = employeeTypes.map(t => t.toJSON())

            return res.send(typeJson)
        } catch(err) {
            res.status(400).send({
                error: 'Employee types could not be loaded.'
            })
        }
    },
    async getEmployeeType(req, res) {
        try {
            const type = await EmployeeType.findOne({ where: { id: req.params.id } });

            if (!type) {
                return res.status(400).send({ error: 'Employee type not found' });
            }

            return res.send(type.toJSON());
        } catch(err) {
            res.status(400).send({
                error: 'Employee type could not be found.'
            })
        }
    },
    async updateEmployeeType(req, res) {
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

            return res.send({ message: 'Employee updated successfully' })
        } catch (err) {
            res.status(400).send({
                error: 'Employee could not be updated'
            })
        }
    },
    async deleteEmployeeType(req, res) {
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