export type FilterType = Gender;

export type Gender = 'male' | 'female' | 'n/a';

export type People = (Person & { id: string })[];
export interface Person {
  created: string;
  edited: string;
  name: string;
  gender: string;
  skin_color: string;
  hair_color: string;
  height: string;
  eye_color: string;
  mass: string;
  homeworld: string;
  birth_year: string;
  url: string;
}

export interface Entity<T> {
  properties: T;
  _id: string;
  description: string;
  uid: string;
  __v: number;
}

export interface ResponseOne<T> {
  message: string;
  result?: T;
}
export interface Response<T> {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results?: T[];
  result?: T[];
}
