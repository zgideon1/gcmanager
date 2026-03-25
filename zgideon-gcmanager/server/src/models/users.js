const bcrypt = require('bcrypt')
const salt = bcrypt.genSalt(8)

async function hashPassword(user, options) {
  if (!user.changed('password')) return

  user.password = await bcrypt.hash(user.password, 8)
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'username123'
    },
    uid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phoneNum: {
        type:DataTypes.INTEGER,
        allowNull: true
    },
    address: {
        type:DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING
    }
  }, {
    timestamps:false,
    hooks: { 
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  })

  User.prototype.comparePassword = async function(password) {
    const trim = String(this.password).trim()

    const valid = await bcrypt.compare(password, trim)

    return valid
  }

  return User
};