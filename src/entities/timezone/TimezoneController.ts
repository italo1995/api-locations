import {
  Controller,
  Get,
  Path,
  Queries,
  Route,
  Tags
} from 'tsoa'
import { ITimezoneAttributes, IResponseAllTimezone, ITimezoneFilter } from './TimezoneModel';
import TimezoneService from './TimezoneService';

@Route('timezones')
@Tags('Timezone')
export class TimezonesController extends Controller {
  private stateService: typeof TimezoneService;
  constructor() {
    super();
    this.stateService = TimezoneService;
  }

  @Get('/show/{TimezoneId}')
  public async get(@Path() TimezoneId: string): Promise<{ data: string | null; message?: string }> {
    try {
      return { data: TimezoneId };
    } catch (error) {
      this.setStatus(500);
      return { data: null, message: 'Ocurrió un error' };
    }
  }

  /**
   * @summary Obtener todos los datos con paginación.
   * @param {ITimezoneAttributes} pQueryParams - Número de página.
   * @returns {Promise<{ data: IResponseAllTimezone | ITimezoneAttributes[], message?: string }>} - Promesa que resuelve con los datos
   */
  @Get('/all')
  public async all(@Queries() pQueryParams: ITimezoneFilter): Promise<{
    data: IResponseAllTimezone | ITimezoneAttributes[];
    message?: string;
  }> {
    try {
      const vResponse: IResponseAllTimezone = await this.stateService.all(pQueryParams);
      this.setStatus(200);
      return { data: vResponse };
    } catch (error) {
      this.setStatus(500);
      return { data: [], message: 'Ocurrió un error' };
    }
  }
}