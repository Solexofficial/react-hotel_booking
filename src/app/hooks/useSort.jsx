import orderBy from 'lodash/orderBy';

const useSort = (items, sortBy) => {
  const sortedItems = orderBy(items, [sortBy.path], [sortBy.order]);

  return { sortedItems };
};

export default useSort;
