import { type FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Person } from '@/types';
import { getPerson } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { SwSkeleton } from '../SwSkeleton/SwSkeleton';
import noImg from '../../assets/no-img.png';
import { toast } from 'sonner';

interface SwFullCardProps {
  id: number;
  person?: Person | null;
  img?: string;
}

export const SwFullCard: FC<SwFullCardProps> = ({ id, person, img }) => {
  const personQuery = useQuery({
    queryKey: ['person', id],
    queryFn: async () => {
      try {
        return await getPerson(id);
      } catch (error) {
        toast.error('Uh oh! Something went wrong.', {
          description: 'There was a problem with your request.',
          closeButton: true,
        });
        throw error;
      }
    },
    select: (data) => data.result?.properties as Person,
    enabled: !person && id > 0,
  });
  const { name, gender, birth_year, height, mass, eye_color } =
    personQuery.data || person || {};

  return (
    <Card>
      {personQuery.isPending ? (
        <SwSkeleton type='full' />
      ) : (
        <>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={img || noImg} alt={name} width={400} height={400} />
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
