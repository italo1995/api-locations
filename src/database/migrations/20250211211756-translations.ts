import { DataTypes, type QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('translations', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
      },
      countryId: {
        type: DataTypes.INTEGER,
        field: 'country_id',
        allowNull: false,
        references: {
          model: 'countries',
          key: 'id',
        },
      },
      languageCode: {
        type: DataTypes.STRING,
        field: 'language_code',
        allowNull: false,
      },
      translation: {
        type: DataTypes.STRING,
        field: 'translation',
        allowNull: false,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('translations');
  },
};
