import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';
import { SearchFilters } from '../types';

type DocumentRow = Database['public']['Tables']['documents']['Row'];
type AuthorRow = Database['public']['Tables']['authors']['Row'];
type CategoryRow = Database['public']['Tables']['categories']['Row'];
type AreaRow = Database['public']['Tables']['areas']['Row'];

export interface DocumentWithRelations extends DocumentRow {
  authors: AuthorRow[];
  category: CategoryRow | null;
  area: AreaRow | null;
}

export function useDocuments() {
  const [documents, setDocuments] = useState<DocumentWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = async (filters?: SearchFilters) => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('documents')
        .select(`
          *,
          authors:document_authors(
            author:authors(*)
          ),
          category:categories(*),
          area:areas(*)
        `)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters?.type) {
        query = query.eq('type', filters.type);
      }
      if (filters?.categoryId) {
        query = query.eq('category_id', filters.categoryId);
      }
      if (filters?.areaId) {
        query = query.eq('area_id', filters.areaId);
      }
      if (filters?.year) {
        query = query.eq('year', filters.year);
      }
      if (filters?.language) {
        query = query.eq('language', filters.language);
      }
      if (filters?.institution) {
        query = query.ilike('institution', `%${filters.institution}%`);
      }

      // Text search
      if (filters?.query) {
        query = query.or(`
          title.ilike.%${filters.query}%,
          abstract.ilike.%${filters.query}%,
          keywords.cs.{${filters.query}}
        `);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Transform the data to match our interface
      const transformedData: DocumentWithRelations[] = data.map(doc => ({
        ...doc,
        authors: doc.authors?.map((da: any) => da.author).filter(Boolean) || [],
        category: doc.category || null,
        area: doc.area || null
      }));

      setDocuments(transformedData);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const incrementViewCount = async (documentId: string) => {
    try {
      await supabase.rpc('increment_view_count', { document_id: documentId });
      
      // Update local state
      setDocuments(prev => prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, view_count: (doc.view_count || 0) + 1 }
          : doc
      ));
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };

  const incrementDownloadCount = async (documentId: string) => {
    try {
      await supabase.rpc('increment_download_count', { document_id: documentId });
      
      // Update local state
      setDocuments(prev => prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, download_count: (doc.download_count || 0) + 1 }
          : doc
      ));
    } catch (error) {
      console.error('Error incrementing download count:', error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return {
    documents,
    loading,
    error,
    fetchDocuments,
    incrementViewCount,
    incrementDownloadCount
  };
}