module.exports = (sequelize, DataTypes) => {
    const Teetime = sequelize.define('teetimes', {
        timeval: {
            type: DataTypes.DATE,
            allowNull: false
        },
        teeid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tt_user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cart: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        numofplayers: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        startHole: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, {
        timestamps:false
    }
)
    return Teetime
}