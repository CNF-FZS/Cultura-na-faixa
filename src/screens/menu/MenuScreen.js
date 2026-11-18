import { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts } from '../../theme';
import { useEvents } from '../../context/EventsContext';
import { useFavorites } from '../../context/FavoritesContext';
import Filters from '../../components/Filters';
import FeaturedCarousel from '../../components/FeaturedCarousel';
import EventCard from '../../components/EventCard';

export default function MenuScreen() {
  const { events: todos } = useEvents();
  const { isFavorite } = useFavorites();

  const featured = todos
    .filter((e) => !isFavorite(e.id))
    .slice(0, 3);

  // Mantém os  que foram favoritados.
  const agenda = todos.filter((e) => isFavorite(e.id));

  const [filter, setFilter] = useState('Tudo');

  const events = agenda.filter(
    (e) => filter === 'Tudo' || e.category === filter
  );

  // limite de 2 eventos na agenda
  const agendaVisivel = events.slice(0, 2);

  return (
    <SafeAreaView style={s.screen} edges={['top']}>
      <ScrollView
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require('../../../assets/logo.png')}
          style={s.logo}
          accessibilityLabel="Cultura na Faixa"
        />

        {/* <Filters
          active={filter}
          onChange={setFilter}
        /> */}

        <View style={[s.rowBetween, s.kicker]}>
          <Text style={s.sectionTitle2}>
            RECOMENDADOS PARA VOCÊ
          </Text>

          {/* <Text style={s.kickerLeft}>
            RECOMENDADOS PARA VOCÊ
          </Text> */}

          {/* <Text style={s.kickerRight}>
            24 e 25 de outubro
          </Text> */}
        </View>

        <Text style={s.kickerRight}>
          24 e 25 de outubro
        </Text>

        {featured.length > 0 && (
          <FeaturedCarousel events={featured} />
        )}

        <View style={[s.rowBetween, s.sectionHead]}>
          <Text style={s.sectionTitle}>
            Na sua agenda
          </Text>

          <Pressable>
            <Text style={s.seeAll}>
              Ver todos →
            </Text>
          </Pressable>
        </View>

        {events.length === 0 && (
          <Text style={s.empty}>
            Você ainda não salvou eventos nesta categoria.
          </Text>
        )}

        {/* ALTERAÇÃO (AGENDA): antes era events.map(...), que mostrava todos. Agora mostra só 2 */}
        {agendaVisivel.map((e) => (
          <EventCard
            key={e.id}
            event={e}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    width: 141,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 22,
  },

  kicker: {
    marginBottom: 12,
  },

  kickerLeft: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: colors.purple,
    letterSpacing: 0.3,
  },

  // kickerRight: {
  //   fontFamily: fonts.body,
  //   fontSize: 12,
  //   color: colors.black,
  // },

  kickerRight: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.black,
    paddingBottom: 12,
    paddingRight: 2,
    textAlign: 'right',
  },

  sectionHead: {
    marginTop: 32,
    marginBottom: 20,
  },

  sectionTitle: {
    fontFamily: fonts.title,
    fontSize: 22,
    color: colors.black,
  },

  sectionTitle2: {
    fontFamily: fonts.title,
    fontSize: 24,
    color: colors.black,
  },

  seeAll: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.purple,
  },

  empty: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.black,
    marginBottom: 16,
  },
});