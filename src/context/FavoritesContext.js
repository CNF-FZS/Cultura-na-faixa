// src/context/FavoritesContext.js
// Guarda quais eventos estão favoritados e compartilha isso entre todas as telas.
import { createContext, useCallback, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const { user } = useAuth(); // visitante não tem favoritos
  // Começa com tudo favoritado só para ficar igual ao Figma; use new Set() em produção.
  const [favs, setFavs] = useState(new Set(['1', '2', '3']));

  const toggle = useCallback((id) => {
    setFavs((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const isFavorite = (id) => !!user && favs.has(id);

  return (
    <FavoritesContext.Provider value={{ favs, toggle, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
