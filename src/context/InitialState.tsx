import { StateType } from "./types";

export const initialState: StateType = {
  form: {
    startingCountry: "",
    destinationCountry: "",
    quotePrice: 0,
    shippingChannel: 'Air',
  },
  result: undefined,
};
