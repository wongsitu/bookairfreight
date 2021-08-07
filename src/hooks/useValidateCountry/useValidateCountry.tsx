import { useEffect } from 'react';
import { useQuery } from 'react-query'
import { from, BehaviorSubject } from 'rxjs';
import {
  debounceTime,
  switchMap,
  distinctUntilChanged,
} from 'rxjs/operators';
import { Response, Variables, useValidateCountryVariables } from './types'

const _searchResultBehavior = new BehaviorSubject<string>('');
const searchResultObservable$ = _searchResultBehavior.asObservable();

const fetchCountry = async (country: string) => {
  const response = await fetch(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`).then(res =>
    res.json()
  )

  return response
};

const useValidateCountry = ({ country, key }: useValidateCountryVariables) => {
  const {
    isLoading,
    error,
    data,
    refetch
  } = useQuery<Response, Variables>(key, () => fetchCountry(country), {
    enabled: !!country,
  }
  )

  useEffect(() => {
    if (country.length >= 3) {
      _searchResultBehavior.next(country);
      const subject = searchResultObservable$
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap(() =>
            from(
              refetch(),
            ),
          ),
        )
        .subscribe();

      return () => {
        subject.unsubscribe();
      };
    }
  }, [country, refetch]);

  const isValidCountry = data ? Array.isArray(data) : undefined;

  return { isValidCountry, isLoading, error }
}

export default useValidateCountry

