import { useEffect, useMemo, useState } from 'react';
import { getAllPeople, searchPeople } from './api';
import type { Entity, Person } from './types';
import { SwCard } from './components/card/SwCard';
import { Search } from './components/search/Search';
import { Filter, type Option } from './components/Filter/Filter';

const GenderFilterOptions: Option[] = [
  { name: 'All', value: 'NO_FILTERS' },
  { name: 'Male', value: 'male' },
  { name: 'Female', value: 'female' },
  { name: 'N/A', value: 'n/a' },
];

function App() {
  const [people, setPeople] = useState<Entity<Person>[]>([]);
  const [search, setSearch] = useState('');
  const [filterValue, setFilterValue] = useState('NO_FILTERS');

  useEffect(() => {
    getAllPeople().then((data) => {
      setPeople(data.results || data.result || []);
    });
  }, [setPeople]);

  useEffect(() => {
    searchPeople(search).then((data) => {
      console.log('search', search);

      console.log('data', data);

      setPeople(data.results || data.result || []);
    });
  }, [search]);

  const filteredPeople = useMemo(() => {
    return filterValue === 'NO_FILTERS'
      ? people
      : people.filter((person) => {
          return person.properties.gender === filterValue;
        });
  }, [people, filterValue]);

  console.log(people);

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
