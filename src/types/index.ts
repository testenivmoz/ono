export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  institution?: string;
  createdAt: Date;
}

export interface Author {
  id: string;
  name: string;
  email?: string;
  institution?: string;
  orcid?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Area {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description?: string;
}

export interface Document {
  id: string;
  title: string;
  subtitle?: string;
  abstract: string;
  keywords: string[];
  authors: Author[];
  type: 'thesis' | 'dissertation' | 'monograph' | 'article' | 'book';
  categoryId: string;
  areaId: string;
  institution: string;
  year: number;
  pages: number;
  language: string;
  license: 'cc-by' | 'cc-by-sa' | 'cc-by-nc' | 'cc-by-nc-sa' | 'public-domain';
  fileUrl: string;
  thumbnailUrl?: string;
  downloadCount: number;
  viewCount: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchFilters {
  query?: string;
  type?: Document['type'];
  categoryId?: string;
  areaId?: string;
  year?: number;
  institution?: string;
  author?: string;
  language?: string;
}

export interface UserFavorite {
  id: string;
  userId: string;
  documentId: string;
  createdAt: Date;
}

export interface ReadingHistory {
  id: string;
  userId: string;
  documentId: string;
  lastPage?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentRequest {
  id: string;
  title: string;
  description: string;
  requestedBy: string;
  status: 'open' | 'fulfilled' | 'closed';
  createdAt: Date;
}