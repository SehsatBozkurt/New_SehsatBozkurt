export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  author: string;
  publishDate: Date;
  status: 'draft' | 'published' | 'scheduled';
  categories: string[];
  tags: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  email: string;
  date: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}