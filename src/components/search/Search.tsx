import { useEffect, useState, type FC } from 'react';
import { Input } from '../ui/input';
import { useDebounce } from '@/lib/hooks';

interface SearchProps {
  onSearch: (search: string) => void;
}

export const Search: FC<SearchProps> = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const searchValue = useDebounce(search, 300);

  useEffect(() => {
    onSearch(searchValue);
  }, [searchValue, onSearch]);

  return (
    <div>
      <Input
        placeholder='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
