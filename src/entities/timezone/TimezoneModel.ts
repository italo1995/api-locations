import { type Sequelize, type Model, DataTypes } from 'sequelize';
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes';
import { ModelRegistry } from '@db/index';

export interface ITimezoneAttributes {
  id?: string;
  country_id?: string;
  zone_name?: string;
  gmt_offset?: number;
  gmt_offset_name?: string;
  abbreviation?: string;
  tz_name?: string;
}

export interface IResponseAllTimezone {
  total?: number;
  totalPage?: number;
  data: ITimezoneAttributes[];
  actualPage?: number;
}

export interface ITimezoneFilter {
  pag?: number;
  limit?: number;
  zone_name?: string;
  country?: string;
}

export type ITimezoneCreationAttributes = Pick<
  ITimezoneAttributes,
  'country_id' | 'zone_name' | 'gmt_offset' | 'gmt_offset_name' | 'abbreviation' | 'tz_name'
> & {
  id?: string;
};

export type ITimezoneUpdateAttributes = Pick<ITimezoneAttributes, 'id'> & {
  country_id?: string;
  zone_name?: string;
  gmt_offset?: number;
  gmt_offset_name?: string;
  abbreviation?: string;
  tz_name?: string;
};

export interface ITimezoneInstance
  extends Model<ITimezoneAttributes, ITimezoneCreationAttributes>,
    ITimezoneAttributes {}

export const vTimezoneModelAttributes: SequelizeAttributes<ITimezoneAttributes> = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: true,
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
  zone_name: {
    field: 'zone_name',
    type: DataTypes.STRING,
    allowNull: false,
  },
  gmt_offset: {
    field: 'gmt_offset',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gmt_offset_name: {
    field: 'gmt_offset_name',
    type: DataTypes.STRING,
    allowNull: false,
  },
  abbreviation: {
    field: 'abbreviation',
    type: DataTypes.STRING,
    allowNull: false,
  },
  tz_name: {
    field: 'tz_name',
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export function fxTimezoneFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<ITimezoneInstance>>sequelize.define(
    'Timezones',
    {
      ...vTimezoneModelAttributes,
    },
    {
      tableName: 'timezones',
      defaultScope: {
        order: [['zone_name', 'ASC']],
      },
      freezeTableName: true,
      timestamps: false,
    }
  );

  vData.associate = function (models: ModelRegistry) {
    const { modelTimezone, modelCountry } = models;
    modelTimezone.hasOne(modelCountry, {
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
