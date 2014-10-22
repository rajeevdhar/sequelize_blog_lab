"use strict";

module.exports = function(sequelize, DataTypes) {
  var PostsTags = sequelize.define("PostsTags", {
    PostId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return PostsTags;
};
