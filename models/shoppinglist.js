'use strict';
module.exports = (sequelize, DataTypes) => {
  const shoppinglist = sequelize.define('shoppinglist', {
    name: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING
  }, {});
  shoppinglist.associate = function(models) {
    // associations can be defined here
  };
  return shoppinglist;
};