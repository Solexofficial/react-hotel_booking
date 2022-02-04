import { useState } from 'react';

const useSort = (items, initialSortBy) => {
  console.log(items);
  const [sortBy, setSortBy] = useState(initialSortBy || {});
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array = [], comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = sortBy.path === property && sortBy.order === 'asc';
    setSortBy({ path: property, order: isAsc ? 'desc' : 'asc' });
  };

  const sortedItems = stableSort(items, getComparator(sortBy.order, sortBy.path));

  return { sortedItems, sortBy, setSortBy, handleRequestSort };
};

export default useSort;
