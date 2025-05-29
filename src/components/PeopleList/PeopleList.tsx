import type { People } from '@/types';
import { SwSmallCard } from '../card';
import { SwSkeleton } from '../SwSkeleton/SwSkeleton';

interface PeopleListProps {
  people: People;
  onPersonCardClick?: (id: number) => void;
  isLoading?: boolean;
}

export const PeopleList: React.FC<PeopleListProps> = ({
  people,
  onPersonCardClick,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className='flex flex-row flex-wrap items-center justify-center gap-4'>
        {Array.from({ length: 10 }).map((_, index) => (
          <SwSkeleton key={index} type='small' />
        ))}
      </div>
    );
  }

  return (
    <div className='flex flex-row flex-wrap items-center justify-center gap-4'>
      {people?.map((person) => {
        const { name, gender, birth_year, id } = person;
        return (
          <SwSmallCard
            key={id}
            name={name}
            gender={gender}
            birth_year={birth_year}
            onClick={() => {
              onPersonCardClick?.(Number(id));
            }}
          />
        );
      })}
    </div>
  );
};
