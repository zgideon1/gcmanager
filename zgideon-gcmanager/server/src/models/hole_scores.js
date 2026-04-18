module.exports = (sequelize, DataTypes) => {
    const HoleScore = sequelize.define('hole_scores', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        score_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hole_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        strokes: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps:false
    })

    return HoleScore
}