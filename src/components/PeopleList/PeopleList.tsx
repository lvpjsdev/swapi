import type { People } from '@/types';
import { SwSmallCard } from '../card';

interface PeopleListProps {
  people: People;
  onPersonCardClick?: (id: number) => void;
}

export const PeopleList: React.FC<PeopleListProps> = ({
  people,
  onPersonCardClick,
}) => {
  return (
    <div className='flex flex-row flex-wrap items-center justify-center min-h-svh gap-4'>
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
