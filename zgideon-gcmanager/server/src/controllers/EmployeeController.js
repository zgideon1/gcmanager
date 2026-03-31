const {employees:Employee, users:User, schedules:Schedule, employee_types:EmployeeType} = require('../models')

module.exports = {
    async createEmployee(req, res) {
        try {
            const employee = await Employee.create(req.body)

            const employeeJson = employee.toJSON()

            res.send('Employee created successfully')
        } catch(err) {
            console.log(err)
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
            },
            {
                model: EmployeeType,
                as: 'role',
                attributes: ['id', 'name']
            }
        ]})

            const employeeJson = employees.map(e => ({
                id: e.id,
                firstname: e.user.firstname,
                lastname: e.user.lastname,
                type_id: e.role?.id || null,
                role_name: e.role?.name || null
            }))

            return res.send(employeeJson)
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
            const employeeData = req.body

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
            const employeeId = parseInt(req.params.id, 10);
            
            const employee = await Employee.findOne({
                where: {id: employeeId}
            })
            
            if(!employee) {
                return res.status(400).send({
                    error: 'Employee not found.'
                })
            }

            if(req.user.role === 3) {
                await Schedule.destroy({ where: { schedule_employeeid: employee.id } });
                await employee.destroy()
                return res.status(200).send({message: 'Employee deleted successfully'})
            }
            else {
                return res.status(403).send({
                    error: 'Not authorized to delete this employee.'
                })
            }
        } catch(err) {
            console.error('Delete error:', err)
            res.status(400).send({
                error: 'Employee could not be deleted.'
            })
        }
    }
}