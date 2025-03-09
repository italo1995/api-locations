import {
  Controller,
  Get,
  Path,
  Queries,
  Route,
  Tags
} from 'tsoa'
import { IStateAttributes, IResponseAllState, IStateFilter } from './StateModel';
import StateService from './StateService';

@Route('states')
@Tags('State')
export class StatesController extends Controller {
  private stateService: typeof StateService;
  constructor() {
    super();
    this.stateService = StateService;
  }

  @Get('/show/{StateId}')
  public async get(@Path() StateId: string): Promise<{ data: string | null; message?: string }> {
    try {
      return { data: StateId };
    } catch (error) {
      this.setStatus(500);
      return { data: null, message: 'Ocurrió un error' };
    }
  }

  /**
   * @summary Obtener todos los datos con paginación.
   * @param {IStateAttributes} pQueryParams - Número de página.
   * @returns {Promise<{ data: IResponseAllState | IStateAttributes[], message?: string }>} - Promesa que resuelve con los datos
   */
  @Get('/all')
  public async all(@Queries() pQueryParams: IStateFilter): Promise<{
    data: IResponseAllState | IStateAttributes[];
    message?: string;
  }> {
    try {
      const vResponse: IResponseAllState = await this.stateService.all(pQueryParams);
      this.setStatus(200);
      return { data: vResponse };
    } catch (error) {
      this.setStatus(500);
      return { data: [], message: 'Ocurrió un error' };
    }
  }
}