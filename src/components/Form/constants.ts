import { RegisterOptions, FieldValues } from "react-hook-form";
import { SHIPPING_TYPE } from "../../context/types";
import localeEn from "./i18n/localEn";

export const textValidations: RegisterOptions<FieldValues> = {
  required: { value: true, message: localeEn.en.REQUIRED_FIELD },
  maxLength: {
    value: 20,
    message: localeEn.en.FIELD_GREATER_THAN(20),
  },
  minLength: {
    value: 3,
    message: localeEn.en.FIELD_GREATER_THAN(3),
  },
};

export const priceValidation: RegisterOptions<FieldValues> = {
  required: { value: true, message: localeEn.en.REQUIRED_FIELD },
  min: { value: 1, message: localeEn.en.NON_ZERO_PRICE },
};

export const shippingValidation: RegisterOptions<FieldValues> = {
  required: { value: true, message: localeEn.en.REQUIRED_FIELD },
};

export const shippingOptions: SHIPPING_TYPE[] = ["Air", "Ocean"];
