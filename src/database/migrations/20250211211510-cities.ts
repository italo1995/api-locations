import { DataTypes, type QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('cities', {
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
      state_id: {
        type: DataTypes.INTEGER,
        field: 'state_id',
        references: {
          model: 'states',
          key: 'id',
        },
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
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('states');
  },
};
