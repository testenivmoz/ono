import React, { useState } from 'react';
import { X, Upload, FileText, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCategories } from '../../hooks/useCategories';
import { supabase } from '../../lib/supabase';
import { Database } from '../../lib/database.types';

type DocumentType = Database['public']['Enums']['document_type'];
type LicenseType = Database['public']['Enums']['license_type'];

interface DocumentUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface Author {
  name: string;
  email?: string;
  institution?: string;
  orcid?: string;
}

export default function DocumentUpload({ isOpen, onClose, onSuccess }: DocumentUploadProps) {
  const { user } = useAuth();
  const { categories } = useCategories();
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    abstract: '',
    keywords: '',
    type: 'thesis' as DocumentType,
    categoryId: '',
    areaId: '',
    institution: '',
    year: new Date().getFullYear(),
    pages: 0,
    language: 'pt',
    license: 'cc-by' as LicenseType,
  });

  const [authors, setAuthors] = useState<Author[]>([
    { name: '', email: '', institution: '', orcid: '' }
  ]);

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const documentTypes = [
    { value: 'thesis', label: 'Tese' },
    { value: 'dissertation', label: 'Dissertação' },
    { value: 'monograph', label: 'Monografia' },
    { value: 'article', label: 'Artigo' },
    { value: 'book', label: 'Livro' },
  ];

  const licenses = [
    { value: 'cc-by', label: 'CC BY - Atribuição' },
    { value: 'cc-by-sa', label: 'CC BY-SA - Atribuição-CompartilhaIgual' },
    { value: 'cc-by-nc', label: 'CC BY-NC - Atribuição-NãoComercial' },
    { value: 'cc-by-nc-sa', label: 'CC BY-NC-SA - Atribuição-NãoComercial-CompartilhaIgual' },
    { value: 'public-domain', label: 'Domínio Público' },
  ];

  const selectedCategory = categories.find(cat => cat.id === formData.categoryId);
  const availableAreas = selectedCategory?.areas || [];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Reset area when category changes
    if (field === 'categoryId') {
      setFormData(prev => ({ ...prev, areaId: '' }));
    }
  };

  const handleAuthorChange = (index: number, field: keyof Author, value: string) => {
    setAuthors(prev => prev.map((author, i) => 
      i === index ? { ...author, [field]: value } : author
    ));
  };

  const addAuthor = () => {
    setAuthors(prev => [...prev, { name: '', email: '', institution: '', orcid: '' }]);
  };

  const removeAuthor = (index: number) => {
    if (authors.length > 1) {
      setAuthors(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Apenas arquivos PDF são aceitos');
        return;
      }
      if (selectedFile.size > 50 * 1024 * 1024) { // 50MB limit
        setError('O arquivo deve ter no máximo 50MB');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = 'pdf';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `documents/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !file) return;

    setLoading(true);
    setError(null);

    try {
      // Upload file
      const fileUrl = await uploadFile(file);

      // Create or get authors
      const authorIds: string[] = [];
      for (const author of authors) {
        if (!author.name.trim()) continue;

        // Check if author exists
        const { data: existingAuthor } = await supabase
          .from('authors')
          .select('id')
          .eq('name', author.name)
          .eq('email', author.email || '')
          .single();

        if (existingAuthor) {
          authorIds.push(existingAuthor.id);
        } else {
          // Create new author
          const { data: newAuthor, error: authorError } = await supabase
            .from('authors')
            .insert({
              name: author.name,
              email: author.email || null,
              institution: author.institution || null,
              orcid: author.orcid || null,
            })
            .select('id')
            .single();

          if (authorError) throw authorError;
          if (newAuthor) authorIds.push(newAuthor.id);
        }
      }

      // Create document
      const { data: document, error: docError } = await supabase
        .from('documents')
        .insert({
          title: formData.title,
          subtitle: formData.subtitle || null,
          abstract: formData.abstract,
          keywords: formData.keywords.split(',').map(k => k.trim()).filter(Boolean),
          type: formData.type,
          category_id: formData.categoryId,
          area_id: formData.areaId,
          institution: formData.institution,
          year: formData.year,
          pages: formData.pages,
          language: formData.language,
          license: formData.license,
          file_url: fileUrl,
          submitted_by: user.id,
          status: 'pending'
        })
        .select('id')
        .single();

      if (docError) throw docError;

      // Link authors to document
      if (document && authorIds.length > 0) {
        const { error: linkError } = await supabase
          .from('document_authors')
          .insert(
            authorIds.map(authorId => ({
              document_id: document.id,
              author_id: authorId
            }))
          );

        if (linkError) throw linkError;
      }

      onSuccess?.();
      onClose();
      resetForm();
    } catch (err: any) {
      console.error('Error uploading document:', err);
      setError(err.message || 'Erro ao enviar documento');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      abstract: '',
      keywords: '',
      type: 'thesis',
      categoryId: '',
      areaId: '',
      institution: '',
      year: new Date().getFullYear(),
      pages: 0,
      language: 'pt',
      license: 'cc-by',
    });
    setAuthors([{ name: '', email: '', institution: '', orcid: '' }]);
    setFile(null);
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Submeter Obra Acadêmica
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Informações Básicas</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Título da obra"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtítulo
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => handleInputChange('subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Subtítulo (opcional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Documento *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {documentTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Licença *
                </label>
                <select
                  value={formData.license}
                  onChange={(e) => handleInputChange('license', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {licenses.map(license => (
                    <option key={license.value} value={license.value}>
                      {license.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria *
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => handleInputChange('categoryId', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Área *
                </label>
                <select
                  value={formData.areaId}
                  onChange={(e) => handleInputChange('areaId', e.target.value)}
                  required
                  disabled={!formData.categoryId}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                >
                  <option value="">Selecione uma área</option>
                  {availableAreas.map(area => (
                    <option key={area.id} value={area.id}>
                      {area.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instituição *
                </label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => handleInputChange('institution', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Universidade de São Paulo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ano *
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                  required
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Páginas *
                </label>
                <input
                  type="number"
                  value={formData.pages}
                  onChange={(e) => handleInputChange('pages', parseInt(e.target.value))}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idioma *
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pt">Português</option>
                  <option value="en">Inglês</option>
                  <option value="es">Espanhol</option>
                  <option value="fr">Francês</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resumo *
              </label>
              <textarea
                value={formData.abstract}
                onChange={(e) => handleInputChange('abstract', e.target.value)}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Resumo da obra..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Palavras-chave *
              </label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Separe as palavras-chave por vírgula"
              />
            </div>
          </div>

          {/* Authors */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Autores</h3>
              <button
                type="button"
                onClick={addAuthor}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Adicionar Autor</span>
              </button>
            </div>

            {authors.map((author, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Autor {index + 1}</h4>
                  {authors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAuthor(index)}
                      className="text-red-600 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome *
                    </label>
                    <input
                      type="text"
                      value={author.name}
                      onChange={(e) => handleAuthorChange(index, 'name', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nome completo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={author.email}
                      onChange={(e) => handleAuthorChange(index, 'email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="email@exemplo.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instituição
                    </label>
                    <input
                      type="text"
                      value={author.institution}
                      onChange={(e) => handleAuthorChange(index, 'institution', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Instituição de afiliação"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ORCID
                    </label>
                    <input
                      type="text"
                      value={author.orcid}
                      onChange={(e) => handleAuthorChange(index, 'orcid', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0000-0000-0000-0000"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Arquivo</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Documento PDF *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        {file ? file.name : 'Clique para selecionar um arquivo PDF'}
                      </span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="sr-only"
                        required
                      />
                    </label>
                    <p className="mt-1 text-xs text-gray-500">
                      PDF até 50MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !file}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Submeter Obra</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}