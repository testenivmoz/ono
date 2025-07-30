import React from 'react';
import { Download, Eye, Heart, Calendar, User, Building, FileText, ExternalLink } from 'lucide-react';
import { DocumentWithRelations } from '../hooks/useDocuments';

interface DocumentCardProps {
  document: DocumentWithRelations;
  onView: (document: DocumentWithRelations) => void;
  onDownload: (document: DocumentWithRelations) => void;
  onFavorite: (document: DocumentWithRelations) => void;
  isFavorited?: boolean;
}

export default function DocumentCard({ 
  document, 
  onView, 
  onDownload, 
  onFavorite, 
  isFavorited = false 
}: DocumentCardProps) {
  const getTypeLabel = (type: DocumentWithRelations['type']) => {
    const labels = {
      thesis: 'Tese',
      dissertation: 'Dissertação',
      monograph: 'Monografia',
      article: 'Artigo',
      book: 'Livro',
    };
    return labels[type];
  };

  const getTypeColor = (type: DocumentWithRelations['type']) => {
    const colors = {
      thesis: 'bg-purple-100 text-purple-800',
      dissertation: 'bg-blue-100 text-blue-800',
      monograph: 'bg-green-100 text-green-800',
      article: 'bg-orange-100 text-orange-800',
      book: 'bg-red-100 text-red-800',
    };
    return colors[type];
  };

  const getLicenseLabel = (license: DocumentWithRelations['license']) => {
    if (!license) return 'N/A';
    const labels = {
      'cc-by': 'CC BY',
      'cc-by-sa': 'CC BY-SA',
      'cc-by-nc': 'CC BY-NC',
      'cc-by-nc-sa': 'CC BY-NC-SA',
      'public-domain': 'Domínio Público',
    };
    return labels[license];
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(document.type)}`}>
              {getTypeLabel(document.type)}
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
              {getLicenseLabel(document.license || 'cc-by')}
            </span>
          </div>
          <button
            onClick={() => onFavorite(document)}
            className={`p-2 rounded-full transition-colors ${
              isFavorited 
                ? 'text-red-500 hover:text-red-600' 
                : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Title and Abstract */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {document.title}
        </h3>
        
        {document.subtitle && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-1">
            {document.subtitle}
          </p>
        )}

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {document.abstract}
        </p>

        {/* Authors */}
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <User className="h-4 w-4 mr-1" />
          <span className="line-clamp-1">
            {document.authors?.map(author => author.name).join(', ') || 'Autor não informado'}
          </span>
        </div>

        {/* Institution and Year */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Building className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">{document.institution}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{document.year}</span>
          </div>
        </div>

        {/* Keywords */}
        {document.keywords && document.keywords.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {document.keywords.slice(0, 3).map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
                >
                  {keyword}
                </span>
              ))}
              {document.keywords.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-50 text-gray-500 rounded">
                  +{document.keywords.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              <span>{document.viewCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <Download className="h-4 w-4 mr-1" />
              <span>{(document.download_count || 0).toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              <span>{(document.view_count || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
              <span>{document.pages || 0} pág.</span>
        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={() => onView(document)}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Visualizar
          </button>
          <button
            onClick={() => onDownload(document)}
            className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium flex items-center justify-center"
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}