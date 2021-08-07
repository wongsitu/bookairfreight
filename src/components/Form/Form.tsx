import { useEffect } from 'react';
import { useForm } from "react-hook-form";

import useFormContext from '../../hooks/useFormContext'
import useValidateCountry from '../../hooks/useValidateCountry';
import { FormData, ACTIONS } from '../../context/types';
import calculateResult from '../../utils/calculateResult';

import { textValidations, priceValidation, shippingOptions, shippingValidation } from './constants';

import localeEn from './i18n/localEn';

const Form = () => {
  const { state: { form }, dispatch } = useFormContext();
  const { register, handleSubmit, watch, setError, clearErrors, formState: { errors } } = useForm<FormData>({ defaultValues: form, mode: 'onSubmit' });
  const startingCountry = watch('startingCountry');
  const destinationCountry = watch('destinationCountry');
  const { isValidCountry: isStartingCountryValid } = useValidateCountry({ country: startingCountry, key: 'getstartingCountry' })
  const { isValidCountry: isDestinationCountryValid } = useValidateCountry({ country: destinationCountry, key: 'getdestinationCountry' })
  const areCountriesValid = isStartingCountryValid && isDestinationCountryValid

  useEffect(() => {
    if (startingCountry && destinationCountry && startingCountry === destinationCountry) {
      setError('destinationCountry', { message: localeEn.en.COUNTRIES_SHOULD_BE_DIFFERENT })
      setError('startingCountry', { message: localeEn.en.COUNTRIES_SHOULD_BE_DIFFERENT })
    } else {
      clearErrors()
    }
  }, [isStartingCountryValid, isDestinationCountryValid, destinationCountry, startingCountry, setError, clearErrors])

  const onSubmit = async (payload: FormData) => {
    // This would be an API call in a real app
    if (areCountriesValid) {
      try {
        const { success, data } = await calculateResult(payload)

        if (success) {
          dispatch({
            type: ACTIONS.SET_RESULT_VALUES,
            payload: data
          })
          dispatch({
            type: ACTIONS.SET_FORM_VALUES,
            payload,
          })
        }
      } catch (err) {
        // I'd handle this error with some ui change or sentry warning
        console.log(err)
      }
    } else {
      dispatch({
        type: ACTIONS.SET_RESULT_VALUES,
        payload: undefined
      })
    }
  }

  return (
    <form className="form--container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form--input">
        <label className="form--input-label" htmlFor="startingCountry">{localeEn.en.START_COUNTRY_LABEL}</label>
        <input autoComplete="none" id="startingCountry" type="text" {...register("startingCountry", textValidations)} />
        {isStartingCountryValid !== undefined && !isStartingCountryValid && (<span className="error-message">{localeEn.en.INVALID_COUNTRY}</span>)}
        {errors.startingCountry?.message && <span className="error-message">{errors.startingCountry?.message}</span>}
      </div>
      <div className="form--input">
        <label className="form--input-label" htmlFor="destinationCountry">{localeEn.en.DESTINATION_COUNTRY_LABEL}</label>
        <input autoComplete="none" id="destinationCountry" type="text" {...register("destinationCountry", textValidations)} />
        {isDestinationCountryValid !== undefined && !isDestinationCountryValid && (<span className="error-message">{localeEn.en.INVALID_COUNTRY}</span>)}
        {errors.destinationCountry?.message && <span className="error-message">{errors.destinationCountry?.message}</span>}
      </div>
      <div className="form--input">
        <label className="form--input-label" htmlFor="quotePrice">{localeEn.en.QUOTE_PRICE_LABEL}</label>
        <input id="quotePrice" type="number" {...register("quotePrice", priceValidation)} />
        {errors.quotePrice?.message && <span className="error-message">{errors.quotePrice?.message}</span>}
      </div>
      <div className="form--input">
        <label className="form--input-label" htmlFor="shippingChannel">{localeEn.en.SHIPPING_CHANNEL_LABEL}</label>
        <select id="shippingChannel" {...register("shippingChannel", shippingValidation)}>
          {shippingOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.shippingChannel?.message && <span className="error-message">{errors.shippingChannel?.message}</span>}
      </div>
      <input className="form--submit-button" value={localeEn.en.SUBMIT_BUTTON} type="submit" />
    </form>
  )
}

export default Form;