module.exports = (sequelize, DataTypes) => {
    const TeamMember = sequelize.define('team_members', {
        tmid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        team_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        team_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return TeamMember
}