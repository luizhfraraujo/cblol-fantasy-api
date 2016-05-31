'use strict';

module.exports = {
  up: function (queryInterface, Sequelize, done) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.addColumn(
        'Users',
        'image',
        {
            type: Sequelize.STRING,
              allowNull: true,
        }
    );
    done();
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
