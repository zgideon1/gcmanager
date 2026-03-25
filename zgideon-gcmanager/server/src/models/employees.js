module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('employees', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        employee_uid: {
            type: DataTypes.INTEGER,
            allowNull:false
        }
    }, {
        timestamps:false
    })

    return Employee
}