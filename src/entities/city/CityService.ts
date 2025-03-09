import { modelCity, modelState } from '@db/index';
import { type FindOptions } from 'sequelize';
import type { ICityAttributes, ICityFilter, IResponseAllCity } from '@entities/city/CityModel';
import { fxReponseServices, fxSearchILike, fxPaginate } from '@utils/query';
import { Op } from 'sequelize';

class CityService {
  async validate(data: any) {
    const dataValidate = modelCity.build(data);
    await dataValidate.validate();
  }
  public async get(id: string): Promise<ICityAttributes | null> {
    try {
      const vResponse: ICityAttributes | null = await modelCity.findOne({
        where: {
          id,
        },
      });
      return vResponse;
    } catch (error) {
      throw error;
    }
  }

  public async all(pParam: ICityFilter): Promise<IResponseAllCity> {
    try {
      let whereCityment: FindOptions = {};
      whereCityment = fxPaginate(pParam, whereCityment);
      // whereCityment.order = fxOrderNameId(pParam, whereCityment);
      whereCityment.where = fxSearchILike(pParam, whereCityment, 'name', modelCity.name);
      if (pParam?.name) {
        whereCityment.where = {
          name: {
            [Op.like]: `${pParam?.name}%`,
          },
        };
      }
      if (pParam.state) {
        whereCityment.include = [
          {
            as: 'state',
            model: modelState,
            where: {
              name: pParam.state,
            },
            required: true,
          },
        ];
      }
      // if (pParam?.prospectId || pParam.prospect) {} //TODO quiero colocar un buscardor por nombre de la persona
      console.log('whereCityment.where :>> ', whereCityment.where);
      const vResponse: ICityAttributes[] = await modelCity.findAll(whereCityment);
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllCity = await fxReponseServices(
          pParam,
          whereCityment,
          modelCity.name,
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
export default new CityService();
