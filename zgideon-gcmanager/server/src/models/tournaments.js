module.exports = (sequelize, DataTypes) => {
    const Tournament = sequelize.define('tournaments', {
        tournid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contactemail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gametype: {
            type: DataTypes.STRING
        },
        starttime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endtime: {
            type: DataTypes.DATE,
        },
        estamtplayers: {
            type: DataTypes.STRING
        }
    }, {
        timestamps:false
    }
)
    return Tournament
}