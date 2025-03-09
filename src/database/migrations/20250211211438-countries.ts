import { DataTypes, type QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('countries', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'createdAt',
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updatedAt',
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      name: {
        type: DataTypes.STRING,
        field: 'name',
        allowNull: false,
      },
      iso3: {
        type: DataTypes.STRING,
        field: 'iso3',
        allowNull: false,
      },
      iso2: {
        type: DataTypes.STRING,
        field: 'iso2',
        allowNull: false,
      },
      numeric_code: {
        type: DataTypes.STRING,
        field: 'numeric_code',
        allowNull: false,
      },
      phone_code: {
        type: DataTypes.STRING,
        field: 'phone_code',
        allowNull: false,
      },
      capital: {
        type: DataTypes.STRING,
        field: 'capital',
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        field: 'currency',
        allowNull: false,
      },
      currency_name: {
        type: DataTypes.STRING,
        field: 'currency_name',
        allowNull: false,
      },
      currency_symbol: {
        type: DataTypes.STRING,
        field: 'currency_symbol',
        allowNull: false,
      },
      tld: {
        type: DataTypes.STRING,
        field: 'tld',
        allowNull: false,
      },
      native: {
        type: DataTypes.STRING,
        field: 'native',
        allowNull: true,
        defaultValue: null,
      },
      region: {
        type: DataTypes.STRING,
        field: 'region',
        allowNull: false,
      },
      subregion: {
        type: DataTypes.STRING,
        field: 'subregion',
        allowNull: false,
      },
      nationality: {
        type: DataTypes.STRING,
        field: 'nationality',
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DECIMAL,
        field: 'latitude',
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DECIMAL,
        field: 'longitude',
        allowNull: false,
      },
      emoji: {
        type: DataTypes.STRING,
        field: 'emoji',
        allowNull: false,
      },
      emojiU: {
        type: DataTypes.STRING,
        field: 'emojiU',
        allowNull: false,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('countries');
  },
};
