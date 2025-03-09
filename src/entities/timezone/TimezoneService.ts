import { modelCountry, modelTimezone } from '@db/index';
import { type FindOptions } from 'sequelize';
import type { ITimezoneAttributes, ITimezoneFilter, IResponseAllTimezone } from '@entities/timezone/TimezoneModel';
import { fxReponseServices, fxSearchILike, fxPaginate } from '@utils/query';

class TimezoneService {
  async validate(data: any) {
    const dataValidate = modelTimezone.build(data);
    await dataValidate.validate();
  }
  public async get(id: string): Promise<ITimezoneAttributes | null> {
    try {
      const vResponse: ITimezoneAttributes | null = await modelTimezone.findOne({
        where: {
          id,
        },
      });
      return vResponse;
    } catch (error) {
      throw error;
    }
  }

  public async all(pParam: ITimezoneFilter): Promise<IResponseAllTimezone> {
    try {
      let whereTimezonement: FindOptions = {};
      whereTimezonement = fxPaginate(pParam, whereTimezonement);
      // whereTimezonement.order = fxOrderNameId(pParam, whereTimezonement);
      whereTimezonement.where = fxSearchILike(pParam, whereTimezonement, 'name', modelTimezone.name);
      if (pParam.country) {
        whereTimezonement.include = [
          {
            as: 'country',
            model: modelCountry,
            where: {
              name: pParam.country
            },
            required: true
          },
        ];
      }
      // if (pParam?.prospectId || pParam.prospect) {} //TODO quiero colocar un buscardor por nombre de la persona
      const vResponse: ITimezoneAttributes[] = await modelTimezone.findAll(whereTimezonement);
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllTimezone = await fxReponseServices(
          pParam,
          whereTimezonement,
          modelTimezone.name,
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
export default new TimezoneService();
