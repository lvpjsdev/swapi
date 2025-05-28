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
