import { type FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SwCardProps {
  img?: string;
  name: string;
  gender: string;
  birth_year: string;
}

export const SwCard: FC<SwCardProps> = ({ name, gender, birth_year, img = '' }) => {
  return (
    <Card>
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
