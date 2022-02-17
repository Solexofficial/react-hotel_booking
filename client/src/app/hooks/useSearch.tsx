import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';

export default function useSearch<T>(data: Array<T>, config: { searchBy: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setData] = useState(data || []);
  const [isSearching, setIsSearching] = useState(false);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      const dataFiltered = data.filter((item: any) =>
        item[config.searchBy].toString().toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setData(dataFiltered);
      setIsSearching(false);
    } else {
      setData(data);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm, data]);

  return { filteredData, isSearching, searchTerm, setSearchTerm, handleChangeSearch };
}
