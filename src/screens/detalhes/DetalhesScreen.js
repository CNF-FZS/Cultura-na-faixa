// Tela "O seu próximo rolê": todos os detalhes de um evento (quando, onde, acesso) e botões de inscrição.
import { View, Text, Image, ScrollView, Pressable, Linking, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../../theme';
import { useEvents } from '../../context/EventsContext';
import { useFavorites } from '../../context/FavoritesContext';
import Button from '../../components/Button';
import useRequireLogin from '../../hooks/useRequireLogin';

function Info({ icon, title, lines = [] }) {
  return (
    <View style={s.info}>
      <Ionicons name={icon} size={24} color={colors.purple} style={{ marginRight: 16 }} />
      <View style={{ flex: 1 }}>
        <Text style={s.infoTitle}>{title}</Text>
        {lines.map((l) => (
          <Text key={l} style={s.infoText}>{l}</Text>
        ))}
      </View>
    </View>
  );
}

export default function DetalhesScreen({ route, navigation }) {
  const { events } = useEvents();
  const { isFavorite, toggle } = useFavorites();
  const requireLogin = useRequireLogin();
  const e = events.find((x) => x.id === route.params.id);
  if (!e) return null; // evento excluído enquanto a tela estava aberta
  const fav = isFavorite(e.id);

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.top}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={12} accessibilityLabel="Voltar">
            <Ionicons name="arrow-back" size={26} color={colors.purple} />
          </Pressable>
          <Text style={s.topTitle}>O seu próximo rolê</Text>
          <Pressable onPress={() => requireLogin(() => toggle(e.id))} style={s.heart} accessibilityLabel={fav ? 'Remover dos favoritos' : 'Favoritar'}>
            <Ionicons name={fav ? 'heart' : 'heart-outline'} size={24} color={colors.purple} />
          </Pressable>
        </View>

        <Image source={e.image} style={s.image} />

        <View style={s.tags}>
          <Text style={s.tag}>{e.category}</Text>
          {fav && (
            <View style={s.saved}>
              <Ionicons name="heart" size={12} color={colors.purple} />
              <Text style={s.savedText}>Salvo</Text>
            </View>
          )}
        </View>

        <Text style={s.title}>{e.title}</Text>
        {e.artist ? <Text style={s.artist}>{e.artist}</Text> : null}
        {e.description ? <Text style={s.desc}>{e.description}</Text> : null}

        <View style={s.line} />
        <Info icon="calendar-outline" title={e.dateLong} lines={[e.time]} />
        <Info icon="location-outline" title={e.placeName ?? e.venue} lines={e.addressLines} />
        {e.transport && <Info icon="train-outline" title="Chegue de transporte público" lines={e.transport} />}

        <View style={[s.line, { backgroundColor: colors.green }]} />
        {e.age && <Info icon="people-outline" title={e.age[0]} lines={[e.age[1]]} />}
        {e.accessibility && <Info icon="accessibility-outline" title="Acessibilidade" lines={[e.accessibility]} />}
        {e.signup && <Info icon="ticket-outline" title="Requer inscrição antecipada" lines={[e.signup]} />}

        {e.signup && (
          <View style={s.note}>
            <Text style={s.noteTitle}>Bora se programar?</Text>
            <Text style={s.noteText}>A inscrição acontece no site do organizador. Confira as informações antes de sair de casa.</Text>
          </View>
        )}

        {e.links?.signup && (
          <Button label="Inscrever-se gratuitamente ↗" onPress={() => Linking.openURL(e.links.signup)} style={{ marginTop: 28 }} />
        )}
        {e.links?.info && (
          <Pressable onPress={() => Linking.openURL(e.links.info)} style={s.more}>
            <Ionicons name="link-outline" size={18} color={colors.purple} />
            <Text style={s.moreText}>Mais informações no site do organizador</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  content: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 32 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  topTitle: { fontFamily: fonts.bold, fontSize: 14, color: colors.black },
  heart: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: 245 },
  tags: { flexDirection: 'row', alignItems: 'center', marginTop: 14, minHeight: 36 },
  tag: { fontFamily: fonts.bold, fontSize: 14, color: colors.purple, paddingHorizontal: 12 },
  saved: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.green, paddingHorizontal: 12, paddingVertical: 8, marginLeft: 6 },
  savedText: { fontFamily: fonts.body, fontSize: 12, color: colors.purple, marginLeft: 6 },
  title: { fontFamily: fonts.title, fontSize: 32, color: colors.black, marginTop: 14 },
  artist: { fontFamily: fonts.body, fontSize: 16, color: colors.purple, marginTop: 12 },
  desc: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24, color: colors.black, marginTop: 16 },
  line: { height: 1, backgroundColor: colors.black + '66', marginVertical: 24 },
  info: { flexDirection: 'row', marginBottom: 24 },
  infoTitle: { fontFamily: fonts.body, fontSize: 16, color: colors.black, marginBottom: 6 },
  infoText: { fontFamily: fonts.body, fontSize: 14, lineHeight: 21, color: colors.black },
  note: { paddingHorizontal: 16, marginTop: 8 },
  noteTitle: { fontFamily: fonts.body, fontSize: 15, color: colors.purple, marginBottom: 6 },
  noteText: { fontFamily: fonts.body, fontSize: 13, lineHeight: 19, color: colors.purple },
  more: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, marginTop: 10 },
  moreText: { fontFamily: fonts.bold, fontSize: 13, color: colors.purple, marginLeft: 8 },
});
