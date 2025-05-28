import { useEffect, useState } from 'react';
import { getAllPeople, searchPeople } from './api';
import type { Entity, Person } from './types';
import { SwCard } from './components/card/SwCard';
import { Search } from './components/search/Search';

function App() {
  const [people, setPeople] = useState<Entity<Person>[]>([]);
  const [search, setSearch] = useState('');

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

  console.log(people);

  return (
    <>
      <Search onSearch={setSearch} />
      <div className='flex flex-row flex-wrap items-center justify-center min-h-svh gap-4'>
        {people?.map((person) => {
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
