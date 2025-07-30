/*
  # Dados iniciais para o Ononamais Acadêmico

  1. Categorias e áreas do conhecimento
  2. Autores de exemplo
  3. Documentos de demonstração
  4. Relacionamentos entre documentos e autores
*/

-- Inserir categorias
INSERT INTO categories (id, name, slug, description) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Ciências Exatas', 'ciencias-exatas', 'Matemática, Física, Química e áreas correlatas'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Ciências Humanas', 'ciencias-humanas', 'História, Literatura, Filosofia e áreas correlatas'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Ciências Biológicas', 'ciencias-biologicas', 'Biologia, Biotecnologia e áreas correlatas'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Engenharias', 'engenharias', 'Engenharia Civil, Elétrica, Mecânica e áreas correlatas'),
  ('550e8400-e29b-41d4-a716-446655440005', 'Ciências da Saúde', 'ciencias-saude', 'Medicina, Enfermagem, Farmácia e áreas correlatas'),
  ('550e8400-e29b-41d4-a716-446655440006', 'Ciências Sociais', 'ciencias-sociais', 'Sociologia, Antropologia, Ciência Política e áreas correlatas');

-- Inserir áreas
INSERT INTO areas (id, name, slug, category_id, description) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'Matemática', 'matematica', '550e8400-e29b-41d4-a716-446655440001', 'Matemática pura e aplicada'),
  ('660e8400-e29b-41d4-a716-446655440002', 'Física', 'fisica', '550e8400-e29b-41d4-a716-446655440001', 'Física teórica e experimental'),
  ('660e8400-e29b-41d4-a716-446655440003', 'Química', 'quimica', '550e8400-e29b-41d4-a716-446655440001', 'Química orgânica, inorgânica e analítica'),
  ('660e8400-e29b-41d4-a716-446655440004', 'História', 'historia', '550e8400-e29b-41d4-a716-446655440002', 'História do Brasil e mundial'),
  ('660e8400-e29b-41d4-a716-446655440005', 'Literatura', 'literatura', '550e8400-e29b-41d4-a716-446655440002', 'Literatura brasileira e estrangeira'),
  ('660e8400-e29b-41d4-a716-446655440006', 'Filosofia', 'filosofia', '550e8400-e29b-41d4-a716-446655440002', 'Filosofia antiga, moderna e contemporânea'),
  ('660e8400-e29b-41d4-a716-446655440007', 'Biologia', 'biologia', '550e8400-e29b-41d4-a716-446655440003', 'Biologia molecular, celular e evolutiva'),
  ('660e8400-e29b-41d4-a716-446655440008', 'Biotecnologia', 'biotecnologia', '550e8400-e29b-41d4-a716-446655440003', 'Biotecnologia aplicada'),
  ('660e8400-e29b-41d4-a716-446655440009', 'Engenharia Civil', 'engenharia-civil', '550e8400-e29b-41d4-a716-446655440004', 'Construção civil e infraestrutura'),
  ('660e8400-e29b-41d4-a716-446655440010', 'Engenharia Elétrica', 'engenharia-eletrica', '550e8400-e29b-41d4-a716-446655440004', 'Sistemas elétricos e eletrônicos'),
  ('660e8400-e29b-41d4-a716-446655440011', 'Medicina', 'medicina', '550e8400-e29b-41d4-a716-446655440005', 'Medicina clínica e cirúrgica'),
  ('660e8400-e29b-41d4-a716-446655440012', 'Enfermagem', 'enfermagem', '550e8400-e29b-41d4-a716-446655440005', 'Cuidados de enfermagem'),
  ('660e8400-e29b-41d4-a716-446655440013', 'Sociologia', 'sociologia', '550e8400-e29b-41d4-a716-446655440006', 'Sociologia urbana e rural'),
  ('660e8400-e29b-41d4-a716-446655440014', 'Ciência Política', 'ciencia-politica', '550e8400-e29b-41d4-a716-446655440006', 'Teoria política e relações internacionais');

-- Inserir autores
INSERT INTO authors (id, name, email, institution, orcid) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', 'Dr. Maria Silva Santos', 'maria.santos@usp.br', 'Universidade de São Paulo', '0000-0000-0000-0001'),
  ('770e8400-e29b-41d4-a716-446655440002', 'Prof. João Carlos Oliveira', 'joao.oliveira@unicamp.br', 'Universidade Estadual de Campinas', '0000-0000-0000-0002'),
  ('770e8400-e29b-41d4-a716-446655440003', 'Dra. Ana Paula Costa', 'ana.costa@ufrj.br', 'Universidade Federal do Rio de Janeiro', '0000-0000-0000-0003'),
  ('770e8400-e29b-41d4-a716-446655440004', 'Dr. Carlos Eduardo Lima', 'carlos.lima@ufmg.br', 'Universidade Federal de Minas Gerais', '0000-0000-0000-0004'),
  ('770e8400-e29b-41d4-a716-446655440005', 'Profa. Fernanda Rodrigues', 'fernanda.rodrigues@puc-rio.br', 'Pontifícia Universidade Católica do Rio de Janeiro', '0000-0000-0000-0005'),
  ('770e8400-e29b-41d4-a716-446655440006', 'Dr. Roberto Almeida', 'roberto.almeida@unesp.br', 'Universidade Estadual Paulista', '0000-0000-0000-0006'),
  ('770e8400-e29b-41d4-a716-446655440007', 'Dra. Juliana Ferreira', 'juliana.ferreira@ufsc.br', 'Universidade Federal de Santa Catarina', '0000-0000-0000-0007'),
  ('770e8400-e29b-41d4-a716-446655440008', 'Prof. Marcos Pereira', 'marcos.pereira@ufpe.br', 'Universidade Federal de Pernambuco', '0000-0000-0000-0008');

-- Inserir documentos de exemplo
INSERT INTO documents (id, title, subtitle, abstract, keywords, type, category_id, area_id, institution, year, pages, language, license, download_count, view_count, status) VALUES
  (
    '880e8400-e29b-41d4-a716-446655440001',
    'Inteligência Artificial na Educação: Uma Análise Sistemática',
    'Impactos e Perspectivas para o Ensino Superior',
    'Esta tese investiga o impacto da inteligência artificial na educação superior, analisando como as tecnologias emergentes estão transformando os métodos de ensino e aprendizagem. O estudo apresenta uma revisão sistemática da literatura e propõe um framework para implementação de IA em instituições educacionais.',
    ARRAY['inteligência artificial', 'educação', 'ensino superior', 'tecnologia educacional', 'aprendizagem'],
    'thesis',
    '550e8400-e29b-41d4-a716-446655440001',
    '660e8400-e29b-41d4-a716-446655440001',
    'Universidade de São Paulo',
    2023,
    245,
    'pt',
    'cc-by',
    1250,
    3420,
    'approved'
  ),
  (
    '880e8400-e29b-41d4-a716-446655440002',
    'Sustentabilidade Urbana e Planejamento Ambiental',
    NULL,
    'Dissertação que explora estratégias de sustentabilidade urbana através de análise de casos brasileiros e internacionais. O trabalho propõe diretrizes para o planejamento ambiental em cidades de médio porte, considerando aspectos sociais, econômicos e ambientais.',
    ARRAY['sustentabilidade', 'planejamento urbano', 'meio ambiente', 'cidades sustentáveis'],
    'dissertation',
    '550e8400-e29b-41d4-a716-446655440004',
    '660e8400-e29b-41d4-a716-446655440009',
    'Universidade Estadual de Campinas',
    2023,
    180,
    'pt',
    'cc-by-sa',
    890,
    2150,
    'approved'
  ),
  (
    '880e8400-e29b-41d4-a716-446655440003',
    'Análise Genômica de Plantas Medicinais da Amazônia',
    NULL,
    'Estudo abrangente sobre a diversidade genômica de plantas medicinais encontradas na região amazônica. A pesquisa utiliza técnicas de sequenciamento de nova geração para identificar genes relacionados à produção de compostos bioativos.',
    ARRAY['genômica', 'plantas medicinais', 'amazônia', 'biodiversidade', 'biotecnologia'],
    'thesis',
    '550e8400-e29b-41d4-a716-446655440003',
    '660e8400-e29b-41d4-a716-446655440007',
    'Universidade Federal do Rio de Janeiro',
    2022,
    320,
    'pt',
    'cc-by-nc',
    2100,
    4800,
    'approved'
  ),
  (
    '880e8400-e29b-41d4-a716-446655440004',
    'Impactos Socioeconômicos da Pandemia COVID-19 no Brasil',
    NULL,
    'Análise detalhada dos impactos socioeconômicos da pandemia de COVID-19 no Brasil, com foco nas desigualdades regionais e sociais. O estudo utiliza dados oficiais e pesquisas de campo para compreender as transformações ocorridas entre 2020 e 2022.',
    ARRAY['covid-19', 'impactos socioeconômicos', 'desigualdade social', 'brasil', 'pandemia'],
    'dissertation',
    '550e8400-e29b-41d4-a716-446655440006',
    '660e8400-e29b-41d4-a716-446655440013',
    'Universidade Federal de Minas Gerais',
    2023,
    195,
    'pt',
    'cc-by',
    1850,
    5200,
    'approved'
  ),
  (
    '880e8400-e29b-41d4-a716-446655440005',
    'Algoritmos de Machine Learning para Diagnóstico Médico',
    NULL,
    'Desenvolvimento e validação de algoritmos de aprendizado de máquina para auxiliar no diagnóstico médico de doenças cardiovasculares. O trabalho apresenta uma comparação entre diferentes técnicas e propõe melhorias na acurácia diagnóstica.',
    ARRAY['machine learning', 'diagnóstico médico', 'inteligência artificial', 'cardiologia', 'saúde digital'],
    'article',
    '550e8400-e29b-41d4-a716-446655440005',
    '660e8400-e29b-41d4-a716-446655440011',
    'Universidade de São Paulo',
    2023,
    45,
    'en',
    'cc-by',
    3200,
    7800,
    'approved'
  ),
  (
    '880e8400-e29b-41d4-a716-446655440006',
    'História da Literatura Brasileira Contemporânea',
    NULL,
    'Monografia que traça um panorama da literatura brasileira contemporânea, analisando as principais correntes, autores e obras do período de 1980 a 2020. O trabalho explora as transformações temáticas e estilísticas da produção literária nacional.',
    ARRAY['literatura brasileira', 'literatura contemporânea', 'crítica literária', 'cultura brasileira'],
    'monograph',
    '550e8400-e29b-41d4-a716-446655440002',
    '660e8400-e29b-41d4-a716-446655440005',
    'Universidade Estadual de Campinas',
    2022,
    120,
    'pt',
    'cc-by-sa',
    680,
    1450,
    'approved'
  ),
  (
    '880e8400-e29b-41d4-a716-446655440007',
    'Inovações em Biotecnologia Aplicada à Agricultura',
    'Técnicas Modernas para Aumento da Produtividade',
    'Tese que apresenta inovações em biotecnologia aplicada à agricultura, focando em técnicas modernas para aumento da produtividade e sustentabilidade. O estudo inclui experimentos com plantas geneticamente modificadas e análise de impactos ambientais.',
    ARRAY['biotecnologia', 'agricultura', 'sustentabilidade', 'produtividade', 'plantas transgênicas'],
    'thesis',
    '550e8400-e29b-41d4-a716-446655440003',
    '660e8400-e29b-41d4-a716-446655440008',
    'Pontifícia Universidade Católica do Rio de Janeiro',
    2023,
    280,
    'pt',
    'cc-by',
    1420,
    3100,
    'approved'
  ),
  (
    '880e8400-e29b-41d4-a716-446655440008',
    'Sistemas Elétricos Inteligentes: Smart Grids no Brasil',
    NULL,
    'Dissertação sobre a implementação de sistemas elétricos inteligentes (Smart Grids) no Brasil. O trabalho analisa os desafios técnicos, econômicos e regulatórios para a modernização da rede elétrica nacional.',
    ARRAY['smart grids', 'sistemas elétricos', 'energia', 'sustentabilidade energética', 'brasil'],
    'dissertation',
    '550e8400-e29b-41d4-a716-446655440004',
    '660e8400-e29b-41d4-a716-446655440010',
    'Universidade Estadual Paulista',
    2022,
    165,
    'pt',
    'cc-by-nc',
    950,
    2300,
    'approved'
  );

-- Inserir relacionamentos documento-autor
INSERT INTO document_authors (document_id, author_id) VALUES
  ('880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001'),
  ('880e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002'),
  ('880e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003'),
  ('880e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440004'),
  ('880e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440001'),
  ('880e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440003'),
  ('880e8400-e29b-41d4-a716-446655440006', '770e8400-e29b-41d4-a716-446655440002'),
  ('880e8400-e29b-41d4-a716-446655440007', '770e8400-e29b-41d4-a716-446655440005'),
  ('880e8400-e29b-41d4-a716-446655440008', '770e8400-e29b-41d4-a716-446655440006');