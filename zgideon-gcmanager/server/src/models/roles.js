module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('roles', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        rolename: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Role
}