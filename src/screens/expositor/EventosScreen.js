// src/screens/expositor/EventosScreen.js
// "Área de Eventos" (expositor e administrador): lista com busca, e atalhos para adicionar, editar e excluir.
import { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../../theme';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventsContext';
import { norm } from '../busca/filterEvents';
import SearchBar from '../busca/SearchBar';
import Header from '../../components/Header';
import Button from '../../components/Button';
import ExcluirEventoModal from './ExcluirEventoModal';

export default function EventosScreen({ navigation }) {
  const { user } = useAuth();
  const { events, removeEvent } = useEvents();
  const [q, setQ] = useState('');
  const [alvo, setAlvo] = useState(null); // evento que está sendo excluído
  const lista = events.filter((e) => norm(`${e.title} ${e.venue} ${e.category}`).includes(norm(q.trim())));

  return (
    <SafeAreaView style={s.screen} edges={['top']}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {/* BOTAÕ VOLTAR
        <Pressable style={s.back} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.purple} />
          <Text style={s.backText}>Voltar</Text>
        </Pressable> */}
        {/* <Header onBack={() => navigation.goBack()} label={user.role === 'administrador' ? 'Administrador' : 'Expositor'} /> */}

        <Header
          onBack={() => navigation.goBack()}
          label={user.role === 'administrador' ? 'Administrador' : 'Expositor'}
          title="Eventos"
        />
        {/* <Text style={s.title}>Eventos</Text> */}

        <View style={s.stat}>
          <Text style={s.statNum}>{events.length}</Text>
          <Text style={s.statLabel}>Eventos no total</Text>
        </View>

        <Button label="Adicionar evento" icon="add" onPress={() => navigation.navigate('AdicionarEvento')} />
        <View style={{ height: 16 }} />
        <SearchBar placeholder="Pesquisar título, local ou categoria" value={q} onChangeText={setQ} />

        <View style={s.rowBetween}>
          <Text style={s.small}>Todos os eventos · {lista.length}</Text>
          <Text style={s.small}>Outubro de 2026</Text>
        </View>

        {lista.map((e) => (
          <View key={e.id} style={s.card}>
            <View style={s.row}>
              <Image source={e.image} style={s.thumb} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={s.cardTitle}>{e.title}</Text>
                <Text style={s.cardDate}>{e.dateShort ?? e.date}</Text>
                <Text style={s.cardVenue}>{e.venue}</Text>
                <Text style={s.cardMeta}>{e.category} · Gratuito</Text>
              </View>
            </View>
            <View style={s.divider} />
            <View style={s.rowBetween}>
              <Pressable style={s.action} onPress={() => navigation.navigate('EditarEvento', { id: e.id })}>
                <Ionicons name="pencil-outline" size={20} color={colors.purple} />
                <Text style={s.actionText}>Editar</Text>
              </Pressable>
              <Pressable style={s.action} onPress={() => setAlvo(e)}>
                <Ionicons name="trash-outline" size={20} color={colors.purple} />
                <Text style={s.actionText}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      <ExcluirEventoModal
        event={alvo}
        onClose={() => setAlvo(null)}
        onConfirm={() => {
          removeEvent(alvo.id);
          setAlvo(null);
        }}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 },
  title: { fontFamily: fonts.title, fontSize: 28, color: colors.black, marginTop: 8 },
  stat: { paddingHorizontal: 16, marginTop: 28, marginBottom: 28 },
  statNum: { fontFamily: fonts.title, fontSize: 34, color: colors.purple },
  statLabel: { fontFamily: fonts.body, fontSize: 13, color: colors.purple, marginTop: 4 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  small: { fontFamily: fonts.body, fontSize: 14, color: colors.black, marginTop: 18, marginBottom: 16 },
  card: { borderWidth: 1, borderColor: colors.green, padding: 12, marginBottom: 20 },
  row: { flexDirection: 'row' },
  thumb: { width: 64, height: 64, borderRadius: 12 },
  cardTitle: { fontFamily: fonts.title, fontSize: 20, color: colors.black },
  cardDate: { fontFamily: fonts.body, fontSize: 12, color: colors.purple, marginTop: 4 },
  cardVenue: { fontFamily: fonts.body, fontSize: 13, color: colors.black, marginTop: 2 },
  cardMeta: { fontFamily: fonts.body, fontSize: 13, color: colors.purple, marginTop: 2 },
  divider: { height: 1, backgroundColor: colors.black + '66', marginVertical: 12 },
  action: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
  actionText: { fontFamily: fonts.bold, fontSize: 14, color: colors.purple, marginLeft: 8 },
});
