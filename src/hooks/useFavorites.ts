import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const fetchFavorites = async () => {
    if (!user) {
      setFavorites(new Set());
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_favorites')
        .select('document_id')
        .eq('user_id', user.id);

      if (error) throw error;

      const favoriteIds = new Set(data.map(fav => fav.document_id).filter(Boolean));
      setFavorites(favoriteIds);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (documentId: string) => {
    if (!user) {
      throw new Error('User must be logged in to manage favorites');
    }

    try {
      const isFavorited = favorites.has(documentId);

      if (isFavorited) {
        // Remove from favorites
        const { error } = await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('document_id', documentId);

        if (error) throw error;

        setFavorites(prev => {
          const newSet = new Set(prev);
          newSet.delete(documentId);
          return newSet;
        });
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('user_favorites')
          .insert({
            user_id: user.id,
            document_id: documentId
          });

        if (error) throw error;

        setFavorites(prev => new Set([...prev, documentId]));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorited: (documentId: string) => favorites.has(documentId)
  };
}