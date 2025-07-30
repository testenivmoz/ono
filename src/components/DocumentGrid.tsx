import React from 'react';
import { DocumentWithRelations } from '../hooks/useDocuments';
import DocumentCard from './DocumentCard';
import { BookOpen } from 'lucide-react';

interface DocumentGridProps {
  documents: DocumentWithRelations[];
  loading?: boolean;
  onView: (document: DocumentWithRelations) => void;
  onDownload: (document: DocumentWithRelations) => void;
  onFavorite: (document: DocumentWithRelations) => void;
  favoritedIds?: Set<string>;
}

export default function DocumentGrid({ 
  documents, 
  loading = false, 
  onView, 
  onDownload, 
  onFavorite,
  favoritedIds = new Set()
}: DocumentGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="animate-pulse">
              <div className="flex space-x-2 mb-4">
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="flex space-x-2">
                <div className="h-10 bg-gray-200 rounded flex-1"></div>
                <div className="h-10 bg-gray-200 rounded flex-1"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhum documento encontrado
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Tente ajustar os filtros de busca ou usar termos diferentes para encontrar 
          o conteúdo que você está procurando.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          onView={onView}
          onDownload={onDownload}
          onFavorite={onFavorite}
          isFavorited={favoritedIds.has(document.id)}
        />
      ))}
    </div>
  );
}