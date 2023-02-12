const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNUll: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNUll: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [7]
      }
    },
    biography: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pronouns: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    hooks: {
      async beforeCreate(userNewData) {
        userNewData.password = await bcrypt.hash(userNewData.password, 10);
        return userNewData;
      },
      async beforeUpdate(userDataUpdate) {
        userDataUpdate.password = await bcrypt.hash(
          userDataUpdate.password,
          10
        );
        return userDataUpdate;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;