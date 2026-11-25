export const FILTERS = ['Tudo', 'Show', 'Dança', 'Exposição', 'Teatro', 'Cinema'];

export const REGIONS = ['Todas', 'Centro', 'Zona Norte', 'Zona Sul', 'Zona Leste', 'Zona Oeste'];

export const CATEGORIES = ['Todas', 'Show', 'Dança', 'Exposição', 'Teatro', 'Cinema'];

// Opções disponíveis no filtro "Quando?".
// Data de referência: 25/11/2026.

export const WHEN = {
  'Hoje': {
    from: '2026-11-25',
    to: '2026-11-25',
    short: '25 nov 2026',
    helper: 'Hoje: 25 de novembro de 2026',
  },

  'Amanhã': {
    from: '2026-11-26',
    to: '2026-11-26',
    short: '26 nov 2026',
    helper: 'Amanhã: 26 de novembro de 2026',
  },

  'Fim de semana': {
    from: '2026-11-28',
    to: '2026-11-29',
    short: '28–29 nov 2026',
    helper: 'Fim de semana: 28 e 29 de novembro de 2026',
  },

  'Próximos 7 dias': {
    from: '2026-11-25',
    to: '2026-12-02',
    short: '25 nov – 02 dez 2026',
    helper: 'Eventos de 25 de novembro a 2 de dezembro de 2026',
  },

  'Próximos 30 dias': {
    from: '2026-11-25',
    to: '2026-12-25',
    short: '25 nov – 25 dez 2026',
    helper: 'Eventos de 25 de novembro a 25 de dezembro de 2026',
  },
};

export const EVENTS = [
  {
    id: '1',
    views: '156',
    featured: true,
    title: 'Roda do Encontro',
    day: '2026-10-03',
    date: 'SÁB, 03 OUT · 17H–19H',
    dateShort: 'SÁB, 03 OUT · 17H',
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
    views: '143',
    featured: true,
    title: 'Corpos da cidade',
    day: '2026-10-10',
    date: 'SÁB, 10 OUT · 15H',
    dateShort: 'SÁB, 10 OUT · 15H',
    subtitle: 'Dança · Espetáculo contemporâneo',
    venue: 'Centro Cultural Vila Leste',
    address: 'Av. Vila Leste, 450 · Zona Leste',
    region: 'Zona Leste',
    category: 'Dança',
    price: 'Grátis',
    image: require('../../assets/corpos-da-cidade.png'),
  },

  {
    id: '3',
    views: '119',
    featured: true,
    title: 'Outros olhares',
    day: '2026-10-17',
    date: 'SÁB, 17 OUT · 10H',
    dateShort: 'SÁB, 17 OUT · 10H',
    subtitle: 'Exposição · Arte e fotografia',
    venue: 'Galeria Aurora',
    address: 'Rua da Aurora, 120 · Centro',
    region: 'Centro',
    category: 'Exposição',
    price: 'Grátis',
    image: require('../../assets/outros-olhares.jpg'),
  },

  {
    id: '4',
    views: '87',
    featured: false,
    title: 'Sons da Quebrada',
    day: '2026-11-25',
    date: 'QUA, 25 NOV · 16H–19H',
    dateShort: 'QUA, 25 NOV · 16H',
    subtitle: 'Show · Música independente',
    venue: 'Casa Cultural Raízes',
    address: 'Rua das Palmeiras, 85 · Zona Sul',
    region: 'Zona Sul',
    category: 'Show',
    price: 'Grátis',
    image: require('../../assets/sons-da-quebrada.jpg'),
  },

  {
    id: '5',
    views: '145',
    featured: false,
    title: 'Jazz na Praça',
    day: '2026-11-28',
    date: 'SÁB, 28 NOV · 11H–13H',
    dateShort: 'SÁB, 28 NOV · 11H',
    subtitle: 'Show · Quarteto Horizonte',
    venue: 'Praça das Artes',
    address: 'Rua do Bosque, 210 · Zona Oeste',
    region: 'Zona Oeste',
    category: 'Show',
    price: 'Grátis',
    image: require('../../assets/jazz-na-praca.jpg'),
  },

  {
    id: '6',
    views: '112',
    featured: false,
    title: 'Movimento em Cena',
    day: '2026-11-26',
    date: 'QUI, 26 NOV · 18H',
    dateShort: 'QUI, 26 NOV · 18H',
    subtitle: 'Dança · Espetáculo contemporâneo',
    venue: 'Espaço Cultural Horizonte',
    address: 'Av. Sapopemba, 320 · Zona Leste',
    region: 'Zona Leste',
    category: 'Dança',
    price: 'Grátis',
    image: require('../../assets/movimento-em-cena.jpg'),
  },

  {
    id: '7',
    views: '96',
    featured: false,
    title: 'Dança nas Ruas',
    day: '2026-11-29',
    date: 'DOM, 29 NOV · 14H–17H',
    dateShort: 'DOM, 29 NOV · 14H',
    subtitle: 'Dança · Cultura urbana e hip-hop',
    venue: 'Centro Cultural da Vila Maria',
    address: 'Praça Santo Eduardo, 45 · Zona Norte',
    region: 'Zona Norte',
    category: 'Dança',
    price: 'Grátis',
    image: require('../../assets/danca-nas-ruas.jpg'),
  },

  {
    id: '8',
    views: '130',
    featured: false,
    title: 'Memórias em Cores',
    day: '2026-11-27',
    date: 'SEX, 27 NOV · 10H–17H',
    dateShort: 'SEX, 27 NOV · 10H',
    subtitle: 'Exposição · Arte e identidade',
    venue: 'Galeria do Ipiranga',
    address: 'Rua dos Patriotas, 320 · Zona Sul',
    region: 'Zona Sul',
    category: 'Exposição',
    price: 'Grátis',
    image: require('../../assets/memorias-em-cores.jpg'),
  },

  {
    id: '9',
    views: '74',
    featured: false,
    title: 'Arte e Tecnologia',
    day: '2026-11-30',
    date: 'SEG, 30 NOV · 11H–18H',
    dateShort: 'SEG, 30 NOV · 11H',
    subtitle: 'Exposição · Arte digital e interativa',
    venue: 'Estação Criativa',
    address: 'Rua Tagipuru, 400 · Zona Oeste',
    region: 'Zona Oeste',
    category: 'Exposição',
    price: 'Grátis',
    image: require('../../assets/logo-c.jpg'),
  },

  {
    id: '10',
    views: '105',
    featured: false,
    title: 'Entre Quatro Paredes',
    day: '2026-11-28',
    date: 'SÁB, 28 NOV · 19H',
    dateShort: 'SÁB, 28 NOV · 19H',
    subtitle: 'Teatro · Drama contemporâneo',
    venue: 'Teatro Popular da Mooca',
    address: 'Rua da Mooca, 1.200 · Zona Leste',
    region: 'Zona Leste',
    category: 'Teatro',
    price: 'Grátis',
    image: require('../../assets/logo-c.jpg'),
  },

  {
    id: '11',
    views: '91',
    featured: false,
    title: 'O Último Trem',
    day: '2026-11-29',
    date: 'DOM, 29 NOV · 16H',
    dateShort: 'DOM, 29 NOV · 16H',
    subtitle: 'Teatro · Comédia teatral',
    venue: 'Teatro da Vila',
    address: 'Av. Nova Cantareira, 900 · Zona Norte',
    region: 'Zona Norte',
    category: 'Teatro',
    price: 'Grátis',
    image: require('../../assets/logo-c.jpg'),
  },

  {
    id: '12',
    views: '68',
    featured: false,
    title: 'Histórias de Quintal',
    day: '2026-11-30',
    date: 'SEG, 30 NOV · 15H',
    dateShort: 'SEG, 30 NOV · 15H',
    subtitle: 'Teatro · Infantil e familiar',
    venue: 'Casa de Cultura do Campo Limpo',
    address: 'Rua Nossa Senhora do Bom Conselho, 59 · Zona Sul',
    region: 'Zona Sul',
    category: 'Teatro',
    price: 'Grátis',
    image: require('../../assets/logo-c.jpg'),
  },

  {
    id: '13',
    views: '121',
    featured: false,
    title: 'Cinema na Praça',
    day: '2026-12-01',
    date: 'TER, 01 DEZ · 19H',
    dateShort: 'TER, 01 DEZ · 19H',
    subtitle: 'Cinema · Sessão ao ar livre',
    venue: 'Praça do Patriarca',
    address: 'Praça do Patriarca, 20 · Centro',
    region: 'Centro',
    category: 'Cinema',
    price: 'Grátis',
    image: require('../../assets/cinema-na-praca.jpg'),
  },

  {
    id: '14',
    views: '83',
    featured: false,
    title: 'Mostra Curta SP',
    day: '2026-12-02',
    date: 'QUA, 02 DEZ · 18H',
    dateShort: 'QUA, 02 DEZ · 18H',
    subtitle: 'Cinema · Curtas-metragens brasileiros',
    venue: 'Cine Cultura Oeste',
    address: 'Av. Corifeu de Azevedo Marques, 1.200 · Zona Oeste',
    region: 'Zona Oeste',
    category: 'Cinema',
    price: 'Grátis',
    image: require('../../assets/logo-c.jpg'),
  },

  {
    id: '15',
    views: '59',
    featured: false,
    title: 'Sessão Nostalgia',
    day: '2026-12-03',
    date: 'QUI, 03 DEZ · 20H',
    dateShort: 'QUI, 03 DEZ · 20H',
    subtitle: 'Cinema · Clássicos do cinema nacional',
    venue: 'Cine Vila Mariana',
    address: 'Rua Domingos de Morais, 1.500 · Zona Sul',
    region: 'Zona Sul',
    category: 'Cinema',
    price: 'Grátis',
    image: require('../../assets/logo-c.jpg'),
  },
];

const DETAILS = {
  '1': {
    artist: 'Lia Nascimento e convidados',
    description: 'Uma tarde de samba, afeto e vozes da cidade. Lia Nascimento recebe músicos do Centro para uma roda ao ar livre com clássicos e composições autorais.',
    dateLong: 'Sábado, 3 de outubro de 2026',
    time: 'Início às 17h · Encerramento às 19h',
    placeName: 'Casa de Cultura da Sé',
    addressLines: ['Praça da Sé, 108 · Pátio externo', 'Sé, Centro · São Paulo – SP', 'CEP 01001-000'],
    transport: ['Metrô Sé · linhas 1–Azul e 3–Vermelha', 'A 350 m, cerca de 5 minutos a pé.'],
    age: ['Livre para todas as idades', 'Crianças e adultos são bem-vindos.'],
    accessibility: 'Acesso sem degraus, banheiro acessível e área reservada para pessoas com mobilidade reduzida.',
    signup: 'Inscrição antecipada pelo site; sujeita à lotação do espaço.',
    links: {
      signup: 'https://exemplo.com/roda-do-encontro',
      info: 'https://exemplo.com/casa-de-cultura',
    },
  },

  '2': {
    description: 'Intervenção de dança contemporânea que ocupa o centro cultural com corpos, ruas e memórias da Zona Leste.',
    dateLong: 'Sábado, 10 de outubro de 2026',
    time: 'Início às 15h',
    placeName: 'Centro Cultural Vila Leste',
    addressLines: ['Av. Vila Leste, 450', 'Vila Leste · São Paulo – SP'],
    age: ['Livre para todas as idades', 'Crianças e adultos são bem-vindos.'],
    links: {
      info: 'https://exemplo.com/vila-leste',
    },
  },

  '3': {
    description: 'Exposição coletiva que reúne pinturas e instalações de artistas da cidade sobre o olhar de quem passa.',
    dateLong: 'Sábado, 17 de outubro de 2026',
    time: 'Início às 10h',
    placeName: 'Galeria Aurora',
    addressLines: ['Rua da Aurora, 120', 'Centro · São Paulo – SP'],
    age: ['Livre para todas as idades', 'Crianças e adultos são bem-vindos.'],
    links: {
      info: 'https://exemplo.com/galeria-aurora',
    },
  },

  '4': {
    artist: 'Artistas independentes da Zona Sul',
    description: 'Uma celebração da música independente, reunindo artistas locais em apresentações de diferentes estilos e sonoridades.',
    dateLong: 'Quarta-feira, 25 de novembro de 2026',
    time: 'Início às 16h · Encerramento às 19h',
    placeName: 'Casa Cultural Raízes',
    addressLines: ['Rua das Palmeiras, 85', 'Zona Sul · São Paulo – SP'],
    age: ['Livre para todas as idades'],
    accessibility: 'Acesso térreo.',
  },

  '5': {
    artist: 'Quarteto Horizonte',
    description: 'Uma apresentação de jazz ao ar livre, com clássicos do gênero e improvisações musicais.',
    dateLong: 'Sábado, 28 de novembro de 2026',
    time: 'Início às 11h · Encerramento às 13h',
    placeName: 'Praça das Artes',
    addressLines: ['Rua do Bosque, 210', 'Zona Oeste · São Paulo – SP'],
    age: ['Livre para todas as idades'],
  },

  '6': {
    description: 'Um espetáculo de dança contemporânea que explora movimentos, emoções e diferentes formas de expressão corporal.',
    dateLong: 'Quinta-feira, 26 de novembro de 2026',
    time: 'Início às 18h',
    placeName: 'Espaço Cultural Horizonte',
    addressLines: ['Av. Sapopemba, 320', 'Zona Leste · São Paulo – SP'],
    age: ['Livre para todas as idades'],
  },

  '7': {
    description: 'Uma tarde dedicada à dança urbana, com apresentações de hip-hop, breaking e outras manifestações da cultura de rua.',
    dateLong: 'Domingo, 29 de novembro de 2026',
    time: 'Início às 14h · Encerramento às 17h',
    placeName: 'Centro Cultural da Vila Maria',
    addressLines: ['Praça Santo Eduardo, 45', 'Zona Norte · São Paulo – SP'],
    age: ['Livre para todas as idades'],
  },

  '8': {
    description: 'Uma exposição que apresenta obras de artistas locais inspiradas nas memórias, histórias e identidades da cidade.',
    dateLong: 'Sexta-feira, 27 de novembro de 2026',
    time: 'Visitação das 10h às 17h',
    placeName: 'Galeria do Ipiranga',
    addressLines: ['Rua dos Patriotas, 320', 'Ipiranga · São Paulo – SP'],
    age: ['Livre para todas as idades'],
  },

  '9': {
    description: 'Uma experiência interativa que aproxima arte e tecnologia por meio de instalações digitais, projeções e experiências audiovisuais.',
    dateLong: 'Segunda-feira, 30 de novembro de 2026',
    time: 'Visitação das 11h às 18h',
    placeName: 'Estação Criativa',
    addressLines: ['Rua Tagipuru, 400', 'Barra Funda · São Paulo – SP'],
    age: ['Livre para todas as idades'],
  },

  '10': {
    description: 'Uma peça dramática sobre convivência, conflitos e relações humanas, apresentada por um grupo de artistas independentes.',
    dateLong: 'Sábado, 28 de novembro de 2026',
    time: 'Início às 19h',
    placeName: 'Teatro Popular da Mooca',
    addressLines: ['Rua da Mooca, 1.200', 'Mooca · São Paulo – SP'],
    age: ['Classificação indicativa a confirmar'],
  },

  '11': {
    description: 'Uma comédia sobre encontros inesperados durante uma viagem de trem, com situações divertidas e personagens curiosos.',
    dateLong: 'Domingo, 29 de novembro de 2026',
    time: 'Início às 16h',
    placeName: 'Teatro da Vila',
    addressLines: ['Av. Nova Cantareira, 900', 'Zona Norte · São Paulo – SP'],
    age: ['Classificação indicativa a confirmar'],
  },

  '12': {
    description: 'Uma apresentação teatral infantil que transforma histórias, brincadeiras e imaginação em uma aventura para toda a família.',
    dateLong: 'Segunda-feira, 30 de novembro de 2026',
    time: 'Início às 15h',
    placeName: 'Casa de Cultura do Campo Limpo',
    addressLines: ['Rua Nossa Senhora do Bom Conselho, 59', 'Campo Limpo · São Paulo – SP'],
    age: ['Livre para todas as idades'],
  },

  '13': {
    description: 'Uma sessão de cinema ao ar livre, com uma seleção de filmes para reunir moradores e visitantes em uma noite cultural.',
    dateLong: 'Terça-feira, 1 de dezembro de 2026',
    time: 'Início às 19h',
    placeName: 'Praça do Patriarca',
    addressLines: ['Praça do Patriarca, 20', 'Centro · São Paulo – SP'],
    age: ['Classificação indicativa a confirmar'],
  },

  '14': {
    description: 'Uma mostra dedicada a curtas-metragens brasileiros, valorizando novos cineastas e diferentes perspectivas sobre o país.',
    dateLong: 'Quarta-feira, 2 de dezembro de 2026',
    time: 'Início às 18h',
    placeName: 'Cine Cultura Oeste',
    addressLines: ['Av. Corifeu de Azevedo Marques, 1.200', 'Zona Oeste · São Paulo – SP'],
    age: ['Classificação indicativa a confirmar'],
  },

  '15': {
    description: 'Uma sessão especial com clássicos do cinema nacional, resgatando histórias e produções importantes da cinematografia brasileira.',
    dateLong: 'Quinta-feira, 3 de dezembro de 2026',
    time: 'Início às 20h',
    placeName: 'Cine Vila Mariana',
    addressLines: ['Rua Domingos de Morais, 1.500', 'Vila Mariana · São Paulo – SP'],
    age: ['Classificação indicativa a confirmar'],
  },
};

EVENTS.forEach((e) => Object.assign(e, DETAILS[e.id]));

const FORMS = {
  '1': {
    startDate: '03/10/2026',
    startTime: '17:00',
    endDate: '03/10/2026',
    endTime: '19:00',
    cep: '01001-000',
    street: 'Praça da Sé',
    number: '108',
    complement: 'Pátio externo',
    district: 'Sé',
    transport: 'Metrô Sé · linhas 1–Azul e 3–Vermelha. A 350 m, cerca de 5 minutos a pé.',
    age: 'Livre',
    accessibility: 'Acesso sem degraus, banheiro acessível e área reservada para pessoas com mobilidade reduzida.',
    entry: 'Inscrição antecipada; sujeita à lotação.',
    linkSignup: 'https://exemplo.com/roda-do-encontro',
    linkInfo: 'https://exemplo.com/casa-de-cultura',
  },

  '2': {
    startDate: '10/10/2026',
    startTime: '15:00',
    cep: '03700-000',
    street: 'Av. Vila Leste',
    number: '450',
    district: 'Vila Leste',
    age: 'Livre',
  },

  '3': {
    startDate: '17/10/2026',
    startTime: '10:00',
    cep: '01000-000',
    street: 'Rua da Aurora',
    number: '120',
    district: 'Centro',
    age: 'Livre',
  },

  '4': {
    startDate: '25/11/2026',
    startTime: '16:00',
    cep: '',
    street: 'Rua das Palmeiras',
    number: '85',
    district: 'Zona Sul',
    age: 'Livre',
  },

  '5': {
    startDate: '28/11/2026',
    startTime: '11:00',
    cep: '',
    street: 'Rua do Bosque',
    number: '210',
    district: 'Zona Oeste',
    age: 'Livre',
  },

  '6': {
    startDate: '26/11/2026',
    startTime: '18:00',
    cep: '',
    street: 'Av. Sapopemba',
    number: '320',
    district: 'Zona Leste',
    age: 'Livre',
  },

  '7': {
    startDate: '29/11/2026',
    startTime: '14:00',
    cep: '',
    street: 'Praça Santo Eduardo',
    number: '45',
    district: 'Zona Norte',
    age: 'Livre',
  },

  '8': {
    startDate: '27/11/2026',
    startTime: '10:00',
    cep: '',
    street: 'Rua dos Patriotas',
    number: '320',
    district: 'Ipiranga',
    age: 'Livre',
  },

  '9': {
    startDate: '30/11/2026',
    startTime: '11:00',
    cep: '',
    street: 'Rua Tagipuru',
    number: '400',
    district: 'Barra Funda',
    age: 'Livre',
  },

  '10': {
    startDate: '28/11/2026',
    startTime: '19:00',
    cep: '',
    street: 'Rua da Mooca',
    number: '1200',
    district: 'Mooca',
    age: '',
  },

  '11': {
    startDate: '29/11/2026',
    startTime: '16:00',
    cep: '',
    street: 'Av. Nova Cantareira',
    number: '900',
    district: 'Zona Norte',
    age: '',
  },

  '12': {
    startDate: '30/11/2026',
    startTime: '15:00',
    cep: '',
    street: 'Rua Nossa Senhora do Bom Conselho',
    number: '59',
    district: 'Campo Limpo',
    age: 'Livre',
  },

  '13': {
    startDate: '01/12/2026',
    startTime: '19:00',
    cep: '',
    street: 'Praça do Patriarca',
    number: '20',
    district: 'Centro',
    age: '',
  },

  '14': {
    startDate: '02/12/2026',
    startTime: '18:00',
    cep: '',
    street: 'Av. Corifeu de Azevedo Marques',
    number: '1200',
    district: 'Zona Oeste',
    age: '',
  },

  '15': {
    startDate: '03/12/2026',
    startTime: '20:00',
    cep: '',
    street: 'Rua Domingos de Morais',
    number: '1500',
    district: 'Vila Mariana',
    age: '',
  },
};

EVENTS.forEach((e) => {
  e.form = FORMS[e.id];
});
