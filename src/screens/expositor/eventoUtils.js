// src/screens/expositor/eventoUtils.js
// Converte o formulário em evento (datas, endereço, acesso por extenso) e valida os campos obrigatórios.

export const DEFAULT_COVER = require('../../../assets/logo-c.jpg');

export const COVERS = [
  require('../../../assets/roda-do-encontro.png'),
  require('../../../assets/corpos-da-cidade.png'),
  require('../../../assets/outros-olhares.jpg'),
  require('../../../assets/jazz-na-praca.jpg'),
  require('../../../assets/sons-da-quebrada.jpg'),
  require('../../../assets/cinema-na-praca.jpg'),
  require('../../../assets/movimento-em-cena.jpg'),
  require('../../../assets/danca-nas-ruas.jpg'),
  require('../../../assets/memorias-em-cores.jpg'),
  require('../../../assets/logo-c.jpg'),
];
export const AGES = ['Livre', '10 anos', '12 anos', '14 anos', '16 anos', '18 anos'];
export const EMPTY_FORM = {
  title: '', artist: '', description: '', category: '', startDate: '', startTime: '', endDate: '', endTime: '',
  placeName: '', cep: '', street: '', number: '', complement: '', district: '', city: 'São Paulo', uf: 'SP',
  region: '', transport: '', age: '', accessibility: '', entry: '', linkSignup: '', linkInfo: '',
};

export const REQUIRED = ['title', 'description', 'category', 'startDate', 'startTime', 'placeName', 'cep', 'street', 'number', 'district', 'city', 'uf', 'region', 'age'];

const DIAS = 'domingo,segunda-feira,terça-feira,quarta-feira,quinta-feira,sexta-feira,sábado'.split(',');
const MESES = 'janeiro,fevereiro,março,abril,maio,junho,julho,agosto,setembro,outubro,novembro,dezembro'.split(',');
const up3 = (t) => t.slice(0, 3).toUpperCase();
const hora = (t) => { const [h, m] = t.split(':'); return m === '00' ? `${+h}H` : `${+h}H${m}`; };

export function validate(f) {
  if (REQUIRED.some((k) => !String(f[k]).trim())) return 'Preencha todos os campos obrigatórios (*).';
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(f.startDate) || !/^\d{2}:\d{2}$/.test(f.startTime)) return 'Use a data como dd/mm/aaaa e a hora como hh:mm.';
  if (f.endTime && !/^\d{2}:\d{2}$/.test(f.endTime)) return 'Use a hora de fim como hh:mm.';
  return '';
}

export function buildEvent(f, image) {
  const [dd, mm, yy] = f.startDate.split('/').map(Number);
  const dia = DIAS[new Date(yy, mm - 1, dd).getDay()];
  const curto = `${up3(dia)}, ${dd} ${up3(MESES[mm - 1])} · ${hora(f.startTime)}`;
  const longo = `${dia}, ${dd} de ${MESES[mm - 1]} de ${yy}`;
  const livre = f.age === 'Livre';
  return {
    title: f.title, artist: f.artist, description: f.description, category: f.category, region: f.region,
    subtitle: f.artist ? `${f.category} · ${f.artist}` : f.category,
    image, price: 'Grátis', form: f,
    day: `${yy}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`,
    dateShort: curto, date: f.endTime ? `${curto}–${hora(f.endTime)}` : curto,
    dateLong: longo[0].toUpperCase() + longo.slice(1),
    time: `Início às ${hora(f.startTime).toLowerCase()}${f.endTime ? ` · Encerramento às ${hora(f.endTime).toLowerCase()}` : ''}`,
    placeName: f.placeName, venue: `${f.placeName} · ${f.district}`, address: `${f.street}, ${f.number} · ${f.district}`,
    addressLines: [`${f.street}, ${f.number}${f.complement ? ` · ${f.complement}` : ''}`, `${f.district} · ${f.city} – ${f.uf}`, `CEP ${f.cep}`],
    transport: f.transport ? [f.transport] : undefined,
    age: livre ? ['Livre para todas as idades', 'Crianças e adultos são bem-vindos.'] : [`Classificação: ${f.age}`, `Recomendado a partir de ${f.age}.`],
    accessibility: f.accessibility || undefined,
    signup: f.entry || undefined,
    links: { signup: f.linkSignup || undefined, info: f.linkInfo || undefined },
  };
}
