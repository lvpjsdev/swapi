import type { FC } from 'react';
import { Skeleton } from '../ui/skeleton';

interface SwSkeletonProps {
  type?: 'small' | 'full';
}

export const SwSkeleton: FC<SwSkeletonProps> = ({ type = 'small' }) => {
  const size = type === 'small' ? 300 : 400;

  return (
    <div
      className={`flex flex-col space-y-3 h-[${size + 100}px] w-[${
        size + 50
      }px]`}
    >
      <Skeleton className={`h-[${size}px] w-[${size}px] rounded-xl`} />
      <div className='space-y-2'>
        <Skeleton className={`h-4 w-[${size}px]`} />
        <Skeleton className={`h-4 w-[${size - 50}px]`} />
        {type === 'full' && (
          <>
            <Skeleton className={`h-4 w-[${size - 100}px]`} />
            <Skeleton className={`h-4 w-[${size - 200}px]`} />
          </>
        )}
      </div>
    </div>
  );
};
