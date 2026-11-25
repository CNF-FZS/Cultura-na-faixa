// Lógica que filtra os eventos por texto, data, região e categoria.
import { WHEN } from '../../data/events';

// Arrays vazios significam que todas as opções daquele grupo estão liberadas.
export const DEFAULT_FILTERS = {
  when: [],
  region: [],
  category: [],
};

// Obtém a data atual no formato YYYY-MM-DD, usando o horário local.
export function getTodayLocalDate() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// Ignora acentos e diferenças entre letras maiúsculas e minúsculas.
export const norm = (t) =>
  (t || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

// Ordena eventos por data e, quando necessário, por horário.
function ordenarEventos(a, b) {
  const comparacaoData = a.day.localeCompare(b.day);

  if (comparacaoData !== 0) {
    return comparacaoData;
  }

  const horarioA = a.form?.startTime || '00:00';
  const horarioB = b.form?.startTime || '00:00';

  return horarioA.localeCompare(horarioB);
}

// Aplica os filtros aos eventos.
export function filterEvents(
  events,
  query,
  filters,
  today = getTodayLocalDate()
) {
  const q = norm((query || '').trim());

  const {
    when = [],
    region = [],
    category = [],
  } = filters;

  return events
    .filter((e) => {
      // Oculta eventos anteriores à data atual.
      if (e.day < today) return false;

      // Reúne as informações do evento para pesquisar pelo texto.
      const text = norm(
        [
          e.title,
          e.subtitle,
          e.venue,
          e.address,
          e.region,
          e.category,
        ]
          .filter(Boolean)
          .join(' ')
      );

      // Verifica se o texto pesquisado aparece nas informações do evento.
      if (q && !text.includes(q)) return false;

      // O evento pode corresponder a qualquer um dos períodos selecionados.
      if (
        when.length > 0 &&
        !when.some((period) => {
          const range = WHEN[period];

          return (
            range &&
            e.day >= range.from &&
            e.day <= range.to
          );
        })
      ) {
        return false;
      }

      // O evento pode estar em qualquer uma das regiões selecionadas.
      if (region.length > 0 && !region.includes(e.region)) {
        return false;
      }

      // O evento pode pertencer a qualquer uma das categorias selecionadas.
      if (category.length > 0 && !category.includes(e.category)) {
        return false;
      }

      return true;
    })
    .sort(ordenarEventos);
}