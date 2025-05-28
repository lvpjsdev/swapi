import { useCallback, type FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SwSmallCardProps {
  img?: string;
  id?: string;
  name: string;
  gender: string;
  birth_year: string;
  onClick?: () => void;
}

export const SwSmallCard: FC<SwSmallCardProps> = ({
  name,
  gender,
  birth_year,
  img = '',
  onClick,
}) => {
  return (
    <Card onClick={onClick}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={img} alt={name} width={300} height={300} />
        <ul>
          <li>{`gender: ${gender}`}</li>
          <li>{`birth_year: ${birth_year}`}</li>
        </ul>
      </CardContent>
    </Card>
  );
};
