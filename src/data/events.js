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

// Detalhes exibidos na tela do evento (descrição, endereço, acesso, links).
const DETAILS = {
  '1': {
    artist: 'Lia Nascimento e convidados',
    description: 'Uma tarde de samba, afeto e vozes da cidade. Lia Nascimento recebe músicos do Centro para uma roda ao ar livre com clássicos e composições autorais.',
    dateLong: 'Sábado, 24 de outubro de 2026',
    time: 'Início às 17h · Encerramento às 19h',
    placeName: 'Casa de Cultura da Sé',
    addressLines: ['Praça da Sé, 108 · Pátio externo', 'Sé, Centro · São Paulo – SP', 'CEP 01001-000'],
    transport: ['Metrô Sé · linhas 1–Azul e 3–Vermelha', 'A 350 m, cerca de 5 minutos a pé.'],
    age: ['Livre para todas as idades', 'Crianças e adultos são bem-vindos.'],
    accessibility: 'Acesso sem degraus, banheiro acessível e área reservada para pessoas com mobilidade reduzida.',
    signup: 'Inscrição antecipada pelo site; sujeita à lotação do espaço.',
    links: { signup: 'https://exemplo.com/roda-do-encontro', info: 'https://exemplo.com/casa-de-cultura' },
  },
  '2': {
    description: 'Intervenção de dança contemporânea que ocupa o centro cultural com corpos, ruas e memórias da Zona Leste.',
    dateLong: 'Domingo, 25 de outubro de 2026',
    time: 'Início às 15h',
    placeName: 'Centro Cultural Vila Leste',
    addressLines: ['Av. Vila Leste, 450', 'Vila Leste · São Paulo – SP'],
    age: ['Livre para todas as idades', 'Crianças e adultos são bem-vindos.'],
    links: { info: 'https://exemplo.com/vila-leste' },
  },
  '3': {
    description: 'Exposição coletiva que reúne pinturas e instalações de artistas da cidade sobre o olhar de quem passa.',
    dateLong: 'Sábado, 24 de outubro de 2026',
    time: 'Início às 10h',
    placeName: 'Galeria Aurora',
    addressLines: ['Rua da Aurora, 120', 'Centro · São Paulo – SP'],
    age: ['Livre para todas as idades', 'Crianças e adultos são bem-vindos.'],
    links: { info: 'https://exemplo.com/galeria-aurora' },
  },
};
EVENTS.forEach((e) => Object.assign(e, DETAILS[e.id]));

// Valores que pré-preenchem o formulário "Editar evento" dos eventos de exemplo.
const FORMS = {
  '1': {
    startDate: '24/10/2026', startTime: '17:00', endDate: '24/10/2026', endTime: '19:00',
    cep: '01001-000', street: 'Praça da Sé', number: '108', complement: 'Pátio externo', district: 'Sé',
    transport: 'Metrô Sé · linhas 1–Azul e 3–Vermelha. A 350 m, cerca de 5 minutos a pé.',
    age: 'Livre', accessibility: 'Acesso sem degraus, banheiro acessível e área reservada para pessoas com mobilidade reduzida.',
    entry: 'Inscrição antecipada; sujeita à lotação.',
    linkSignup: 'https://exemplo.com/roda-do-encontro', linkInfo: 'https://exemplo.com/casa-de-cultura',
  },
  '2': { startDate: '25/10/2026', startTime: '15:00', cep: '03700-000', street: 'Av. Vila Leste', number: '450', district: 'Vila Leste', age: 'Livre' },
  '3': { startDate: '24/10/2026', startTime: '10:00', cep: '01000-000', street: 'Rua da Aurora', number: '120', district: 'Centro', age: 'Livre' },
};
EVENTS.forEach((e) => (e.form = FORMS[e.id]));
