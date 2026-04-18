module.exports = (sequelize, DataTypes) => {
    const CourseScorecard = sequelize.define('course_scorecards', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps:false
    })

    return CourseScorecard
}