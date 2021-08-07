import {
  createContext,
  Dispatch,
} from 'react';
import { StateType, ActionsType } from './types';
import { initialState } from './InitialState';

export const FormContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionsType>;
}>({
  state: initialState,
  dispatch: () => undefined,
});
