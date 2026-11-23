// Aviso para visitantes (Favoritos e Perfil), com botões para entrar ou criar conta.
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts } from '../theme';
import Button from './Button';

export default function LoginPrompt({ title, text }) {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={s.screen} edges={['top']}>
      <Ionicons name="person-circle-outline" size={72} color={colors.purple} />
      <Text style={s.title}>{title}</Text>
      <Text style={s.text}>{text}</Text>
      <Button label="Entrar" onPress={() => navigation.navigate('Login')} style={{ alignSelf: 'stretch' }} />
      <Button label="Criar conta" variant="outline" onPress={() => navigation.navigate('Cadastro', { self: true })} style={{ alignSelf: 'stretch', marginTop: 12 }} />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white, padding: 24, justifyContent: 'center', alignItems: 'center' },
  title: { fontFamily: fonts.title, fontSize: 24, color: colors.black, marginTop: 12, textAlign: 'center' },
  text: { fontFamily: fonts.body, fontSize: 15, lineHeight: 22, color: colors.black, textAlign: 'center', marginVertical: 20 },
});
