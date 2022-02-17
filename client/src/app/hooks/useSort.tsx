import { useState } from 'react';

type Order = 'asc' | 'desc';

export default function useSort<T>(items: T[], initialSortBy: { path: keyof T; order: Order }) {
  const [sortBy, setSortBy] = useState(initialSortBy || {});

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order: Order, orderBy: keyof T) {
    return order === 'desc'
      ? (a: T, b: T) => descendingComparator(a, b, orderBy)
      : (a: T, b: T) => -descendingComparator(a, b, orderBy);
  }

  function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  const handleRequestSort = (event: Event | React.MouseEvent<unknown>, property: keyof T) => {
    const isAsc = sortBy.path === property && sortBy.order === 'asc';
    setSortBy({ path: property, order: isAsc ? 'desc' : 'asc' });
  };

  const sortedItems = stableSort(items, getComparator(sortBy.order, sortBy.path));

  return { sortedItems, sortBy, setSortBy, handleRequestSort };
}
