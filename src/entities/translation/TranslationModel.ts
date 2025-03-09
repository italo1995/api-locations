import { type Sequelize, type Model, DataTypes } from 'sequelize';
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes';

export interface ITranslationAttributes {
  id?: string;
  country_id?: string;
  language_code?: string;
  translation?: string;
}

export interface IResponseAllTranslation {
  total?: number;
  totalPage?: number;
  data: ITranslationAttributes[];
  actualPage?: number;
}

export interface ITranslationFilter {
  pag?: number;
  limit?: number;
  language_code?: string;
}

export type ITranslationCreationAttributes = Pick<
  ITranslationAttributes,
  'country_id' | 'language_code' | 'translation'
> & {
  id?: string;
};

export type ITranslationUpdateAttributes = Pick<ITranslationAttributes, 'id'> & {
  language_code?: string;
  translation?: string;
};

export interface ITranslationInstance
  extends Model<ITranslationAttributes, ITranslationCreationAttributes>,
    ITranslationAttributes {}

export const vTranslationModelAttributes: SequelizeAttributes<ITranslationAttributes> = {
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
  language_code: {
    field: 'language_code',
    type: DataTypes.STRING,
    allowNull: false,
  },
  translation: {
    field: 'translation',
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export function fxTranslationFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<ITranslationInstance>>sequelize.define(
    'Translations',
    {
      ...vTranslationModelAttributes,
    },
    {
      tableName: 'translations',
      defaultScope: {
        order: [['language_code', 'ASC']],
      },
      freezeTableName: true,
      timestamps: false,
    }
  );
  vData.prototype.toJSON = function () {
    const values = { ...this.get() };
    return values;
  };
  return vData;
}