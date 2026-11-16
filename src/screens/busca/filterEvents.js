// src/screens/busca/filterEvents.js
// Lógica que filtra os eventos por texto, data, região e categoria.
//import { WHEN } from '../../data/events';

//export const DEFAULT_FILTERS = { when: null, region: 'Todas', category: 'Todas' };

// Ignora acentos e maiúsculas: "sé" encontra "Se", "SÉ" etc.
/*export const norm = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export function filterEvents(events, query, { when, region, category }) {
  const q = norm(query.trim());
  return events.filter((e) => {
    const text = norm([e.title, e.subtitle, e.venue, e.address, e.region, e.category].filter(Boolean).join(' '));
    if (q && !text.includes(q)) return false;
    if (when && (e.day < WHEN[when].from || e.day > WHEN[when].to)) return false;
    if (region !== 'Todas' && e.region !== region) return false;
    if (category !== 'Todas' && e.category !== category) return false;
    return true;
  });
}*/

// src/screens/busca/filterEvents.js
// Lógica que filtra os eventos por texto, data, região e categoria.
import { WHEN } from '../../data/events';

// Arrays vazios significam que todas as opções daquele grupo estão liberadas.
export const DEFAULT_FILTERS = {
  when: [],
  region: [],
  category: [],
};

// Ignora acentos e maiúsculas.
export const norm = (t) =>
  t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export function filterEvents(events, query, filters) {
  const q = norm((query || '').trim());

  const { when = [], region = [], category = [] } = filters;

  return events.filter((e) => {
    const text = norm(
      [e.title, e.subtitle, e.venue, e.address, e.region, e.category]
        .filter(Boolean)
        .join(' ')
    );

    if (q && !text.includes(q)) return false;

    // O evento pode corresponder a qualquer uma das datas selecionadas.
    if (
      when.length > 0 &&
      !when.some((period) => {
        const range = WHEN[period];
        return range && e.day >= range.from && e.day <= range.to;
      })
    ) {
      return false;
    }

    // O evento pode estar em qualquer uma das regiões selecionadas.
    if (region.length > 0 && !region.includes(e.region)) return false;

    // O evento pode pertencer a qualquer uma das categorias selecionadas.
    if (category.length > 0 && !category.includes(e.category)) return false;

    return true;
  });
}
