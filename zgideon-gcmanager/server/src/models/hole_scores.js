module.exports = (sequelize, DataTypes) => {
    const HoleScore = sequelize.define('hole_scores', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        score_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        score_holeid: {
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