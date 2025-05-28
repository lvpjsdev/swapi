import { useMemo, useState } from 'react';
import { getAllPeople, searchPeople } from './api';
import { SwCard } from './components/card/SwCard';
import { Search } from './components/search/Search';
import { Filter, type Option } from './components/Filter/Filter';
import { useQuery } from '@tanstack/react-query';

const GenderFilterOptions: Option[] = [
  { name: 'All', value: 'NO_FILTERS' },
  { name: 'Male', value: 'male' },
  { name: 'Female', value: 'female' },
  { name: 'N/A', value: 'n/a' },
];

function App() {
  const [search, setSearch] = useState('');
  const [filterValue, setFilterValue] = useState('NO_FILTERS');

  const peopleQuery = useQuery({
    queryKey: ['people', search],
    queryFn: () => (search ? searchPeople(search) : getAllPeople()),
    select: (data) => {
      if (data.result) {
        return {
          ...data,
          results: data.result,
        };
      }
      return data;
    },
  });

  const filteredPeople = useMemo(() => {
    if (peopleQuery.isLoading) return [];

    return filterValue === 'NO_FILTERS'
      ? peopleQuery.data?.results
      : peopleQuery.data?.results?.filter((person) => {
          return person.properties.gender === filterValue;
        }) || [];
  }, [peopleQuery.isLoading, filterValue]);

  return (
    <>
      <Search onSearch={setSearch} />
      <Filter
        options={GenderFilterOptions}
        filterValue={filterValue}
        setFilter={setFilterValue}
      />
      <div className='flex flex-row flex-wrap items-center justify-center min-h-svh gap-4'>
        {filteredPeople?.map((person) => {
          const { name, gender, birth_year } = person.properties;
          const id = person.properties.url?.split('/').filter(Boolean).pop();
          return (
            <SwCard
              key={id}
              name={name}
              gender={gender}
              birth_year={birth_year}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
