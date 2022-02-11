import { useLocation } from 'react-router';
import qs from 'query-string';
import { useCallback, useMemo } from 'react';
import omit from 'lodash.omit';
import history from '../utils/history';

const useFiltersQuery = () => {
  const { search } = useLocation<string>();

  const searchFilters = useMemo(() => qs.parse(search, { parseNumbers: true, parseBooleans: true }), [search]);

  const setSearchQuery = useCallback(
    filter => {
      const search = qs.stringify(filter);
      history.replace({ search });
    },
    [history]
  );

  const clearFilter = useCallback(
    ({ target }) => {
      const { name } = target;
      const newFilter = omit(searchFilters, name);

      setSearchQuery(newFilter);
    },
    [searchFilters, setSearchQuery]
  );

  const handleChangeFilter = useCallback(
    ({ target }) => {
      const { name, value } = target;
      if (value === false || value === 0) {
        const newFilter = { ...searchFilters, [name]: value };
        setSearchQuery(newFilter);
        return clearFilter({ target });
      }
      const newFilter = { ...searchFilters, [name]: value };
      return setSearchQuery(newFilter);
    },

    [searchFilters, setSearchQuery, clearFilter]
  );
  const handleResetSearchFilters = useCallback(() => {
    history.replace({});
  }, [history]);

  return { searchFilters, handleChangeFilter, handleResetSearchFilters };
};

export default useFiltersQuery;
