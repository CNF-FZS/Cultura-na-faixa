// src/screens/busca/filterEvents.js
// Lógica que filtra os eventos por texto, data, região e categoria.
import { WHEN } from '../../data/events';

export const DEFAULT_FILTERS = { when: null, region: 'Todas', category: 'Todas' };

// Ignora acentos e maiúsculas: "sé" encontra "Se", "SÉ" etc.
const norm = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

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
}
