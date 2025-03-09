import { modelCountry } from '@db/index';
import { type FindOptions } from 'sequelize';
import type {
  ICountryAttributes,
  ICountryFilter,
  IResponseAllCountry,
} from '@entities/countries/CountryModel';
import { fxReponseServices, fxSearchILike, fxPaginate } from '@utils/query';
import { Op } from 'sequelize';

class CountryService {
  async validate(data: any) {
    const dataValidate = modelCountry.build(data);
    await dataValidate.validate();
  }
  public async get(id: string): Promise<ICountryAttributes | null> {
    try {
      const vResponse: ICountryAttributes | null = await modelCountry.findOne({
        where: {
          id,
        },
      });
      return vResponse;
    } catch (error) {
      throw error;
    }
  }

  public async all(pParam: ICountryFilter): Promise<IResponseAllCountry> {
    try {
      let whereStatement: FindOptions = {};
      whereStatement = fxPaginate(pParam, whereStatement);
      // whereStatement.order = fxOrderNameId(pParam, whereStatement);
      whereStatement.where = fxSearchILike(pParam, whereStatement, 'name', modelCountry.name);
      if (pParam?.name) {
        whereStatement.where = {
          name: {
            [Op.like]: `${pParam?.name}%`,
          },
        };
      }
      // if (pParam?.prospectId || pParam.prospect) {} //TODO quiero colocar un buscardor por nombre de la persona
      console.log('whereStatement.where :>> ', whereStatement.where);
      const vResponse: ICountryAttributes[] = await modelCountry.findAll(whereStatement);
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllCountry = await fxReponseServices(
          pParam,
          whereStatement,
          modelCountry.name,
          vResponse
        );
        return vResponsePaginate;
      }
      return { data: vResponse };
    } catch (error) {
      throw error;
    }
  }
}
export default new CountryService();
