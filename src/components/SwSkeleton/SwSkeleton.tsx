import type { FC } from 'react';
import { Skeleton } from '../ui/skeleton';

interface SwSkeletonProps {
  type?: 'small' | 'full';
}

export const SwSkeleton: FC<SwSkeletonProps> = ({ type = 'small' }) => {
  const size = type === 'small' ? 300 : 400;

  const getStyles = (size: number) => ({
    container: `flex flex-col space-y-3`,
    main: `h-[${size}px] w-[${size}px] rounded-xl`,
    text1: `h-4 w-[${size}px]`,
    text2: `h-4 w-[${size - 50}px]`,
    text3: `h-4 w-[${size - 100}px]`,
    text4: `h-4 w-[${size - 200}px]`,
  });

  const styles = getStyles(size);

  return (
    <div
      style={{ width: size + 50, height: size + 100 }}
      className={styles.container}
    >
      <Skeleton className={styles.main} />
      <div className='space-y-2'>
        <Skeleton className={styles.text1} />
        <Skeleton className={styles.text2} />
        {type === 'full' && (
          <>
            <Skeleton className={styles.text3} />
            <Skeleton className={styles.text4} />
          </>
        )}
      </div>
    </div>
  );
};
