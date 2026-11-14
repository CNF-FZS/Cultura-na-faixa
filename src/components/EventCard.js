// src/components/EventCard.js
// Card de evento (imagem, data, título, local, categoria e coração). Com onRemove, mostra "Remover dos favoritos".
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useRequireLogin from '../hooks/useRequireLogin';
import { colors, fonts } from '../theme';
import { useFavorites } from '../context/FavoritesContext';

export default function EventCard({ event, showPrice = true, onRemove }) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(event.id);
  const navigation = useNavigation();
  const requireLogin = useRequireLogin();

  return (
    <Pressable style={s.card} onPress={() => navigation.navigate('Detalhes', { id: event.id })}>
      <View style={s.row}>
        <Image source={event.image} style={s.image} />
        <View style={s.body}>
          <Text style={s.date}>{event.dateShort ?? event.date}</Text>
          <Text style={s.title}>{event.title}</Text>
          <Text style={s.venue}>{event.venue}</Text>
          <View style={s.rowBetween}>
            <Text style={s.meta}>{showPrice ? `${event.category} · ${event.price}` : event.category}</Text>
            <Pressable
              onPress={() => requireLogin(() => toggle(event.id))}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel={fav ? 'Remover dos favoritos' : 'Favoritar'}
            >
              <Ionicons name={fav ? 'heart' : 'heart-outline'} size={24} color={colors.purple} />
            </Pressable>
          </View>
        </View>
      </View>
      {onRemove && (
        <Pressable onPress={onRemove} style={s.remove} accessibilityRole="button">
          <Ionicons name="close" size={18} color={colors.purple} />
          <Text style={s.removeText}>Remover dos favoritos</Text>
        </Pressable>
      )}
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: { borderWidth: 1, borderColor: colors.green, backgroundColor: colors.white, padding: 11, marginBottom: 22 },
  row: { flexDirection: 'row' },
  image: { width: 90, height: 112, borderRadius: 14 },
  body: { flex: 1, marginLeft: 12, justifyContent: 'space-between' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  date: { fontFamily: fonts.bold, fontSize: 11, color: colors.purple },
  title: { fontFamily: fonts.title, fontSize: 22, color: colors.black, marginTop: 2 },
  venue: { fontFamily: fonts.body, fontSize: 13, color: colors.black, marginTop: 2 },
  meta: { fontFamily: fonts.bold, fontSize: 12, color: colors.purple, marginTop: 6 },
  remove: { alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center', marginTop: 10, paddingVertical: 4 },
  removeText: { fontFamily: fonts.bold, fontSize: 14, color: colors.purple, marginLeft: 6 },
});
