import { type Sequelize, type Model, DataTypes } from 'sequelize';
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes';

export interface ICountryAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  iso3?: string;
  iso2?: string;
  numeric_code?: string;
  phone_code?: string;
  capital?: string;
  currency?: string;
  currency_name?: string;
  currency_symbol?: string;
  tld?: string;
  native?: string;
  region?: string;
  subregion?: string;
  nationality?: string;
  latitude?: number;
  longitude?: number;
  emoji?: string;
  emojiU?: string;
}

export interface IResponseAllCountry {
  total?: number;
  totalPage?: number;
  data: ICountryAttributes[];
  actualPage?: number;
}

export interface ICountryFilter {
  pag?: number;
  limit?: number;
  name?: string;
}

export type ICountryCreationAttributes = Pick<
  ICountryAttributes,
  | 'name'
  | 'iso3'
  | 'iso2'
  | 'numeric_code'
  | 'phone_code'
  | 'capital'
  | 'currency'
  | 'currency_name'
  | 'currency_symbol'
  | 'tld'
  | 'native'
  | 'region'
  | 'subregion'
  | 'nationality'
  | 'latitude'
  | 'longitude'
  | 'emoji'
  | 'emojiU'
> & {
  id?: string;
};

export type ICountryUpdateAttributes = Pick<ICountryAttributes, 'id'> & {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};

export interface ICountryInstance
  extends Model<ICountryAttributes, ICountryCreationAttributes>,
    ICountryAttributes {}

export const vCountryModelAttributes: SequelizeAttributes<ICountryAttributes> = {
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
  iso3: {
    field: 'iso3',
    type: DataTypes.STRING,
  },
  iso2: {
    field: 'iso2',
    type: DataTypes.STRING,
  },
  numeric_code: {
    field: 'numeric_code',
    type: DataTypes.STRING,
  },
  phone_code: {
    field: 'phone_code',
    type: DataTypes.STRING,
  },
  capital: {
    field: 'capital',
    type: DataTypes.STRING,
  },
  currency: {
    field: 'currency',
    type: DataTypes.STRING,
  },
  currency_name: {
    field: 'currency_name',
    type: DataTypes.STRING,
  },
  currency_symbol: {
    field: 'currency_symbol',
    type: DataTypes.STRING,
  },
  tld: {
    field: 'tld',
    type: DataTypes.STRING,
  },
  native: {
    field: 'native',
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  region: {
    field: 'region',
    type: DataTypes.STRING,
  },
  subregion: {
    field: 'subregion',
    type: DataTypes.STRING,
  },
  nationality: {
    field: 'nationality',
    type: DataTypes.STRING,
  },
  latitude: {
    field: 'latitude',
    type: DataTypes.DECIMAL,
  },
  longitude: {
    field: 'longitude',
    type: DataTypes.DECIMAL,
  },
  emoji: {
    field: 'emoji',
    type: DataTypes.STRING,
  },
  emojiU: {
    field: 'emojiU',
    type: DataTypes.STRING,
  },
};

export function fxCountryFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<ICountryInstance>>sequelize.define(
    'Countrys',
    {
      ...vCountryModelAttributes,
    },
    {
      tableName: 'countries',
      defaultScope: {
        order: [['id', 'ASC']],
      },
      freezeTableName: true,
      timestamps: true,
    }
  );
  vData.prototype.toJSON = function () {
    const values = { ...this.get() };
    return values;
  };
  return vData;
}
