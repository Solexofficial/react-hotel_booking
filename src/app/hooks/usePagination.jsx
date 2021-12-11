import { useEffect, useState } from 'react';
import { paginate } from '../utils/paginate';

export function usePagination(items, pageSize) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (items.length < pageSize) {
      setCurrentPage(1);
    }
  }, [items, pageSize]);

  const handleChangePage = (_, value) => {
    setCurrentPage(value);
  };

  const itemsListCrop = paginate(items, currentPage, pageSize);

  return { currentPage, handleChangePage, itemsListCrop };
}
