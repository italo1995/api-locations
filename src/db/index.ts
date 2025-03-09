/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Sequelize } from 'sequelize'
import { type ModelStatic, isAssociatable } from '../types/SequelizeTypes'
import config from '../config/config'
import AppConfig from '../config/AppConfig'
import { fxCountryFactory } from '@entities/countries/CountryModel';
import { fxStateFactory } from '@entities/state/StateModel';
import { fxCityFactory } from '@entities/city/CityModel';
import { fxTimezoneFactory } from '@entities/timezone/TimezoneModel';
import { fxTranslationFactory } from '@entities/translation/TranslationModel';
// @ts-ignore
const database = config[AppConfig.NODE_ENV] || config.development

const sequelize = new Sequelize(database.database, database.username, database.password, {
  ...database,
  logging: false,
  dialect: database?.dialect || 'mysql',
  dialectOptions: {
    charset: 'utf8mb4',
  },
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
});

export const modelCountry = fxCountryFactory(sequelize);
export const modelState = fxStateFactory(sequelize)
export const modelCity = fxCityFactory(sequelize)
export const modelTimezone = fxTimezoneFactory(sequelize)
export const modelTranslation = fxTranslationFactory(sequelize)

const models = {
  modelCountry,
  modelState,
  modelCity,
  modelTimezone,
  modelTranslation
};

export type ModelRegistry = typeof models
export type ModelRegistryKeys = keyof typeof models

Object.values(models).forEach((model: ModelStatic<any>) => {
  if (isAssociatable<ModelRegistry>(model)) {
    model.associate(models)
  }
})

export default sequelize
