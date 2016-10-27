'use strict';

const VALID_PARAMETERS = [ 'completed', 'title', 'description' ]

module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    completed: DataTypes.BOOLEAN,
    starred: { type: DataTypes.BOOLEAN, defaultValue: false },
    parent_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      filterParameters: params => {
        return VALID_PARAMETERS.reduce( (memo, key) => {
          if( params[ key ] !== undefined ) {
            memo[ key ] = params[ key ]
          }

          return memo
        }, {} )
      }
    }
  });
  return Item;
};
