import type { Entity, Person, Response } from './types';

export const getAllPeople = async (
  page: number = 1
): Promise<Response<Entity<Person>>> => {
  const url = new URL('https://swapi.tech/api/people');
  url.search = new URLSearchParams({
    page: page.toString(),
    expanded: 'true',
  }).toString();
  const res = await fetch(url);
  return res.json();
};

export const searchPeople = async (
  search: string
): Promise<Response<Entity<Person>>> => {
  const url = new URL('https://swapi.tech/api/people');
  url.search = new URLSearchParams({
    name: search,
    expanded: 'true',
  }).toString();
  const res = await fetch(url);
  return res.json();
};
