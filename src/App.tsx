import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { getAllPeople, searchPeople } from './api';
import { SwSmallCard, SwFullCard } from './components/card';
import { Search } from './components/search/Search';
import { Filter, type Option } from './components/Filter/Filter';
import { useQuery } from '@tanstack/react-query';
import { Modal } from './components/Modal/Modal';
import { usePathnameId } from './lib/hooks';
import { SwSkeleton } from './components/SwSkeleton/SwSkeleton';
import { SwPagination } from './components/SwPagination/SwPagination';

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

  const peopleQuery = useQuery({
    queryKey: ['people', page, search],
    queryFn: async () => {
      try {
        return search
          ? await searchPeople(search, page)
          : await getAllPeople(page);
      } catch {
        toast.error('Uh oh! Something went wrong.', {
          description: 'There was a problem with your request.',
          closeButton: true,
        });
      }
    },
    select: (data) => {
      if (data?.result) {
        return {
          ...data,
          results: data.result,
        };
      }
      return data;
    },
  });

  const filteredPeople = useMemo(() => {
    if (peopleQuery.isPending) return [];

    return filterValue === 'NO_FILTERS'
      ? peopleQuery.data?.results
      : peopleQuery.data?.results?.filter((person) => {
          return person.properties.gender === filterValue;
        }) || [];
  }, [peopleQuery.isLoading, filterValue]);

  const selectedPerson = useMemo(() => {
    if (peopleQuery.isLoading) return null;

    return peopleQuery.data?.results?.find(
      (person) =>
        person.properties.url?.split('/').pop() === pathnameId.toString()
    )?.properties;
  }, [peopleQuery.isLoading, pathnameId]);

  useEffect(() => {
    if (pathnameId) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [pathnameId]);

  return (
    <>
      <Search onSearch={setSearch} />
      <Filter
        options={GenderFilterOptions}
        filterValue={filterValue}
        setFilter={setFilterValue}
      />
      <div className='flex flex-row flex-wrap items-center justify-center min-h-svh gap-4'>
        {peopleQuery.isPending ? (
          Array(10)
            .fill(undefined)
            .map((_, index) => <SwSkeleton key={index} />)
        ) : (
          <div>
            {filteredPeople?.map((person) => {
              const { name, gender, birth_year } = person.properties;
              const id =
                person.properties.url?.split('/').filter(Boolean).pop() || '0';

              return (
                <SwSmallCard
                  key={id}
                  name={name}
                  gender={gender}
                  birth_year={birth_year}
                  onClick={() => {
                    setPathnameId(Number(id));
                    setIsOpen(true);
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
      <SwPagination
        currentPage={page}
        totalPages={peopleQuery.data?.total_pages || 1}
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
      <Modal
        isOpen={isOpen}
        onToggle={(isOpen) => {
          setIsOpen(isOpen);
          window.history.pushState(null, '', `/`);
        }}
      >
        {<SwFullCard id={pathnameId} person={selectedPerson} />}
      </Modal>
    </>
  );
}

export default App;
