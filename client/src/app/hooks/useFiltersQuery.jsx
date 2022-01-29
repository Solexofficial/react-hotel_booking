import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import { useCallback, useMemo } from 'react';
import omit from 'lodash.omit';

const useFiltersQuery = () => {
  const { search } = useLocation();
  const history = useHistory();

  const filter = useMemo(() => queryString.parse(search), [search]);

  const setSearchQuery = useCallback(
    filter => {
      const search = queryString.stringify(filter);
      history.replace({ search });
    },
    [history]
  );

  const changeFilter = useCallback(
    ({ target }) => {
      console.log('filter', filter);
      console.log('target', target);
      const { name, value } = target;
      if (value === false) clearFilter({ target });
      const newFilter = { ...filter, [name]: value };

      setSearchQuery(newFilter);
    },
    [filter, setSearchQuery]
  );

  const clearFilter = useCallback(
    ({ target }) => {
      const { name } = target;
      const newFilter = omit(filter, name);

      setSearchQuery(newFilter);
    },
    [filter, setSearchQuery]
  );

  return [filter, changeFilter, clearFilter];
};

export default useFiltersQuery;
