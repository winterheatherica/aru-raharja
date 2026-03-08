export type ArticleCategory = {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
};

export type Article = {
  id?: string;
  title?: string;
  slug?: string;
  category?: string;
  categories?: ArticleCategory[];
  created_at?: string;
  published_by?: string;
  published_by_avatar_url?: string;
  image_url?: string;
  content?: string;
  excerpt?: string;
};
