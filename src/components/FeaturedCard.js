// src/components/FeaturedCard.js
// Card grande de destaque (roxo) da tela inicial.
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useRequireLogin from '../hooks/useRequireLogin';
import { colors, fonts } from '../theme';
import { useFavorites } from '../context/FavoritesContext';

export default function FeaturedCard({ event }) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(event.id);
  const navigation = useNavigation();
  const requireLogin = useRequireLogin();

  return (
    <Pressable style={s.hero} onPress={() => navigation.navigate('Detalhes', { id: event.id })}>
      <Image source={event.image} style={s.image} />
      <View style={s.body}>
        <View style={s.rowBetween}>
          <Text style={s.date}>{event.date}</Text>
          <View style={s.badge}>
            <Text style={s.badgeText}>{event.price}</Text>
          </View>
        </View>
        <Text style={s.title}>{event.title}</Text>
        <Text style={s.sub}>{event.subtitle}</Text>
        <Text style={s.venue}>{event.venue}</Text>
        <Pressable
          onPress={() => requireLogin(() => toggle(event.id))}
          style={s.heart}
          accessibilityRole="button"
          accessibilityLabel={fav ? 'Remover dos favoritos' : 'Favoritar'}
        >
          <Ionicons name={fav ? 'heart' : 'heart-outline'} size={26} color={colors.purple} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  hero: { backgroundColor: colors.purple },
  image: { width: '100%', height: 196 },
  body: { padding: 18, paddingBottom: 22 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  date: { fontFamily: fonts.bold, fontSize: 12, color: colors.green, letterSpacing: 0.3 },
  badge: { backgroundColor: colors.green, paddingHorizontal: 14, paddingVertical: 9 },
  badgeText: { fontFamily: fonts.bold, fontSize: 14, color: colors.black },
  title: { fontFamily: fonts.title, fontSize: 32, color: colors.white, marginTop: 14 },
  sub: { fontFamily: fonts.body, fontSize: 14, color: colors.white, marginTop: 14 },
  venue: { fontFamily: fonts.body, fontSize: 13, color: colors.white, marginTop: 22, maxWidth: '75%' },
  heart: {
    position: 'absolute',
    right: 16,
    bottom: 12,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
