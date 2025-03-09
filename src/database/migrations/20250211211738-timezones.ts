import { DataTypes, type QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('timezones', {
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
      zoneName: {
        type: DataTypes.STRING,
        field: 'zone_name',
        allowNull: false,
      },
      gmtOffset: {
        type: DataTypes.INTEGER,
        field: 'gmt_offset',
        allowNull: false,
      },
      gmtOffsetName: {
        type: DataTypes.STRING,
        field: 'gmt_offset_name',
        allowNull: false,
      },
      abbreviation: {
        type: DataTypes.STRING,
        field: 'abbreviation',
        allowNull: false,
      },
      tzName: {
        type: DataTypes.STRING,
        field: 'tz_name',
        allowNull: false,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('timezones');
  },
};
