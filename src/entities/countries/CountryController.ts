import { loadData } from '@utils/dataLoader';
import {
  Controller,
  Get,
  Path,
  Queries,
  Route,
  Tags
} from 'tsoa'
import { ICountryAttributes, ICountryFilter, IResponseAllCountry } from './CountryModel';
import CountryService from './CountryService';

@Route('countries')
@Tags('Country')
export class CountrysController extends Controller {
  private countryService: typeof CountryService;
  constructor() {
    super();
    this.countryService = CountryService;
  }

  @Get('/show/{CountryId}')
  public async get(@Path() CountryId: string): Promise<{ data: string | null; message?: string }> {
    try {
      return { data: CountryId };
    } catch (error) {
      this.setStatus(500);
      return { data: null, message: 'Ocurrió un error' };
    }
  }

  @Get('/loadData')
  public async loadData(): Promise<{ data: number | null; message?: string }> {
    try {
      const dataLoader = await loadData();
      return { data: dataLoader };
    } catch (error) {
      console.log('error :>> ', error);
      this.setStatus(500);
      return { data: null, message: 'Ocurrió un error' };
    }
  }

  /**
   * @summary Obtener todos los datos con paginación.
   * @param {ICountryAttributes} pQueryParams - Número de página.
   * @returns {Promise<{ data: IResponseAllCountry | ICountryAttributes[], message?: string }>} - Promesa que resuelve con los datos
   */
  @Get('/all')
  public async all(@Queries() pQueryParams: ICountryFilter): Promise<{
    data: IResponseAllCountry | ICountryAttributes[];
    message?: string;
  }> {
    try {
      const vResponse: IResponseAllCountry = await this.countryService.all(pQueryParams);
      this.setStatus(200);
      return { data: vResponse };
    } catch (error) {
      this.setStatus(500);
      return { data: [], message: 'Ocurrió un error' };
    }
  }
}