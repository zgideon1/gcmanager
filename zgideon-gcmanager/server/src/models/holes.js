module.exports = (sequelize, DataTypes) => {
    const Hole = sequelize.define('holes', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        sc_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        holenum: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        par: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        yardage: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        timestamps:false
    })

    return Hole
}