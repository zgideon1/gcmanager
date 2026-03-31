module.exports = (sequelize, DataTypes) => {
    const Score = sequelize.define('scores', {
        scoreid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        scores_uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gametype: {
            type: DataTypes.STRING
        },
        dateval: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps:false
    })
    return Score
}