module.exports = (sequelize, DataTypes) => {
    const scorecardName = sequelize.define('scorecard_names', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return scorecardName
}