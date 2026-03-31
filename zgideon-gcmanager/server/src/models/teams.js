module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('teams', {
        teamid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING
        },
        tourn_team_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps:false
    })

    return Team
}