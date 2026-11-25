// Aba Favoritos: eventos salvos, separados entre próximos e encerrados.
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../../theme';
import { useEvents } from '../../context/EventsContext';
import { useAuth } from '../../context/AuthContext';
import LoginPrompt from '../../components/LoginPrompt';
import { useFavorites } from '../../context/FavoritesContext';
import EventCard from '../../components/EventCard';
import Button from '../../components/Button';

// Data de referência do MVP.
const DATA_REFERENCIA = '2026-11-25';

// Ordena os eventos por data e horário.
function ordenarEventos(a, b) {
  const comparacaoData = a.day.localeCompare(b.day);

  if (comparacaoData !== 0) {
    return comparacaoData;
  }

  const horarioA = a.form?.startTime || '00:00';
  const horarioB = b.form?.startTime || '00:00';

  return horarioA.localeCompare(horarioB);
}

export default function FavoritosScreen({ navigation }) {
  const { user } = useAuth();
  const { events } = useEvents();
  const { isFavorite, toggle } = useFavorites();

  if (!user) {
    return (
      <LoginPrompt
        title="Salve seus eventos favoritos"
        text="Entre ou crie uma conta gratuita para guardar os eventos de que você mais gosta."
      />
    );
  }

  // Recupera todos os eventos favoritados.
  const lista = events.filter((e) => isFavorite(e.id));

  // Separa eventos futuros e encerrados.
  const proximosEventos = lista
    .filter((e) => e.day >= DATA_REFERENCIA)
    .sort(ordenarEventos);

  const eventosEncerrados = lista
    .filter((e) => e.day < DATA_REFERENCIA)
    .sort((a, b) => ordenarEventos(b, a));

  const n = lista.length;

  return (
    <SafeAreaView style={s.screen} edges={['top']}>
      <ScrollView
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={s.title}>Seus eventos favoritos</Text>

        <View style={s.summary}>
          <Ionicons
            name="heart"
            size={26}
            color={colors.black}
          />

          <View style={{ marginLeft: 16 }}>
            <Text style={s.count}>
              {n} {n === 1 ? 'evento salvo' : 'eventos salvos'}
            </Text>

            <Text style={s.sub}>
              Sua seleção cultural em São Paulo
            </Text>
          </View>
        </View>

        {/* Próximos eventos */}
        <Text style={s.sectionTitle}>Próximos eventos</Text>

        {proximosEventos.length > 0 ? (
          proximosEventos.map((e) => (
            <EventCard
              key={e.id}
              event={e}
              onRemove={() => toggle(e.id)}
            />
          ))
        ) : (
          <Text style={s.empty}>
            Você não possui próximos eventos salvos no momento.
          </Text>
        )}

        {/* Eventos encerrados */}
        {eventosEncerrados.length > 0 && (
          <>
            <Text style={[s.sectionTitle, s.pastTitle]}>
              Eventos já encerrados
            </Text>

            {eventosEncerrados.map((e) => (
              <EventCard
                key={e.id}
                event={e}
                onRemove={() => toggle(e.id)}
              />
            ))}
          </>
        )}

        {n === 0 && (
          <Text style={s.empty}>
            Toque no coração de um evento para guardá-lo aqui.
          </Text>
        )}

        <Button
          label="Descobrir mais eventos"
          variant="outline"
          icon="arrow-forward"
          onPress={() => navigation.navigate('Busca')}
        />
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
    paddingTop: 20,
    paddingBottom: 32,
  },

  title: {
    fontFamily: fonts.title,
    fontSize: 28,
    color: colors.black,
  },

  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 32,
    marginBottom: 28,
  },

  count: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.purple,
  },

  sub: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.black,
    marginTop: 4,
  },

  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.purple,
    marginBottom: 14,
  },

  pastTitle: {
    marginTop: 28,
  },

  empty: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.black,
    marginBottom: 24,
    lineHeight: 21,
  },
});

