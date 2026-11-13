// src/screens/favoritos/FavoritosScreen.js
// Aba Favoritos: eventos salvos, com opção de remover e atalho para descobrir mais.
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../../theme';
import { EVENTS } from '../../data/events';
import { useFavorites } from '../../context/FavoritesContext';
import EventCard from '../../components/EventCard';
import Button from '../../components/Button';

export default function FavoritosScreen({ navigation }) {
  const { isFavorite, toggle } = useFavorites();
  const lista = EVENTS.filter((e) => isFavorite(e.id));
  const n = lista.length;

  return (
    <SafeAreaView style={s.screen} edges={['top']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Text style={s.title}>Seus próximos eventos</Text>

        <View style={s.summary}>
          <Ionicons name="heart" size={26} color={colors.black} />
          <View style={{ marginLeft: 16 }}>
            <Text style={s.count}>{n} {n === 1 ? 'evento salvo' : 'eventos salvos'}</Text>
            <Text style={s.sub}>Sua seleção cultural em São Paulo</Text>
          </View>
        </View>

        {n > 0 && <Text style={s.kicker}>NESTE FIM DE SEMANA · 24 E 25 OUT</Text>}
        {n === 0 && <Text style={s.empty}>Toque no coração de um evento para guardá-lo aqui.</Text>}

        {lista.map((e) => (
          <EventCard key={e.id} event={e} onRemove={() => toggle(e.id)} />
        ))}

        <Button label="Descobrir mais eventos" variant="outline" icon="arrow-forward" onPress={() => navigation.navigate('Explorar')} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  content: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 32 },
  title: { fontFamily: fonts.title, fontSize: 28, color: colors.black },
  summary: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 32, marginBottom: 28 },
  count: { fontFamily: fonts.body, fontSize: 16, color: colors.purple },
  sub: { fontFamily: fonts.body, fontSize: 13, color: colors.black, marginTop: 4 },
  kicker: { fontFamily: fonts.bold, fontSize: 11, color: colors.purple, letterSpacing: 0.3, marginBottom: 12 },
  empty: { fontFamily: fonts.body, fontSize: 14, color: colors.black, marginBottom: 20 },
});
