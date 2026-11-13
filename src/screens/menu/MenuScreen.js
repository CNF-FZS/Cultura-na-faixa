// src/screens/menu/MenuScreen.js
// Aba Explorar (tela inicial): filtros, evento em destaque e agenda.
import { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts } from '../../theme';
import { EVENTS } from '../../data/events';
import Filters from '../../components/Filters';
import FeaturedCard from '../../components/FeaturedCard';
import EventCard from '../../components/EventCard';

const featured = EVENTS.find((e) => e.featured);
const agenda = EVENTS.filter((e) => !e.featured);

export default function MenuScreen() {
  const [filter, setFilter] = useState('Tudo');
  const events = agenda.filter((e) => filter === 'Tudo' || e.category === filter);

  return (
    <SafeAreaView style={s.screen} edges={['top']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../../assets/logo.png')}
          style={s.logo}
          accessibilityLabel="Cultura na Faixa"
        />

        <Filters active={filter} onChange={setFilter} />

        <View style={[s.rowBetween, s.kicker]}>
          <Text style={s.kickerLeft}>RECOMENDADOS PARA VOCÊ</Text>
          <Text style={s.kickerRight}>24 e 25 de outubro</Text>
        </View>

        <FeaturedCard event={featured} />

        <View style={[s.rowBetween, s.sectionHead]}>
          <Text style={s.sectionTitle}>Na sua agenda</Text>
          <Pressable>
            <Text style={s.seeAll}>Ver todos →</Text>
          </Pressable>
        </View>

        {events.length === 0 && (
          <Text style={s.empty}>Nenhum evento nessa categoria por enquanto.</Text>
        )}
        {events.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { width: 141, height: 70, resizeMode: 'contain', marginBottom: 22 },
  kicker: { marginBottom: 12 },
  kickerLeft: { fontFamily: fonts.bold, fontSize: 11, color: colors.purple, letterSpacing: 0.3 },
  kickerRight: { fontFamily: fonts.body, fontSize: 12, color: colors.black },
  sectionHead: { marginTop: 32, marginBottom: 20 },
  sectionTitle: { fontFamily: fonts.title, fontSize: 22, color: colors.black },
  seeAll: { fontFamily: fonts.bold, fontSize: 14, color: colors.purple },
  empty: { fontFamily: fonts.body, fontSize: 14, color: colors.black, marginBottom: 16 },
});
