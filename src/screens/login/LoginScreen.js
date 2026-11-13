// src/screens/login/LoginScreen.js
// Tela "Entre na sua conta": e-mail, senha, entrar e link para redefinir a senha.
import { useState } from 'react';
import { Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts } from '../../theme';
import { useAuth } from '../../context/AuthContext';
import Field from '../../components/Field';
import Button from '../../components/Button';
import EsqueciSenhaModal from './EsqueciSenhaModal';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [forgot, setForgot] = useState(false);

  const entrar = () => {
    if (!login(email, senha)) setErro('E-mail ou senha incorretos. Confira e tente de novo.');
  };

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Image source={require('../../../assets/logo.png')} style={s.logo} accessibilityLabel="Cultura na Faixa" />
        <Text style={s.title}>Entre na sua conta</Text>

        <Field label="E-mail" placeholder="Seu e-mail" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <Field label="Senha" placeholder="Sua senha" secure showLabel value={senha} onChangeText={setSenha} style={{ marginBottom: 14 }} />

        <Pressable onPress={() => setForgot(true)} style={s.forgot}>
          <Text style={s.link}>Esqueci minha senha</Text>
        </Pressable>

        {erro ? <Text style={s.erro}>{erro}</Text> : null}
        <Button label="Entrar" onPress={entrar} style={{ marginTop: 28 }} />

        <Text style={s.signup}>
          Novo aqui? <Text style={s.signupLink}>Crie sua conta</Text>
        </Text>
        <Text style={s.footer}>A cidade é sua. A entrada é grátis.</Text>
      </ScrollView>

      <EsqueciSenhaModal visible={forgot} onClose={() => setForgot(false)} />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  content: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 48, paddingBottom: 24 },
  logo: { width: 302, height: 150, resizeMode: 'contain', alignSelf: 'center' },
  title: { fontFamily: fonts.title, fontSize: 24, color: colors.black, marginTop: 44, marginBottom: 28 },
  forgot: { alignSelf: 'flex-start' },
  link: { fontFamily: fonts.bold, fontSize: 14, color: colors.purple },
  erro: { fontFamily: fonts.body, fontSize: 14, color: colors.black, marginTop: 16 },
  signup: { textAlign: 'center', fontFamily: fonts.bold, fontSize: 14, color: colors.purple, marginTop: 44 },
  signupLink: { color: colors.green },
  footer: { textAlign: 'center', fontFamily: fonts.body, fontSize: 13, color: colors.black, marginTop: 'auto', paddingTop: 40 },
});
