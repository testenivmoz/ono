import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';

type CategoryRow = Database['public']['Tables']['categories']['Row'];
type AreaRow = Database['public']['Tables']['areas']['Row'];

export interface CategoryWithAreas extends CategoryRow {
  areas: AreaRow[];
}

export function useCategories() {
  const [categories, setCategories] = useState<CategoryWithAreas[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('categories')
        .select(`
          *,
          areas(*)
        `)
        .order('name');

      if (error) throw error;

      const transformedData: CategoryWithAreas[] = data.map(cat => ({
        ...cat,
        areas: cat.areas || []
      }));

      setCategories(transformedData);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories
  };
}