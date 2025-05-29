import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { FilterType } from '@/types';
import type { FC } from 'react';

export type Option = {
  name: string;
  value: FilterType | 'NO_FILTERS';
};

interface FilterProps {
  labelStr?: string;
  placeholder?: string;
  options: Option[];
  filterValue: string;
  setFilter: (filterValue: string) => void;
}

export const Filter: FC<FilterProps> = ({
  labelStr,
  placeholder,
  options,
  filterValue,
  setFilter,
}) => {
  return (
    <>
      <Label>{labelStr}</Label>
      <Select
        defaultValue='NO_FILTERS'
        value={filterValue}
        onValueChange={setFilter}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option: Option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};
