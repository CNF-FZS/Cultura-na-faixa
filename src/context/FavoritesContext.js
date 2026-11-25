// Guarda quais eventos estão favoritados e compartilha isso entre todas as telas.
import { createContext, useCallback, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext(null);

// Quantidades fictícias iniciais de favoritos por evento.
const FAVORITOS_INICIAIS = {
  '1': 18,
  '2': 12,
  '3': 9,
  '4': 18,
  '5': 14,
  '6': 11,
  '7': 8,
  '8': 13,
  '9': 7,
  '10': 10,
  '11': 6,
  '12': 5,
  '13': 9,
  '14': 4,
  '15': 3,
};

export function FavoritesProvider({ children }) {
  const { user } = useAuth();

  // Favoritos da conta atual.
  const [favs, setFavs] = useState(new Set(['5', '6', '8', '1']));

  // Contagem demonstrativa de favoritos por evento.
  const [favoriteCounts, setFavoriteCounts] = useState(FAVORITOS_INICIAIS);

  // Adiciona ou remove um evento dos favoritos.
  const toggle = useCallback((id) => {
    const eventId = String(id);

    setFavs((prev) => {
      const next = new Set(prev);
      const removendo = next.has(eventId);

      if (removendo) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }

      // Atualiza a quantidade de favoritos do evento.
      setFavoriteCounts((counts) => ({
        ...counts,
        [eventId]: Math.max(
          0,
          (counts[eventId] || 0) + (removendo ? -1 : 1)
        ),
      }));

      return next;
    });
  }, []);

  const isFavorite = (id) => !!user && favs.has(String(id));

  // Consulta a quantidade de favoritos de um evento.
  const getFavoriteCount = (id) => {
    return favoriteCounts[String(id)] || 0;
  };

  return (
    <FavoritesContext.Provider
      value={{
        favs,
        toggle,
        isFavorite,
        getFavoriteCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
