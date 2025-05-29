import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { getAllPeople, searchPeople } from './api';
import { SwFullCard } from './components/card';
import { Search } from './components/search/Search';
import { Filter, type Option } from './components/Filter/Filter';
import { useQuery } from '@tanstack/react-query';
import { Modal } from './components/Modal/Modal';
import { usePathnameId } from './lib/hooks';
import { SwPagination } from './components/SwPagination/SwPagination';
import { PeopleList } from './components/PeopleList/PeopleList';
import type { People, Response, Entity, Person } from './types';
import { Label } from './components/ui/label';

const GenderFilterOptions: Option[] = [
  { name: 'All', value: 'NO_FILTERS' },
  { name: 'Male', value: 'male' },
  { name: 'Female', value: 'female' },
  { name: 'N/A', value: 'n/a' },
];

function App() {
  const [search, setSearch] = useState('');
  const [filterValue, setFilterValue] = useState('NO_FILTERS');
  const [isOpen, setIsOpen] = useState(false);
  const [pathnameId, setPathnameId] = usePathnameId();
  const [page, setPage] = useState(1);

  const peopleQuery = useQuery<
    Response<Entity<Person>>,
    unknown,
    { results: People; totalPages: number; next: string; previous: string }
  >({
    queryKey: ['people', page, search],
    queryFn: async () => {
      try {
        return search
          ? await searchPeople(search, page)
          : await getAllPeople(page);
      } catch (error) {
        toast.error('Uh oh! Something went wrong.', {
          description: 'There was a problem with your request.',
          closeButton: true,
        });
        throw error;
      }
    },
    select: (data) => {
      return {
        results: (data?.results || data?.result || []).map((item) => ({
          ...item.properties,
          id: item.uid || item._id,
        })),
        totalPages: data?.total_pages || 1,
        next: data?.next || '',
        previous: data?.previous || '',
      };
    },
  });

  const filteredPeople = useMemo(() => {
    if (peopleQuery.isPending) return [];

    const results = peopleQuery.data?.results || [];
    return filterValue === 'NO_FILTERS'
      ? results
      : results.filter((person) => {
          return person.gender === filterValue;
        });
  }, [peopleQuery.isPending, filterValue, peopleQuery.data?.results]);

  const selectedPerson = useMemo(() => {
    if (peopleQuery.isPending) return null;

    return peopleQuery.data?.results?.find(
      (person) => person.url?.split('/').pop() === pathnameId.toString()
    );
  }, [peopleQuery.isLoading, pathnameId]);

  useEffect(() => {
    if (pathnameId) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [pathnameId]);

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center p-4'>
        SW People
      </h1>
      <div className='flex flex-col flex-wrap items-stretch justify-between gap-4 mb-4'>
        <Search onSearch={setSearch} />
        <Label>
          Gender:
          <Filter
            options={GenderFilterOptions}
            filterValue={filterValue}
            setFilter={setFilterValue}
          />
        </Label>
      </div>
      <PeopleList
        people={filteredPeople}
        onPersonCardClick={(id) => {
          setPathnameId(id);
        }}
        isLoading={peopleQuery.isPending}
      />
      <div className='pt-8'>
        <SwPagination
          currentPage={page}
          totalPages={peopleQuery.data?.totalPages || 1}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
          onNextPageClick={() => {
            if (peopleQuery.data?.next) {
              setPage((prev) => prev + 1);
            }
          }}
          onPreviousPageClick={() => {
            if (peopleQuery.data?.previous) {
              setPage((prev) => prev - 1);
            }
          }}
        />
      </div>
      <Modal
        isOpen={isOpen}
        onToggle={(isOpen) => {
          setIsOpen(isOpen);
          setPathnameId(0);
        }}
      >
        {<SwFullCard id={pathnameId} person={selectedPerson} />}
      </Modal>
    </div>
  );
}

export default App;
