module.exports = (sequelize, DataTypes) => {
    const ScoreHole = sequelize.define('hole_scores', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        score_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        holenum: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        strokes: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return ScoreHole
}