// src/screens/admin/RelatoriosScreen.js
// "Relatórios" (administrador): totais de eventos e usuários, eventos por categoria e resumo por região.
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../../theme';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventsContext';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';

const agrupar = (lista, chave) => {
  const out = {};
  lista.forEach((e) => (out[e[chave]] = [...(out[e[chave]] ?? []), e]));
  return Object.entries(out);
};
const plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`;

export default function RelatoriosScreen() {
  const { users } = useAuth();
  const { events } = useEvents();
  const porCategoria = agrupar(events, 'category');
  const porRegiao = agrupar(events, 'region');
  const maior = Math.max(1, ...porCategoria.map(([, l]) => l.length));
  const n = (role) => users.filter((u) => u.role === role).length;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={s.screen} edges={['top']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

        {/* BOTÃO VOLTAR
        <Pressable style={s.back} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.purple} />
          <Text style={s.backText}>Voltar</Text>
        </Pressable> */}

        {/* <Header label="Administrador" /> */}

        <Header
          label="Administrador"
          title="Relatórios"
          onBack={() => navigation.goBack()}
        />

        {/* <Text style={s.title}>Relatórios</Text> */}

        <View style={s.rowBetween}>
          <Text style={s.bold}>Período</Text>
          <Text style={s.small}>Dados ilustrativos</Text>
        </View>
        <View style={s.period}>
          <Ionicons name="calendar-outline" size={22} color={colors.purple} />
          <Text style={s.periodText}>Outubro de 2026</Text>
          <Ionicons name="chevron-down" size={20} color={colors.black} />
        </View>

        <View style={s.big}>
          <Text style={s.bigNum}>{events.length}</Text>
          <Text style={s.bigLbl}>Eventos cadastrados</Text>
        </View>

        <View style={[s.card, s.row]}>
          <Text style={s.cardNum}>{users.length}</Text>
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={s.cardTitle}>Usuários cadastrados</Text>
            <Text style={s.small}>{plural(n('usuario'), 'leitor', 'leitores')} · {plural(n('expositor'), 'expositor', 'expositores')} · {plural(n('administrador'), 'administrador', 'administradores')}</Text>
          </View>
          <Ionicons name="person" size={24} color={colors.purple} />
        </View>

        <View style={[s.card, { padding: 16 }]}>
          <Text style={s.h}>Eventos por categoria</Text>
          <Text style={[s.small, { marginBottom: 14 }]}>Quantidade · {plural(events.length, 'evento ativo', 'eventos ativos')}</Text>
          {porCategoria.map(([cat, lista]) => (
            <View key={cat} style={{ marginBottom: 14 }}>
              <View style={s.row}>
                <Text style={[s.bold, { width: 84 }]}>{cat}</Text>
                <View style={s.track}><View style={[s.bar, { width: `${(lista.length / maior) * 100}%` }]} /></View>
                <Text style={s.count}>{lista.length}</Text>
              </View>
              <Text style={[s.small, { marginTop: 6 }]}>{lista.map((e) => e.title).join(', ')}</Text>
            </View>
          ))}
        </View>

        <View style={[s.rowBetween, { marginTop: 8, marginBottom: 14 }]}>
          <Text style={s.h}>Resumo por região</Text>
          <Text style={s.small}>São Paulo</Text>
        </View>
        {porRegiao.map(([reg, lista]) => (
          <View key={reg} style={{ marginBottom: 18 }}>
            <View style={s.rowBetween}>
              <Text style={s.regName}>{reg}</Text>
              <Text style={s.bold}>{plural(lista.length, 'evento', 'eventos')}</Text>
            </View>
            <View style={s.regTrack}><View style={[s.regBar, { width: `${(lista.length / events.length) * 100}%` }]} /></View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 },
  title: { fontFamily: fonts.title, fontSize: 28, color: colors.black, marginTop: 8, marginBottom: 20 },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bold: { fontFamily: fonts.bold, fontSize: 14, color: colors.black },
  small: { fontFamily: fonts.body, fontSize: 12, color: colors.black },
  period: { flexDirection: 'row', alignItems: 'center', height: 52, paddingHorizontal: 14, marginTop: 10, borderWidth: 1, borderColor: colors.green },
  periodText: { flex: 1, fontFamily: fonts.body, fontSize: 15, color: colors.black, marginLeft: 12 },
  big: { backgroundColor: colors.purple, alignItems: 'center', paddingVertical: 24, marginVertical: 20 },
  bigNum: { fontFamily: fonts.title, fontSize: 40, color: colors.white },
  bigLbl: { fontFamily: fonts.body, fontSize: 13, color: colors.white },
  card: { borderWidth: 1, borderColor: colors.green, padding: 14, marginBottom: 20 },
  cardNum: { fontFamily: fonts.title, fontSize: 34, color: colors.purple },
  cardTitle: { fontFamily: fonts.bold, fontSize: 15, color: colors.black, marginBottom: 4 },
  h: { fontFamily: fonts.title, fontSize: 20, color: colors.black },
  track: { flex: 1, height: 14 },
  bar: { height: 14, backgroundColor: colors.purple },
  count: { width: 28, textAlign: 'right', fontFamily: fonts.title, fontSize: 20, color: colors.purple },
  regName: { fontFamily: fonts.body, fontSize: 15, color: colors.black },
  regTrack: { height: 10, borderWidth: 1, borderColor: colors.green, marginTop: 8 },
  regBar: { height: 8, backgroundColor: colors.green },
});
