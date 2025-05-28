import type { Entity, Person, Response, ResponseOne } from './types';

export const getPerson = async (
  id: number
): Promise<ResponseOne<Entity<Person>>> => {
  const url = new URL(`https://swapi.tech/api/people/${id}`);
  const res = await fetch(url);
  return res.json();
};

export const getAllPeople = async (
  page: number = 1
): Promise<Response<Entity<Person>>> => {
  const url = new URL('https://swapi.tech/api/people');
  url.search = new URLSearchParams({
    page: page.toString(),
    limit: '10',
    expanded: 'true',
  }).toString();
  const res = await fetch(url);
  return res.json();
};

export const searchPeople = async (
  search: string,
  page: number = 1
): Promise<Response<Entity<Person>>> => {
  const url = new URL('https://swapi.tech/api/people');
  url.search = new URLSearchParams({
    name: search,
    expanded: 'true',
    page: page.toString(),
    limit: '10',
  }).toString();
  const res = await fetch(url);
  return res.json();
};
