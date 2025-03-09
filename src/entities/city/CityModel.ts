import { type Sequelize, type Model, DataTypes } from 'sequelize';
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes';
import { ModelRegistry } from '@db/index';

export interface ICityAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  state_id?: string;
  latitude?: number;
  longitude?: number;
}

export interface IResponseAllCity {
  total?: number;
  totalPage?: number;
  data: ICityAttributes[];
  actualPage?: number;
}

export interface ICityFilter {
  pag?: number;
  limit?: number;
  name?: string;
  state?: string
}

export type ICityCreationAttributes = Pick<
  ICityAttributes,
  'name' | 'state_id' | 'latitude' | 'longitude'
> & {
  id?: string;
};

export type ICityUpdateAttributes = Pick<ICityAttributes, 'id'> & {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};

export interface ICityInstance
  extends Model<ICityAttributes, ICityCreationAttributes>,
    ICityAttributes {}

export const vCityModelAttributes: SequelizeAttributes<ICityAttributes> = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'createdAt',
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updatedAt',
    allowNull: true,
  },
  name: {
    field: 'name',
    type: DataTypes.STRING,
  },
  state_id: {
    field: 'state_id',
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'states',
      key: 'id',
    },
  },
  latitude: {
    field: 'latitude',
    type: DataTypes.DECIMAL,
  },
  longitude: {
    field: 'longitude',
    type: DataTypes.DECIMAL,
  },
};

export function fxCityFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<ICityInstance>>sequelize.define(
    'Cities',
    {
      ...vCityModelAttributes,
    },
    {
      tableName: 'cities',
      defaultScope: {
        order: [['name', 'DESC']],
      },
      freezeTableName: true,
      timestamps: true,
    }
  );
  vData.associate = function (models: ModelRegistry) {
    const { modelCity, modelState } = models;
    modelCity.hasOne(modelState, {
      foreignKey: 'id',
      sourceKey: 'state_id',
      as: 'state',
    });
  };
  vData.prototype.toJSON = function () {
    const values = { ...this.get() };
    return values;
  };
  return vData;
}
