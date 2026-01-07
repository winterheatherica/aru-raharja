export type Person = {
  id: string | number;
  name: string;
  title?: string;
  bio?: string;
  img: string;
};

export type Group = {
  heading: string;
  items: Person[];
};
