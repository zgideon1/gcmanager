module.exports = (sequelize, DataTypes) => {
    const SCHole = sequelize.define('scorecard_holes', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        scorecard_holeid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        holenum: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        par: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return SCHole
}