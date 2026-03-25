module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define('schedules', {
        sid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        schedule_employeeid: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
        starttime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endtime: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        timestamps:false
    })

    return Schedule
}