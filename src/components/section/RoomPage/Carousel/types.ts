export type Person = {
  id: string | number;
  name: string;
  title?: string;
  bio?: string;
  img: string; // relative to /public
};

export type Group = {
  heading: string;
  items: Person[];
};
