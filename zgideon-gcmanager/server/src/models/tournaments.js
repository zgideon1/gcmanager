module.exports = (sequelize, DataTypes) => {
    const Tournament = sequelize.define('tournaments', {
        tournid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        userid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startTime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        endTime: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Tournament
}