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
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import Filters from '../../components/Filters';
import FeaturedCarousel from '../../components/FeaturedCarousel';
import EventCard from '../../components/EventCard';


export default function MenuScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
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

        <View style={s.sectionHead}>
          <Text style={s.sectionTitle}>
            Recomendados para você
          </Text>

          <Text style={s.kickerRight}>
            24 e 25 de outubro
          </Text>
        </View>

        {featured.length > 0 ? (
          <FeaturedCarousel events={featured} />
        ) : (
          <View style={s.emptyFeatured}>
            <Ionicons
              name={todos.length === 0 ? 'calendar-outline' : 'calendar-check-outline'}
              size={36}
              color={colors.purple}
            />

            <Text style={s.emptyFeaturedTitle}>
              {todos.length === 0 ? 'Nenhum evento disponível' : 'Tudo em dia!'}
            </Text>

            <Text style={s.emptyFeaturedText}>
              {todos.length === 0
                ? 'Ainda não há eventos cadastrados na plataforma. Volte em breve para conferir as novidades!'
                : 'Você já salvou todos os eventos disponíveis. Novas recomendações aparecerão aqui quando houver outros eventos.'}
            </Text>
          </View>
        )}

        <View style={[s.rowBetween, s.sectionHead]}>
          <Text style={s.sectionTitle}>
            Na sua agenda
          </Text>

          {user && (
            <Pressable onPress={() => navigation.navigate('Favoritos')}>
              <Text style={s.seeAll}>
                Ver todos →
              </Text>
            </Pressable>
          )}
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

  kickerRight: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.black,
    marginTop: 4,
  },

  sectionHead: {
    marginTop: 12,
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

  emptyFeatured: {
    height: 220,
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 8,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },

  emptyFeaturedTitle: {
    fontFamily: fonts.title,
    fontSize: 20,
    color: colors.purple,
    marginTop: 12,
    marginBottom: 6,
  },

  emptyFeaturedText: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.black,
    textAlign: 'center',
    lineHeight: 19,
  },
});