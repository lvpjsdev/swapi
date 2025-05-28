import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useCallback, type FC } from 'react';

interface SwPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
  onNextPageClick?: () => void;
  onPreviousPageClick?: () => void;
}

export const SwPagination: FC<SwPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  onNextPageClick,
  onPreviousPageClick,
}) => {
  const handlePageClick = useCallback(
    (page: number) => {
      if (onPageChange) {
        onPageChange(page);
      }
    },
    [onPageChange]
  );

  if (totalPages <= 1) {
    return null; // No pagination needed if there's only one page
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={onPreviousPageClick} />
        </PaginationItem>
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageClick(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageClick(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext onClick={onNextPageClick} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
