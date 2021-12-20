import orderBy from 'lodash/orderBy';

export const useSort = (items, sortBy) => {
  const sortedItems = orderBy(items, [sortBy.path], [sortBy.order]);

  return { sortedItems };
};
