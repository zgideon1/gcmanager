module.exports = (sequelize, DataTypes) => {
    const EmployeeType = sequelize.define('employee_types', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false
        }
    }, {
        timestamps:false,
        freezeTableName: true
    })

    return EmployeeType
}