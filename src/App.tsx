import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchFilters from './components/SearchFilters';
import DocumentGrid from './components/DocumentGrid';
import Footer from './components/Footer';
import { SearchFilters as SearchFiltersType } from './types';
import { useAuth } from './hooks/useAuth';
import { useDocuments } from './hooks/useDocuments';
import { useFavorites } from './hooks/useFavorites';

function App() {
  const { user, loading: authLoading } = useAuth();
  const { documents, loading: documentsLoading, fetchDocuments, incrementViewCount, incrementDownloadCount } = useDocuments();
  const { favorites, toggleFavorite } = useFavorites();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFiltersType>({});
  const [showFilters, setShowFilters] = useState(false);
  const [showHero, setShowHero] = useState(true);

  // Apply search and filters
  useEffect(() => {
    const searchFilters = {
      ...filters,
      query: searchQuery || undefined
    };
    fetchDocuments(searchFilters);
  }, [searchQuery, filters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowHero(false);
  };

  const handleView = (document: Document) => {
    incrementViewCount(document.id);
    console.log('Visualizando documento:', document.title);
    // Here you would open the PDF viewer
    if (document.file_url) {
      window.open(document.file_url, '_blank');
    }
  };

  const handleDownload = (document: Document) => {
    incrementDownloadCount(document.id);
    console.log('Baixando documento:', document.title);
    // Here you would initiate the download
    if (document.file_url) {
      const link = document.createElement('a');
      link.href = document.file_url;
      link.download = `${document.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleFavorite = (document: Document) => {
    if (!user) {
      alert('Faça login para gerenciar favoritos');
      return;
    }

    try {
      toggleFavorite(document.id);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Erro ao gerenciar favorito');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearch={handleSearch}
      />
      
      {showHero && (
        <Hero onSearch={handleSearch} />
      )}

      <SearchFilters
        filters={filters}
        onFiltersChange={setFilters}
        isOpen={showFilters}
        onToggle={() => setShowFilters(!showFilters)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showHero && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {searchQuery ? `Resultados para "${searchQuery}"` : 'Explorar Acervo'}
            </h2>
            <p className="text-gray-600">
              {documents.length} documento{documents.length !== 1 ? 's' : ''} encontrado{documents.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        <DocumentGrid
          documents={documents}
          loading={documentsLoading}
          onView={handleView}
          onDownload={handleDownload}
          onFavorite={handleFavorite}
          favoritedIds={favorites}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;