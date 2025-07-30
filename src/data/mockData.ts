import { Document, Author, Category, Area } from '../types';

export const mockAuthors: Author[] = [
  {
    id: '1',
    name: 'Dr. Maria Silva Santos',
    email: 'maria.santos@usp.br',
    institution: 'Universidade de São Paulo',
    orcid: '0000-0000-0000-0001'
  },
  {
    id: '2',
    name: 'Prof. João Carlos Oliveira',
    email: 'joao.oliveira@unicamp.br',
    institution: 'Universidade Estadual de Campinas'
  },
  {
    id: '3',
    name: 'Dra. Ana Paula Costa',
    email: 'ana.costa@ufrj.br',
    institution: 'Universidade Federal do Rio de Janeiro'
  },
  {
    id: '4',
    name: 'Dr. Carlos Eduardo Lima',
    email: 'carlos.lima@ufmg.br',
    institution: 'Universidade Federal de Minas Gerais'
  }
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Ciências Exatas', slug: 'ciencias-exatas' },
  { id: '2', name: 'Ciências Humanas', slug: 'ciencias-humanas' },
  { id: '3', name: 'Ciências Biológicas', slug: 'ciencias-biologicas' },
  { id: '4', name: 'Engenharias', slug: 'engenharias' },
  { id: '5', name: 'Ciências da Saúde', slug: 'ciencias-saude' },
  { id: '6', name: 'Ciências Sociais', slug: 'ciencias-sociais' }
];

export const mockAreas: Area[] = [
  { id: '1', name: 'Matemática', slug: 'matematica', categoryId: '1' },
  { id: '2', name: 'Física', slug: 'fisica', categoryId: '1' },
  { id: '3', name: 'História', slug: 'historia', categoryId: '2' },
  { id: '4', name: 'Literatura', slug: 'literatura', categoryId: '2' },
  { id: '5', name: 'Biologia', slug: 'biologia', categoryId: '3' },
  { id: '6', name: 'Engenharia Civil', slug: 'engenharia-civil', categoryId: '4' },
  { id: '7', name: 'Medicina', slug: 'medicina', categoryId: '5' },
  { id: '8', name: 'Sociologia', slug: 'sociologia', categoryId: '6' }
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Inteligência Artificial na Educação: Uma Análise Sistemática',
    subtitle: 'Impactos e Perspectivas para o Ensino Superior',
    abstract: 'Esta tese investiga o impacto da inteligência artificial na educação superior, analisando como as tecnologias emergentes estão transformando os métodos de ensino e aprendizagem. O estudo apresenta uma revisão sistemática da literatura e propõe um framework para implementação de IA em instituições educacionais.',
    keywords: ['inteligência artificial', 'educação', 'ensino superior', 'tecnologia educacional', 'aprendizagem'],
    authors: [mockAuthors[0]],
    type: 'thesis',
    categoryId: '1',
    areaId: '1',
    institution: 'Universidade de São Paulo',
    year: 2023,
    pages: 245,
    language: 'pt',
    license: 'cc-by',
    fileUrl: '/documents/ia-educacao.pdf',
    thumbnailUrl: '/thumbnails/ia-educacao.jpg',
    downloadCount: 1250,
    viewCount: 3420,
    status: 'approved',
    submittedBy: 'user1',
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2023-06-15')
  },
  {
    id: '2',
    title: 'Sustentabilidade Urbana e Planejamento Ambiental',
    abstract: 'Dissertação que explora estratégias de sustentabilidade urbana através de análise de casos brasileiros e internacionais. O trabalho propõe diretrizes para o planejamento ambiental em cidades de médio porte, considerando aspectos sociais, econômicos e ambientais.',
    keywords: ['sustentabilidade', 'planejamento urbano', 'meio ambiente', 'cidades sustentáveis'],
    authors: [mockAuthors[1]],
    type: 'dissertation',
    categoryId: '4',
    areaId: '6',
    institution: 'Universidade Estadual de Campinas',
    year: 2023,
    pages: 180,
    language: 'pt',
    license: 'cc-by-sa',
    fileUrl: '/documents/sustentabilidade-urbana.pdf',
    downloadCount: 890,
    viewCount: 2150,
    status: 'approved',
    submittedBy: 'user2',
    createdAt: new Date('2023-05-20'),
    updatedAt: new Date('2023-05-20')
  },
  {
    id: '3',
    title: 'Análise Genômica de Plantas Medicinais da Amazônia',
    abstract: 'Estudo abrangente sobre a diversidade genômica de plantas medicinais encontradas na região amazônica. A pesquisa utiliza técnicas de sequenciamento de nova geração para identificar genes relacionados à produção de compostos bioativos.',
    keywords: ['genômica', 'plantas medicinais', 'amazônia', 'biodiversidade', 'biotecnologia'],
    authors: [mockAuthors[2]],
    type: 'thesis',
    categoryId: '3',
    areaId: '5',
    institution: 'Universidade Federal do Rio de Janeiro',
    year: 2022,
    pages: 320,
    language: 'pt',
    license: 'cc-by-nc',
    fileUrl: '/documents/genomica-plantas.pdf',
    downloadCount: 2100,
    viewCount: 4800,
    status: 'approved',
    submittedBy: 'user3',
    createdAt: new Date('2022-12-10'),
    updatedAt: new Date('2022-12-10')
  },
  {
    id: '4',
    title: 'Impactos Socioeconômicos da Pandemia COVID-19 no Brasil',
    abstract: 'Análise detalhada dos impactos socioeconômicos da pandemia de COVID-19 no Brasil, com foco nas desigualdades regionais e sociais. O estudo utiliza dados oficiais e pesquisas de campo para compreender as transformações ocorridas entre 2020 e 2022.',
    keywords: ['covid-19', 'impactos socioeconômicos', 'desigualdade social', 'brasil', 'pandemia'],
    authors: [mockAuthors[3]],
    type: 'dissertation',
    categoryId: '6',
    areaId: '8',
    institution: 'Universidade Federal de Minas Gerais',
    year: 2023,
    pages: 195,
    language: 'pt',
    license: 'cc-by',
    fileUrl: '/documents/covid-impactos.pdf',
    downloadCount: 1850,
    viewCount: 5200,
    status: 'approved',
    submittedBy: 'user4',
    createdAt: new Date('2023-03-25'),
    updatedAt: new Date('2023-03-25')
  },
  {
    id: '5',
    title: 'Algoritmos de Machine Learning para Diagnóstico Médico',
    abstract: 'Desenvolvimento e validação de algoritmos de aprendizado de máquina para auxiliar no diagnóstico médico de doenças cardiovasculares. O trabalho apresenta uma comparação entre diferentes técnicas e propõe melhorias na acurácia diagnóstica.',
    keywords: ['machine learning', 'diagnóstico médico', 'inteligência artificial', 'cardiologia', 'saúde digital'],
    authors: [mockAuthors[0], mockAuthors[2]],
    type: 'article',
    categoryId: '5',
    areaId: '7',
    institution: 'Universidade de São Paulo',
    year: 2023,
    pages: 45,
    language: 'en',
    license: 'cc-by',
    fileUrl: '/documents/ml-diagnostico.pdf',
    downloadCount: 3200,
    viewCount: 7800,
    status: 'approved',
    submittedBy: 'user1',
    createdAt: new Date('2023-08-12'),
    updatedAt: new Date('2023-08-12')
  },
  {
    id: '6',
    title: 'História da Literatura Brasileira Contemporânea',
    abstract: 'Monografia que traça um panorama da literatura brasileira contemporânea, analisando as principais correntes, autores e obras do período de 1980 a 2020. O trabalho explora as transformações temáticas e estilísticas da produção literária nacional.',
    keywords: ['literatura brasileira', 'literatura contemporânea', 'crítica literária', 'cultura brasileira'],
    authors: [mockAuthors[1]],
    type: 'monograph',
    categoryId: '2',
    areaId: '4',
    institution: 'Universidade Estadual de Campinas',
    year: 2022,
    pages: 120,
    language: 'pt',
    license: 'cc-by-sa',
    fileUrl: '/documents/literatura-contemporanea.pdf',
    downloadCount: 680,
    viewCount: 1450,
    status: 'approved',
    submittedBy: 'user2',
    createdAt: new Date('2022-11-30'),
    updatedAt: new Date('2022-11-30')
  }
];