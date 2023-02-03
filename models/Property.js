const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Property extends Model {}

Property.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owners_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    property_image: {
      type: DataTypes.STRING,
    },
    owners_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "property",
  }
);

module.exports = Property;
