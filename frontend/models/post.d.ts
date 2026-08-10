type ImagePost = {
  id: number;
  name: string;
  alternativeText: string;
  url: string;
  width: number;
  height: number;
};

type AuthorPost = {
  name: string;
  bio: string;
  avatar: ImagePost;
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  minReadTime: number;
  excerpt: string;
  cover: ImagePost;
  content: any[];
  category: { name: string; slug: string };
  tags: Array<{ name: string; slug: string }>;
  updatedAt: string;
  author: AuthorPost;
  relatedPosts: Array<{
    id: number;
    title: string;
    slug: string;
    cover: ImagePost;
  }>;
};
