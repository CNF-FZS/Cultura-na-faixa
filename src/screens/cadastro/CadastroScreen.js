// src/screens/cadastro/CadastroScreen.js
// Tela "Cadastrar": cria uma conta. Vinda do Login (self) cria um leitor; vinda de Usuários, o admin escolhe o perfil.
import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts } from '../../theme';
import { useAuth, ROLE_LABEL } from '../../context/AuthContext';
import Header from '../../components/Header';
import Field from '../../components/Field';
import Select from '../../components/Select';
import Button from '../../components/Button';

const PERFIS = Object.entries(ROLE_LABEL).map(([value, label]) => ({ value, label }));

export default function CadastroScreen({ route, navigation }) {
  const self = !!route.params?.self;
  const { users, register } = useAuth();
  const [f, setF] = useState({ role: self ? 'usuario' : '', name: '', phone: '', email: '', password: '', confirm: '' });
  const [erro, setErro] = useState('');
  const set = (k) => (v) => setF((x) => ({ ...x, [k]: v }));

  const salvar = () => {
    const email = f.email.trim().toLowerCase();
    if (!f.role || !f.name.trim() || !email || !f.password) return setErro('Preencha todos os campos obrigatórios (*).');
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErro('Confira o e-mail digitado.');
    if (f.password.length < 8 || !/[A-Za-z]/.test(f.password) || !/\d/.test(f.password))
      return setErro('A senha precisa ter pelo menos 8 caracteres, com letras e números.');
    if (f.password !== f.confirm) return setErro('As senhas não são iguais.');
    if (users.some((u) => u.email === email)) return setErro('Já existe uma conta com esse e-mail.');
    register({ role: f.role, name: f.name.trim(), phone: f.phone, email, password: f.password }, self);
    self ? navigation.navigate('Tabs') : navigation.goBack();
  };

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Header title="Cadastrar" onBack={() => navigation.goBack()} />
        <View style={s.intro}>
          <Text style={s.i1}>Novo cadastro no Cultura na Faixa</Text>
          <Text style={s.i2}>Campos com * são obrigatórios. Confira o e-mail antes de salvar.</Text>
        </View>

        {!self && <Select label="Perfil *" value={f.role} options={PERFIS} placeholder="Selecione o perfil" onChange={set('role')} />}

        <Text style={s.h}>Dados pessoais</Text>
        <Field label="Nome *" placeholder="Nome" value={f.name} onChangeText={set('name')} autoCapitalize="words" />
        <Field label="Telefone" placeholder="(11) 90000-0000" helper="Opcional. Inclua o DDD." value={f.phone} onChangeText={set('phone')} keyboardType="phone-pad" />
        <Field label="E-mail *" placeholder="nome@exemplo.com" value={f.email} onChangeText={set('email')} keyboardType="email-address" />
        <Field label="Senha *" placeholder="Crie uma senha" secure helper="Use pelo menos 8 caracteres, com letras e números." value={f.password} onChangeText={set('password')} />
        <Field label="Confirmar senha *" placeholder="Repita a senha" secure value={f.confirm} onChangeText={set('confirm')} />

        {erro ? <Text style={s.erro}>{erro}</Text> : null}
        <Button label="Cadastrar" onPress={salvar} style={{ marginTop: 20 }} />
        <Button label="Cancelar e voltar" variant="outline" onPress={() => navigation.goBack()} style={{ marginTop: 12 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 },
  intro: { paddingHorizontal: 16, marginVertical: 20 },
  i1: { fontFamily: fonts.body, fontSize: 15, color: colors.purple, marginBottom: 6 },
  i2: { fontFamily: fonts.body, fontSize: 13, lineHeight: 19, color: colors.purple },
  h: { fontFamily: fonts.title, fontSize: 22, color: colors.black, marginVertical: 14 },
  erro: { fontFamily: fonts.bold, fontSize: 14, color: colors.black },
});
