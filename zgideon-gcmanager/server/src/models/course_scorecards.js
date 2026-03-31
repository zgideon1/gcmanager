module.exports = (sequelize, DataTypes) => {
    const Scorecard = sequelize.define('course_scorecard', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps:false
    })

    return Scorecard
}