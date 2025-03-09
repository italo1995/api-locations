import { modelCountry } from '@db/index';
import { modelState } from '@db/index';
import { modelCity } from '@db/index';
import { modelTimezone } from '@db/index';
import { modelTranslation } from '@db/index';
// import countriesData from '../../locations.json'; // Actualiza la ruta al archivo JSON

interface CountryData {
  id: string;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  subregion: string;
  nationality: string;
  latitude: string;
  longitude: string;
  emoji: string;
  emojiU: string;
  states: StateData[];
  timezones: TimezoneData[];
  translations: { [key: string]: string };
}

interface StateData {
  id: string;
  name: string;
  state_code: string;
  latitude: string;
  longitude: string;
  cities: CityData[];
}

interface CityData {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  state_id?: string;
}

interface TimezoneData {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

const countriesData: CountryData[] = require('../../locations.json'); // Ensure countriesData is an array

export async function loadData() {

  for (const countryData of countriesData) {
    const country = await modelCountry.create({
      id: countryData.id,
      name: countryData.name,
      iso3: countryData.iso3,
      iso2: countryData.iso2,
      numeric_code: countryData.numeric_code,
      phone_code: countryData.phone_code,
      capital: countryData.capital,
      currency: countryData.currency,
      currency_name: countryData.currency_name,
      currency_symbol: countryData.currency_symbol,
      tld: countryData.tld,
      native: countryData.native,
      region: countryData.region,
      subregion: countryData.subregion,
      nationality: countryData.nationality,
      latitude: parseFloat(countryData.latitude),
      longitude: parseFloat(countryData.longitude),
      emoji: countryData.emoji,
      emojiU: countryData.emojiU,
    });

    for (const stateData of countryData.states) {
      const state = await modelState.create({
        id: stateData.id,
        name: stateData.name,
        state_code: stateData.state_code,
        country_id: country.id,
        latitude: parseFloat(stateData.latitude),
        longitude: parseFloat(stateData.longitude),
      });

      for (const cityData of stateData.cities) {
        await modelCity.create({
          id: cityData.id,
          name: cityData.name,
          state_id: state.id,
          latitude: parseFloat(cityData.latitude),
          longitude: parseFloat(cityData.longitude),
        });
      }
    }

    if ('timezones' in countryData && countryData?.timezones) {
      for (const timezoneData of countryData.timezones) {
        await modelTimezone.create({
          country_id: country.id,
          zone_name: timezoneData.zoneName,
          gmt_offset: timezoneData.gmtOffset,
          gmt_offset_name: timezoneData.gmtOffsetName,
          abbreviation: timezoneData.abbreviation,
          tz_name: timezoneData.tzName,
        });
      }
    }
    if ('translations' in countryData && countryData?.translations) {
      for (const [lang, translation] of Object.entries(countryData.translations)) {
        await modelTranslation.create({
          country_id: country.id,
          language_code: lang,
          translation: translation as string,
        });
      }
    }
  }
  return countriesData.length;
}
