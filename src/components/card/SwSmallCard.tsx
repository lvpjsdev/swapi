import { type FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import noImg from '../../assets/no-img.png';

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
  img,
  onClick,
}) => {
  return (
    <Card onClick={onClick}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={img || noImg} alt={name} width={300} height={300} />
        <div>
          <p>{`gender: ${gender}`}</p>
          <p>{`birth_year: ${birth_year}`}</p>
        </div>
      </CardContent>
    </Card>
  );
};
