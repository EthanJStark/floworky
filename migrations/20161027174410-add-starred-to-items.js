'use strict';

module.exports = {
  up: ( queryInterface, Sequelize ) => {
    queryInterface.addColumn( 'Items', 'starred',
    { type: Sequelize.BOOLEAN, defaultValue: false }
   )
  },

  down: ( queryInterface, Sequelize ) => {
    queryInterface.removeColumn( 'Items', 'starred' )
  }
};
