const localeEn = {
  en: {
    START_COUNTRY_LABEL: "Starting Country",
    DESTINATION_COUNTRY_LABEL: "Destination Country",
    QUOTE_PRICE_LABEL: "Quote Price",
    SHIPPING_CHANNEL_LABEL: "Shipping Channel",
    SUBMIT_BUTTON: "Create Quote",

    INVALID_COUNTRY: "Enter a valid country",
    COUNTRIES_SHOULD_BE_DIFFERENT:
      "Starting Country and Destination Country must be different",
    REQUIRED_FIELD: "This is a required field",
    NON_ZERO_PRICE: "Insert a price greater than zero",

    FIELD_GREATER_THAN: (size: number) =>
      `Field value should be greater than ${size} character`,
  },
};

export default localeEn;
