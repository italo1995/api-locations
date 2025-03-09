import { modelCountry, modelState } from '@db/index';
import { type FindOptions } from 'sequelize';
import type { IStateAttributes, IStateFilter, IResponseAllState } from '@entities/state/StateModel';
import { fxReponseServices, fxSearchILike, fxPaginate } from '@utils/query';
import { Op } from 'sequelize';

class StateService {
  async validate(data: any) {
    const dataValidate = modelState.build(data);
    await dataValidate.validate();
  }
  public async get(id: string): Promise<IStateAttributes | null> {
    try {
      const vResponse: IStateAttributes | null = await modelState.findOne({
        where: {
          id,
        },
      });
      return vResponse;
    } catch (error) {
      throw error;
    }
  }

  public async all(pParam: IStateFilter): Promise<IResponseAllState> {
    try {
      let whereStatement: FindOptions = {};
      whereStatement = fxPaginate(pParam, whereStatement);
      // whereStatement.order = fxOrderNameId(pParam, whereStatement);
      whereStatement.where = fxSearchILike(pParam, whereStatement, 'name', modelState.name);
      if (pParam?.name) {
        whereStatement.where = {
          name: {
            [Op.like]: `${pParam?.name}%`,
          },
        };
      }
      if (pParam.country) {
        whereStatement.include = [
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
      console.log('whereStatement.where :>> ', whereStatement.where);
      const vResponse: IStateAttributes[] = await modelState.findAll(whereStatement);
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllState = await fxReponseServices(
          pParam,
          whereStatement,
          modelState.name,
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
export default new StateService();
