import { useEffect, useState } from 'react';

export const useDebounce = <T = unknown>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const usePathnameId = (): [number, (id: number) => void] => {
  const [pathnameId, setPathnameId] = useState(0);

  const changePathnameId = (id: number) => {
    window.history.pushState({}, '', id != 0 ? `/${id}` : '/');
    window.dispatchEvent(new Event('popstate'));
    setPathnameId(id);
  };

  useEffect(() => {
    const handlePathnameChange = () => {
      const id = parseInt(window.location.pathname.split('/').pop() || '0');
      setPathnameId(id);
    };

    window.addEventListener('popstate', handlePathnameChange);
    window.addEventListener('load', handlePathnameChange);

    return () => {
      window.removeEventListener('popstate', handlePathnameChange);
      window.removeEventListener('load', handlePathnameChange);
    };
  }, []);

  return [pathnameId, changePathnameId];
};
