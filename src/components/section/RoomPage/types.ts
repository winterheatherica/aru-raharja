export type Room = {
  id: string;
  slug: string;
  title: string;
  description: string;
  images: {
    url: string;
    alt?: string;
    title?: string;
  }[];
  capacity: number;
  floor: number;
  facilities: string[];
};
