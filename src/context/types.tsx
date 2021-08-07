import { ReactNode } from "react";

export interface FormProviderProps {
  children: ReactNode;
}

export type SHIPPING_TYPE = 'Air' | 'Ocean'

export interface FormData {
  startingCountry: string;
  destinationCountry: string;
  quotePrice: number;
  shippingChannel: SHIPPING_TYPE;
}

export interface ResultType extends FormData {
  lowerBoundRangeDate: number;
  upperBoundRangeDate: number;
  estimatedDelivery: string;
  formattedPrice: string;
}

export type StateType = {
  form: FormData;
  result?: ResultType;
};

export enum ACTIONS {
  SET_FORM_VALUES = "SET_FORM_VALUES",
  SET_RESULT_VALUES = "SET_RESULT_VALUES",
}

interface SET_FORM_VALUES_ACTION {
  type: ACTIONS.SET_FORM_VALUES;
  payload: FormData;
}

interface SET_RESULT_VALUES_ACTION {
  type: ACTIONS.SET_RESULT_VALUES;
  payload?: ResultType;
}

export type ActionsType = SET_FORM_VALUES_ACTION | SET_RESULT_VALUES_ACTION;
