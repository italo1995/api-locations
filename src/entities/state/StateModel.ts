import { type Sequelize, type Model, DataTypes } from 'sequelize';
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes';
import { ModelRegistry } from '@db/index';

export interface IStateAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  state_code?: string;
  country_id?: string;
  latitude?: number;
  longitude?: number;
}

export interface IResponseAllState {
  total?: number;
  totalPage?: number;
  data: IStateAttributes[];
  actualPage?: number;
}

export interface IStateFilter {
  pag?: number;
  limit?: number;
  name?: string;
  country?: string
}

export type IStateCreationAttributes = Pick<
  IStateAttributes,
  'name' | 'state_code' | 'country_id' | 'latitude' | 'longitude'
> & {
  id?: string;
};

export type IStateUpdateAttributes = Pick<IStateAttributes, 'id'> & {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};

export interface IStateInstance
  extends Model<IStateAttributes, IStateCreationAttributes>,
    IStateAttributes {}

export const vStateModelAttributes: SequelizeAttributes<IStateAttributes> = {
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
  state_code: {
    field: 'state_code',
    type: DataTypes.STRING,
  },
  country_id: {
    field: 'country_id',
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'countries',
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

export function fxStateFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IStateInstance>>sequelize.define(
    'States',
    {
      ...vStateModelAttributes,
    },
    {
      tableName: 'states',
      defaultScope: {
        order: [['createdAt', 'DESC']],
      },
      freezeTableName: true,
      timestamps: true,
    }
  );
  vData.associate = function (models: ModelRegistry) {
    const { modelState, modelCountry } = models;
    modelState.hasOne(modelCountry, {
      foreignKey: 'id',
      sourceKey: 'country_id',
      as: 'country',
    });
  };
  vData.prototype.toJSON = function () {
    const values = { ...this.get() };
    return values;
  };
  return vData;
}
