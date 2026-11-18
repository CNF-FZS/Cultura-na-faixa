// src/screens/perfil/PerfilScreen.js
// Aba Perfil: dados da conta e botões extras conforme o tipo (usuário, expositor ou administrador).
import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // import do ícone de cadeado
import { colors, fonts } from '../../theme';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import LoginPrompt from '../../components/LoginPrompt';
import Field from '../../components/Field';
import Button from '../../components/Button';
import EditarPerfilModal from './EditarPerfilModal';


const ROLES = {
  usuario: { label: 'Usuário', edit: 'Editar', links: [] },
  expositor: { label: 'Expositor', edit: 'Editar perfil', links: [['Área de Eventos', 'AreaEventos']] },
  administrador: {
    label: 'Administrador',
    edit: 'Editar perfil',
    links: [['Área de Eventos', 'AreaEventos'], ['Usuários', 'Usuarios'], ['Relatórios', 'Relatorios']],
  },
};

export default function PerfilScreen({ navigation }) {
  const { user, logout, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  if (!user) return <LoginPrompt title="Entre na sua conta" text="Para ver e editar seu perfil, entre ou crie uma conta gratuita." />;
  const role = ROLES[user.role];

  return (
    <SafeAreaView style={s.screen} edges={['top']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Header label={role.label} />

        <View style={s.identity}>
          <View style={s.avatar} />
          <Text style={s.name}>{user.displayName}</Text>
        </View>

        <Text style={s.section}>Dados pessoais</Text>
        <Field label="Nome" value={user.name} editable={false} />
        <Field label="Telefone" value={user.phone} editable={false} />
        <Field label="E-mail" value={user.email} editable={false} />
        <View style={s.pwWrap}>
          <Text style={s.pwLabel}>Senha</Text>
          <View style={s.pwBox}>
            <Text style={s.pwValue}>••••••••</Text>
            <Ionicons name="lock-closed-outline" size={20} color={colors.black + '66'} />
          </View>
        </View>

        <Button label={role.edit} onPress={() => setEditing(true)} style={{ marginTop: 8 }} />
        {role.links.map(([label, route]) => (
          <Button key={route} label={label} onPress={() => navigation.navigate(route)} style={{ marginTop: 20 }} />
        ))}

        {/* Não existe no Figma: serve para trocar de conta durante os testes. */}
        <Pressable onPress={logout} style={s.logout}>
          <Text style={s.logoutText}>Sair da conta</Text>
        </Pressable>
      </ScrollView>

      <EditarPerfilModal
        visible={editing}
        user={user}
        onClose={() => setEditing(false)}
        onSave={(dados) => {
          updateUser(dados);
          setEditing(false);
        }}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 },
  identity: { flexDirection: 'row', alignItems: 'center', marginTop: 24 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: colors.purple },
  name: { flex: 1, marginLeft: 36, fontFamily: fonts.title, fontSize: 28, color: colors.black },
  section: { fontFamily: fonts.title, fontSize: 22, color: colors.black, marginTop: 36, marginBottom: 20 },
  logout: { alignItems: 'center', padding: 16, marginTop: 8 },
  logoutText: { fontFamily: fonts.bold, fontSize: 14, color: colors.purple },
  // ALTERAÇÃO (SENHA): estilos do campo de senha bloqueado (mesmas medidas do Field, em cinza)
  pwWrap: { marginBottom: 20 },
  pwLabel: { fontFamily: fonts.bold, fontSize: 13, color: colors.black, marginBottom: 8 },
  pwBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 52, paddingHorizontal: 14, borderWidth: 1, borderColor: colors.black + '33', backgroundColor: '#F0F0F0' },
  pwValue: { fontFamily: fonts.body, fontSize: 15, color: colors.black + '80', letterSpacing: 2 },
});