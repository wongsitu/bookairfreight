import { FC, useReducer, Fragment } from 'react';
import { FormProviderProps } from './types';
import { StateType, ACTIONS, ActionsType } from './types'
import { FormContext } from './FormContext';
import { initialState } from './InitialState'

const reducer = (state: StateType, action: ActionsType): StateType => {
  switch (action.type) {
    case ACTIONS.SET_FORM_VALUES:
      return {
        ...state,
        form: {
          ...state.form,
          ...action.payload
        }
      };
    case ACTIONS.SET_RESULT_VALUES:
      return {
        ...state,
        result: action.payload ? {
          ...state.form,
          ...action.payload
        } : undefined
      };
    default:
      return state;
  }
};

export const FormProvider: FC<FormProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
  });
  const value = {
    state,
    dispatch,
  };

  return (
    <Fragment>
      <FormContext.Provider value={value}>{children}</FormContext.Provider>
    </Fragment>
  );
};