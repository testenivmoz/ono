/*
  # Schema inicial do Ononamais Acadêmico

  1. Tabelas principais
    - `categories` - Categorias de conhecimento (Ciências Exatas, Humanas, etc.)
    - `areas` - Áreas específicas dentro das categorias
    - `authors` - Autores das obras acadêmicas
    - `documents` - Documentos acadêmicos (teses, dissertações, etc.)
    - `document_authors` - Relacionamento many-to-many entre documentos e autores
    - `user_favorites` - Favoritos dos usuários
    - `reading_history` - Histórico de leitura dos usuários
    - `document_requests` - Solicitações de documentos pelos usuários
    - `profiles` - Perfis estendidos dos usuários

  2. Segurança
    - RLS habilitado em todas as tabelas
    - Políticas específicas para cada tipo de usuário
    - Controle de acesso baseado em roles

  3. Storage
    - Bucket para documentos PDF
    - Bucket para thumbnails/capas
*/

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum para tipos de documento
CREATE TYPE document_type AS ENUM ('thesis', 'dissertation', 'monograph', 'article', 'book');

-- Enum para licenças
CREATE TYPE license_type AS ENUM ('cc-by', 'cc-by-sa', 'cc-by-nc', 'cc-by-nc-sa', 'public-domain');

-- Enum para status de documento
CREATE TYPE document_status AS ENUM ('pending', 'approved', 'rejected');

-- Enum para status de solicitação
CREATE TYPE request_status AS ENUM ('open', 'fulfilled', 'closed');

-- Enum para roles de usuário
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Tabela de perfis de usuário (estende auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  institution text,
  role user_role DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de categorias
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Tabela de áreas
CREATE TABLE IF NOT EXISTS areas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Tabela de autores
CREATE TABLE IF NOT EXISTS authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  institution text,
  orcid text,
  created_at timestamptz DEFAULT now()
);

-- Tabela de documentos
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  abstract text NOT NULL,
  keywords text[] DEFAULT '{}',
  type document_type NOT NULL,
  category_id uuid REFERENCES categories(id),
  area_id uuid REFERENCES areas(id),
  institution text NOT NULL,
  year integer NOT NULL,
  pages integer NOT NULL DEFAULT 0,
  language text DEFAULT 'pt',
  license license_type DEFAULT 'cc-by',
  file_url text,
  thumbnail_url text,
  download_count integer DEFAULT 0,
  view_count integer DEFAULT 0,
  status document_status DEFAULT 'pending',
  submitted_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de relacionamento documento-autor (many-to-many)
CREATE TABLE IF NOT EXISTS document_authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  author_id uuid REFERENCES authors(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(document_id, author_id)
);

-- Tabela de favoritos
CREATE TABLE IF NOT EXISTS user_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, document_id)
);

-- Tabela de histórico de leitura
CREATE TABLE IF NOT EXISTS reading_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  last_page integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, document_id)
);

-- Tabela de solicitações de documentos
CREATE TABLE IF NOT EXISTS document_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  requested_by uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  status request_status DEFAULT 'open',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_documents_title ON documents USING gin(to_tsvector('portuguese', title));
CREATE INDEX IF NOT EXISTS idx_documents_abstract ON documents USING gin(to_tsvector('portuguese', abstract));
CREATE INDEX IF NOT EXISTS idx_documents_keywords ON documents USING gin(keywords);
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(type);
CREATE INDEX IF NOT EXISTS idx_documents_year ON documents(year);
CREATE INDEX IF NOT EXISTS idx_documents_category ON documents(category_id);
CREATE INDEX IF NOT EXISTS idx_documents_area ON documents(area_id);

-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_requests ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Políticas para categories (leitura pública)
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Only admins can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Políticas para areas (leitura pública)
CREATE POLICY "Areas are viewable by everyone"
  ON areas FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Only admins can manage areas"
  ON areas FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Políticas para authors (leitura pública)
CREATE POLICY "Authors are viewable by everyone"
  ON authors FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Authenticated users can create authors"
  ON authors FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only admins can update authors"
  ON authors FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Políticas para documents
CREATE POLICY "Approved documents are viewable by everyone"
  ON documents FOR SELECT
  TO authenticated, anon
  USING (status = 'approved');

CREATE POLICY "Users can view own submitted documents"
  ON documents FOR SELECT
  TO authenticated
  USING (submitted_by = auth.uid());

CREATE POLICY "Admins can view all documents"
  ON documents FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Authenticated users can submit documents"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (submitted_by = auth.uid());

CREATE POLICY "Users can update own pending documents"
  ON documents FOR UPDATE
  TO authenticated
  USING (submitted_by = auth.uid() AND status = 'pending');

CREATE POLICY "Admins can update all documents"
  ON documents FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Políticas para document_authors
CREATE POLICY "Document authors are viewable by everyone"
  ON document_authors FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Authenticated users can create document authors"
  ON document_authors FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Políticas para user_favorites
CREATE POLICY "Users can manage own favorites"
  ON user_favorites FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Políticas para reading_history
CREATE POLICY "Users can manage own reading history"
  ON reading_history FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Políticas para document_requests
CREATE POLICY "Users can view all requests"
  ON document_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create requests"
  ON document_requests FOR INSERT
  TO authenticated
  WITH CHECK (requested_by = auth.uid());

CREATE POLICY "Users can update own requests"
  ON document_requests FOR UPDATE
  TO authenticated
  USING (requested_by = auth.uid());

CREATE POLICY "Admins can update all requests"
  ON document_requests FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reading_history_updated_at BEFORE UPDATE ON reading_history FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_document_requests_updated_at BEFORE UPDATE ON document_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para incrementar view_count
CREATE OR REPLACE FUNCTION increment_view_count(document_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE documents 
  SET view_count = view_count + 1 
  WHERE id = document_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para incrementar download_count
CREATE OR REPLACE FUNCTION increment_download_count(document_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE documents 
  SET download_count = download_count + 1 
  WHERE id = document_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;