/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TimezonesController } from './../entities/timezone/TimezoneController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StatesController } from './../entities/state/StateController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CountrysController } from './../entities/countries/CountryController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CitysController } from './../entities/city/CityController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "ITimezoneAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "country_id": {"dataType":"string"},
            "zone_name": {"dataType":"string"},
            "gmt_offset": {"dataType":"double"},
            "gmt_offset_name": {"dataType":"string"},
            "abbreviation": {"dataType":"string"},
            "tz_name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllTimezone": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"ITimezoneAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITimezoneFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "zone_name": {"dataType":"string"},
            "country": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStateAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "name": {"dataType":"string"},
            "state_code": {"dataType":"string"},
            "country_id": {"dataType":"string"},
            "latitude": {"dataType":"double"},
            "longitude": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllState": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IStateAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStateFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "name": {"dataType":"string"},
            "country": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICountryAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "name": {"dataType":"string"},
            "iso3": {"dataType":"string"},
            "iso2": {"dataType":"string"},
            "numeric_code": {"dataType":"string"},
            "phone_code": {"dataType":"string"},
            "capital": {"dataType":"string"},
            "currency": {"dataType":"string"},
            "currency_name": {"dataType":"string"},
            "currency_symbol": {"dataType":"string"},
            "tld": {"dataType":"string"},
            "native": {"dataType":"string"},
            "region": {"dataType":"string"},
            "subregion": {"dataType":"string"},
            "nationality": {"dataType":"string"},
            "latitude": {"dataType":"double"},
            "longitude": {"dataType":"double"},
            "emoji": {"dataType":"string"},
            "emojiU": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllCountry": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"ICountryAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICountryFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICityAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "name": {"dataType":"string"},
            "state_id": {"dataType":"string"},
            "latitude": {"dataType":"double"},
            "longitude": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResponseAllCity": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double"},
            "totalPage": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"ICityAttributes"},"required":true},
            "actualPage": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICityFilter": {
        "dataType": "refObject",
        "properties": {
            "pag": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "name": {"dataType":"string"},
            "state": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsTimezonesController_get: Record<string, TsoaRoute.ParameterSchema> = {
                TimezoneId: {"in":"path","name":"TimezoneId","required":true,"dataType":"string"},
        };
        app.get('/timezones/show/:TimezoneId',
            ...(fetchMiddlewares<RequestHandler>(TimezonesController)),
            ...(fetchMiddlewares<RequestHandler>(TimezonesController.prototype.get)),

            async function TimezonesController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTimezonesController_get, request, response });

                const controller = new TimezonesController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTimezonesController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"ITimezoneFilter"},
        };
        app.get('/timezones/all',
            ...(fetchMiddlewares<RequestHandler>(TimezonesController)),
            ...(fetchMiddlewares<RequestHandler>(TimezonesController.prototype.all)),

            async function TimezonesController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTimezonesController_all, request, response });

                const controller = new TimezonesController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStatesController_get: Record<string, TsoaRoute.ParameterSchema> = {
                StateId: {"in":"path","name":"StateId","required":true,"dataType":"string"},
        };
        app.get('/states/show/:StateId',
            ...(fetchMiddlewares<RequestHandler>(StatesController)),
            ...(fetchMiddlewares<RequestHandler>(StatesController.prototype.get)),

            async function StatesController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStatesController_get, request, response });

                const controller = new StatesController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStatesController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"IStateFilter"},
        };
        app.get('/states/all',
            ...(fetchMiddlewares<RequestHandler>(StatesController)),
            ...(fetchMiddlewares<RequestHandler>(StatesController.prototype.all)),

            async function StatesController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStatesController_all, request, response });

                const controller = new StatesController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCountrysController_get: Record<string, TsoaRoute.ParameterSchema> = {
                CountryId: {"in":"path","name":"CountryId","required":true,"dataType":"string"},
        };
        app.get('/countries/show/:CountryId',
            ...(fetchMiddlewares<RequestHandler>(CountrysController)),
            ...(fetchMiddlewares<RequestHandler>(CountrysController.prototype.get)),

            async function CountrysController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCountrysController_get, request, response });

                const controller = new CountrysController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCountrysController_loadData: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/countries/loadData',
            ...(fetchMiddlewares<RequestHandler>(CountrysController)),
            ...(fetchMiddlewares<RequestHandler>(CountrysController.prototype.loadData)),

            async function CountrysController_loadData(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCountrysController_loadData, request, response });

                const controller = new CountrysController();

              await templateService.apiHandler({
                methodName: 'loadData',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCountrysController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"ICountryFilter"},
        };
        app.get('/countries/all',
            ...(fetchMiddlewares<RequestHandler>(CountrysController)),
            ...(fetchMiddlewares<RequestHandler>(CountrysController.prototype.all)),

            async function CountrysController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCountrysController_all, request, response });

                const controller = new CountrysController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCitysController_get: Record<string, TsoaRoute.ParameterSchema> = {
                CityId: {"in":"path","name":"CityId","required":true,"dataType":"string"},
        };
        app.get('/cities/show/:CityId',
            ...(fetchMiddlewares<RequestHandler>(CitysController)),
            ...(fetchMiddlewares<RequestHandler>(CitysController.prototype.get)),

            async function CitysController_get(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCitysController_get, request, response });

                const controller = new CitysController();

              await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCitysController_all: Record<string, TsoaRoute.ParameterSchema> = {
                pQueryParams: {"in":"queries","name":"pQueryParams","required":true,"ref":"ICityFilter"},
        };
        app.get('/cities/all',
            ...(fetchMiddlewares<RequestHandler>(CitysController)),
            ...(fetchMiddlewares<RequestHandler>(CitysController.prototype.all)),

            async function CitysController_all(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCitysController_all, request, response });

                const controller = new CitysController();

              await templateService.apiHandler({
                methodName: 'all',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
