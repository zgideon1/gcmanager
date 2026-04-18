module.exports = (sequelize, DataTypes) => {
    const Score = sequelize.define('scores', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        score_uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        timeval: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        timestamps:false
    })
    return Score
}