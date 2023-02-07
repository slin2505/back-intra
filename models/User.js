import { DataTypes } from "sequelize";
import db from "../config/db.js";

const User = db.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: { isEmail: true },
    allowNull: false,
  },

  last_name: {
    type: DataTypes.STRING,
    validate: { isAlpha: true },
    allowNull: false,
  },

  first_name: {
    type: DataTypes.STRING,
    validate: { isAlpha: true },
    allowNull: false,
  },

  gender: {
    type: DataTypes.STRING,
    validate: { isAlpha: true },
    allowNull: false,
  }, // M F

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  city: {
    type: DataTypes.STRING,
    validate: { isAlpha: true },
    allowNull: false,
  },

  country: {
    type: DataTypes.STRING,
    validate: { isAlpha: true },
    allowNull: false,
  },

  birthdate: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  category: {
    type: DataTypes.STRING,
    validate: { isAlpha: true },
    allowNull: false,
  }, // Marketing , Client, Technique

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  photo: {
    type: DataTypes.STRING,
    defaultValue: "images/basicUser.png",
  },

  is_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default User;
