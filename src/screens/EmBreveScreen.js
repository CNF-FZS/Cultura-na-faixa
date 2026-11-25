// Tela provisória para as páginas que ainda não foram construídas.
import { Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';

export default function EmBreveScreen({ route, navigation }) {
  return (
    <SafeAreaView style={s.screen}>
      <Pressable onPress={() => navigation.goBack()} hitSlop={12} accessibilityLabel="Voltar">
        <Ionicons name="arrow-back" size={26} color={colors.purple} />
      </Pressable>
      <Text style={s.title}>{route.name}</Text>
      <Text style={s.text}>Esta tela chega nas próximas entregas.</Text>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white, padding: 24 },
  title: { fontFamily: fonts.title, fontSize: 28, color: colors.black, marginTop: 24 },
  text: { fontFamily: fonts.body, fontSize: 16, color: colors.black, marginTop: 12 },
});
