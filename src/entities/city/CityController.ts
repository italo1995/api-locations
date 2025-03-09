import {
  Controller,
  Get,
  Path,
  Queries,
  Route,
  Tags
} from 'tsoa'
import { ICityAttributes, IResponseAllCity, ICityFilter } from './CityModel';
import CityService from './CityService';

@Route('cities')
@Tags('City')
export class CitysController extends Controller {
  private cityService: typeof CityService;
  constructor() {
    super();
    this.cityService = CityService;
  }

  @Get('/show/{CityId}')
  public async get(@Path() CityId: string): Promise<{ data: string | null; message?: string }> {
    try {
      return { data: CityId };
    } catch (error) {
      this.setStatus(500);
      return { data: null, message: 'Ocurrió un error' };
    }
  }

  /**
   * @summary Obtener todos los datos con paginación.
   * @param {ICityAttributes} pQueryParams - Número de página.
   * @returns {Promise<{ data: IResponseAllCity | ICityAttributes[], message?: string }>} - Promesa que resuelve con los datos
   */
  @Get('/all')
  public async all(@Queries() pQueryParams: ICityFilter): Promise<{
    data: IResponseAllCity | ICityAttributes[];
    message?: string;
  }> {
    try {
      const vResponse: IResponseAllCity = await this.cityService.all(pQueryParams);
      this.setStatus(200);
      return { data: vResponse };
    } catch (error) {
      this.setStatus(500);
      return { data: [], message: 'Ocurrió un error' };
    }
  }
}