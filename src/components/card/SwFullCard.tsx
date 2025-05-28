import { type FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Person } from '@/types';
import { getPerson } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { SwSkeleton } from '../SwSkeleton/SwSkeleton';

interface SwFullCardProps {
  id: number;
  person?: Person | null;
}

export const SwFullCard: FC<SwFullCardProps> = ({ id, person }) => {
  console.log(id);

  console.log(person);

  const personQuery = useQuery({
    queryKey: ['person', id],
    queryFn: () => getPerson(id),
    select: (data) => data.result?.properties as Person,
    enabled: !person,
  });
  const { name, gender, birth_year, height, mass, eye_color } =
    personQuery.data || person || {};

  return (
    <Card>
      {personQuery.isLoading ? (
        <SwSkeleton type='full' />
      ) : (
        <>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={''} alt={name} width={400} height={400} />
            <div>
              <p>{`gender: ${gender}`}</p>
              <p>{`birth_year: ${birth_year}`}</p>
              <p>{`height: ${height}`}</p>
              <p>{`mass: ${mass}`}</p>
              <p>{`eye_color: ${eye_color}`}</p>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
};
