import { useHistory, useLocation } from 'react-router';
import qs from 'query-string';
import { useCallback, useMemo } from 'react';
import omit from 'lodash.omit';

const useFiltersQuery = () => {
  const { search } = useLocation();
  const history = useHistory();

  const filter = useMemo(() => qs.parse(search, { parseNumbers: true, parseBooleans: true }), [search]);

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
      const newFilter = omit(filter, name);

      setSearchQuery(newFilter);
    },
    [filter, setSearchQuery]
  );

  const handleChangeFilter = useCallback(
    ({ target }) => {
      const { name, value } = target;
      if (value === false || value === 0) {
        const newFilter = { ...filter, [name]: value };
        setSearchQuery(newFilter);
        return clearFilter({ target });
      }
      const newFilter = { ...filter, [name]: value };
      return setSearchQuery(newFilter);
    },

    [filter, setSearchQuery, clearFilter]
  );
  const handleResetFilters = () => {
    history.replace({});
  };

  return [filter, handleChangeFilter, handleResetFilters];
};

export default useFiltersQuery;
