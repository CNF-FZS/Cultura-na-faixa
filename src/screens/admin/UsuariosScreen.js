// src/screens/admin/UsuariosScreen.js
// "Usuários" (administrador): totais, busca, lista de pessoas e ações de cadastrar, editar e remover.
import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../../theme';
import { useAuth, ROLE_LABEL, initials } from '../../context/AuthContext';
import { norm } from '../busca/filterEvents';
import SearchBar from '../busca/SearchBar';
import Header from '../../components/Header';
import Button from '../../components/Button';
import EditarPerfilModal from '../perfil/EditarPerfilModal';
import RemoverUsuarioModal from './RemoverUsuarioModal';

export default function UsuariosScreen({ navigation }) {
  const { user, users, updateUser, removeUser } = useAuth();
  const [q, setQ] = useState('');
  const [remover, setRemover] = useState(null);
  const [editar, setEditar] = useState(null);
  const lista = users.filter((u) => norm(`${u.name} ${u.email}`).includes(norm(q.trim())));
  const nExp = users.filter((u) => u.role === 'expositor').length;

  return (
    <SafeAreaView style={s.screen} edges={['top']}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {/* BOTÃO VOLTAR
        <Pressable style={s.back} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.purple} />
          <Text style={s.backText}>Voltar</Text>
        </Pressable> */}

        {/* <Header label="Administrador" /> */}
        
        <Header
          label="Administrador"
          title="Usuários"
          onBack={() => navigation.goBack()}
        />

        {/* <Text style={s.title}>Usuários</Text> */}
        <Text style={s.sub}>Pessoas que fazem parte do Cultura na Faixa.</Text>

        <View style={s.stats}>
          <View><Text style={s.num}>{users.length}</Text><Text style={s.lbl}>Pessoas cadastradas</Text></View>
          <View><Text style={s.num}>{nExp}</Text><Text style={s.lbl}>{nExp === 1 ? 'Expositor' : 'Expositores'}</Text></View>
        </View>

        <Button label="Cadastrar usuário" icon="add" onPress={() => navigation.navigate('Cadastro')} />
        <View style={{ height: 16 }} />
        <SearchBar placeholder="Pesquisar por nome ou e-mail" value={q} onChangeText={setQ} />
        <Text style={s.count}>Todos os usuários · {lista.length}</Text>

        {lista.map((u) => (
          <View key={u.id} style={s.card}>
            <View style={s.row}>
              <Text style={s.ini}>{initials(u.name)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.name}>{u.name}</Text>
                <Text style={s.small}>{u.email}</Text>
              </View>
            </View>
            <View style={[s.rowBetween, { marginTop: 14 }]}>
              <Text style={s.role}>{ROLE_LABEL[u.role]}</Text>
              <Text style={s.small}>Desde {u.since}</Text>
            </View>
            <View style={s.divider} />
            <View style={s.rowBetween}>
              <Pressable style={s.action} onPress={() => setEditar(u)}>
                <Ionicons name="pencil-outline" size={20} color={colors.purple} />
                <Text style={s.actionText}>Editar</Text>
              </Pressable>
              {u.id !== user.id && (
                <Pressable style={s.action} onPress={() => setRemover(u)}>
                  <Ionicons name="trash-outline" size={20} color={colors.purple} />
                  <Text style={s.actionText}>Remover</Text>
                </Pressable>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* <EditarPerfilModal
        visible={!!editar}
        user={editar ?? { phone: '', email: '', password: '' }}
        onClose={() => setEditar(null)}
        onSave={(dados) => { updateUser(dados, editar.id); setEditar(null); }}
      /> */}

      {/* EDITAR PERFIL COMO ADMIN OU EXPO - alteração junto com o arquivo AuthContext.js na pasta context  */}
      <EditarPerfilModal
        visible={!!editar}
        user={editar ?? { phone: '', email: '', password: '', role: 'expositor' }}
        canEditRole={editar?.id !== user.id}
        onClose={() => setEditar(null)}
        onSave={(dados) => { updateUser(dados, editar.id); setEditar(null); }}
      />

      <RemoverUsuarioModal user={remover} onClose={() => setRemover(null)} onConfirm={() => { removeUser(remover.id); setRemover(null); }} />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 },
  title: { fontFamily: fonts.title, fontSize: 28, color: colors.black, marginTop: 8 },
  sub: { fontFamily: fonts.body, fontSize: 15, color: colors.black, marginTop: 14 },
  stats: { flexDirection: 'row', gap: 64, paddingHorizontal: 16, marginVertical: 28 },
  num: { fontFamily: fonts.title, fontSize: 34, color: colors.purple },
  lbl: { fontFamily: fonts.body, fontSize: 13, color: colors.purple, marginTop: 4 },
  count: { fontFamily: fonts.body, fontSize: 14, color: colors.black, marginTop: 18, marginBottom: 16 },
  card: { borderWidth: 1, borderColor: colors.green, padding: 14, marginBottom: 20 },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ini: { width: 36, fontFamily: fonts.title, fontSize: 14, color: colors.purple, marginRight: 14 },
  name: { fontFamily: fonts.body, fontSize: 20, color: colors.black },
  small: { fontFamily: fonts.body, fontSize: 12, color: colors.black, marginTop: 2 },
  role: { fontFamily: fonts.bold, fontSize: 13, color: colors.purple, marginLeft: 12 },
  divider: { height: 1, backgroundColor: colors.black + '66', marginVertical: 12 },
  action: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
  actionText: { fontFamily: fonts.bold, fontSize: 14, color: colors.purple, marginLeft: 8 },
});
