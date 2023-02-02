const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Agent extends Model {}

Agent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    is_agent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
    },
    agent_img: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'agent',
  }
);

module.exports = Agent;