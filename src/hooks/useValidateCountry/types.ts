export type SuccessResponse = {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  region: string;
  subregion: string;
  population: number;
}[];

export type ErrorResponse = {
  status: number;
  message: string;
};

export type Response = SuccessResponse | ErrorResponse;

export interface Variables {
  country: string;
}

export interface useValidateCountryVariables extends Variables {
  key: string;
}
