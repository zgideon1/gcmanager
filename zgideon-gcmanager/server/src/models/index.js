const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config.js')

const db = {}

const sequelize = new Sequelize (
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options,
)

fs
.readdirSync(__dirname)
.filter(file => file !== 'index.js' && file.endsWith('.js'))
.forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
})

db.sequelize = sequelize

db.teetimes.belongsTo(db.users, {
    foreignKey: 'tt_user_id',
    targetKey: 'uid'
})

db.users.hasMany(db.teetimes, {
  foreignKey: 'tt_user_id',
  sourceKey: 'uid'
})

db.users.hasOne(db.employees, {
  foreignKey: 'employee_uid'
})

db.employees.belongsTo(db.users, {
    foreignKey: 'employee_uid'
})

db.schedules.belongsTo(db.employees, {
  foreignKey: 'schedule_employeeid'
})

db.employees.belongsTo(db.employee_types, { foreignKey: 'type_id', as: 'role' });

db.employee_types.hasMany(db.employees, { foreignKey: 'type_id' });

module.exports = db