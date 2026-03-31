module.exports = (sequelize, DataTypes) => {
    const TournSignup = sequelize.define('tournament_signups', {
        signup_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        tourn_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tourn_uid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING
        }
    }, {
        timestamps:false
    })
    return TournSignup
}