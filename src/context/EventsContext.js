// Lista de eventos em memória (adicionar, editar, excluir). Todas as telas leem daqui; trocar por API depois.
import { createContext, useContext, useState } from 'react';
import { EVENTS } from '../data/events';

const EventsContext = createContext(null);

export function EventsProvider({ children }) {
  const [events, setEvents] = useState(EVENTS);

  const addEvent = (e) => setEvents((l) => [...l, { ...e, id: String(Date.now()) }]);
  const updateEvent = (id, patch) => setEvents((l) => l.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  const removeEvent = (id) => setEvents((l) => l.filter((e) => e.id !== id));

  return <EventsContext.Provider value={{ events, addEvent, updateEvent, removeEvent }}>{children}</EventsContext.Provider>;
}

export const useEvents = () => useContext(EventsContext);
