// src/data/events.js
// Eventos fictícios e opções de filtro (datas, regiões, categorias). Trocar por API depois.
export const FILTERS = ['Tudo', 'Show', 'Dança', 'Exposição'];

// Opções da tela de busca
export const REGIONS = ['Todas', 'Centro', 'Zona Norte', 'Zona Sul', 'Zona Leste', 'Zona Oeste'];
export const CATEGORIES = ['Todas', 'Show', 'Dança', 'Exposição', 'Teatro', 'Cinema'];

// Datas fictícias: nos eventos de exemplo, "hoje" é sexta, 23/10/2026.
// Com eventos reais, calcule estas datas a partir de new Date().
export const WHEN = {
  'Hoje': { from: '2026-10-23', to: '2026-10-23', short: '23 out 2026', helper: 'Hoje: 23 de outubro de 2026' },
  'Amanhã': { from: '2026-10-24', to: '2026-10-24', short: '24 out 2026', helper: 'Amanhã: 24 de outubro de 2026' },
  'Fim de semana': { from: '2026-10-24', to: '2026-10-25', short: '24–25 out 2026', helper: 'Fim de semana: 24 e 25 de outubro de 2026' },
  'Próximos 7 dias': { from: '2026-10-23', to: '2026-10-29', short: '23–29 out 2026', helper: 'Próximos 7 dias: 23 a 29 de outubro de 2026' },
};

// Eventos fictícios. Depois é só trocar por uma chamada à API.
export const EVENTS = [
  {
    id: '1',
    featured: true,
    title: 'Roda do Encontro',
    day: '2026-10-24',
    date: 'SÁB, 24 OUT · 17H–19H',
    dateShort: 'SÁB, 24 OUT · 17H',
    subtitle: 'Show · Lia Nascimento e convidados',
    venue: 'Casa de Cultura da Sé · Centro',
    address: 'Praça da Sé, 100 · Centro',
    region: 'Centro',
    category: 'Show',
    price: 'Grátis',
    image: require('../../assets/roda-do-encontro.png'),
  },
  {
    id: '2',
    title: 'Corpos da cidade',
    day: '2026-10-25',
    date: 'DOM, 25 OUT · 15H',
    venue: 'Centro Cultural Vila Leste',
    address: 'Av. Vila Leste, 450 · Zona Leste',
    region: 'Zona Leste',
    category: 'Dança',
    price: 'Grátis',
    image: require('../../assets/corpos-da-cidade.png'),
  },
  {
    id: '3',
    title: 'Outros olhares',
    day: '2026-10-24',
    date: 'SÁB, 24 OUT · 10H',
    venue: 'Galeria Aurora',
    address: 'Rua da Aurora, 120 · Centro',
    region: 'Centro',
    category: 'Exposição',
    price: 'Grátis',
    image: require('../../assets/outros-olhares.png'),
  },
];
