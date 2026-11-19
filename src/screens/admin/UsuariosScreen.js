
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

const plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`;

export default function UsuariosScreen({ navigation }) {
  const { user, users, updateUser, removeUser } = useAuth();

  const [q, setQ] = useState('');
  const [remover, setRemover] = useState(null);
  const [editar, setEditar] = useState(null);

  // Busca de usuários.
  const lista = users.filter((u) =>
    norm(`${u.name} ${u.email}`).includes(norm(q.trim()))
  );

  // Quantidade de pessoas por tipo de conta.
  const nUsuarios = users.filter((u) => u.role === 'usuario').length;
  const nExpositores = users.filter((u) => u.role === 'expositor').length;
  const nAdministradores = users.filter((u) => u.role === 'administrador').length;

  const tipos = [
    { label: 'Usuários', quantidade: nUsuarios },
    { label: 'Expositores', quantidade: nExpositores },
    { label: 'Administradores', quantidade: nAdministradores },
  ];

  const maior = Math.max(1, ...tipos.map((tipo) => tipo.quantidade));

  return (
    <SafeAreaView style={s.screen} edges={['top']}>
      <ScrollView
        contentContainerStyle={s.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Header
          label="Administrador"
          title="Usuários"
          onBack={() => navigation.goBack()}
        />

        <Text style={s.sub}>
          Pessoas que fazem parte do Cultura na Faixa.
        </Text>

        {/* TOTAL DE PESSOAS CADASTRADAS */}
        <View style={s.big}>
          <Text style={s.bigNum}>{users.length}</Text>
          <Text style={s.bigLbl}>Total de pessoas cadastradas</Text>
        </View>

        {/* CADASTROS POR TIPO DE CONTA */}
        <View style={[s.card, { padding: 16 }]}>
          <Text style={s.h}>Cadastros por tipo de conta</Text>

          <Text style={[s.small, { marginBottom: 14 }]}>
            Quantidade · {plural(users.length, 'pessoa cadastrada', 'pessoas cadastradas')}
          </Text>

          {tipos.map((tipo) => (
            <View key={tipo.label} style={{ marginBottom: 14 }}>
              <View style={s.row}>
                <Text style={[s.bold, { width: 112 }]}>
                  {tipo.label}
                </Text>

                <View style={s.track}>
                  <View
                    style={[
                      s.bar,
                      {
                        width: `${(tipo.quantidade / maior) * 100}%`,
                      },
                    ]}
                  />
                </View>

                <Text style={s.count}>{tipo.quantidade}</Text>
              </View>
            </View>
          ))}
        </View>

        <Button
          label="Cadastrar usuário"
          icon="add"
          onPress={() => navigation.navigate('Cadastro')}
        />

        <View style={{ height: 16 }} />

        <SearchBar
          placeholder="Pesquisar por nome ou e-mail"
          value={q}
          onChangeText={setQ}
        />

        <Text style={s.listCount}>
          Todos os usuários · {lista.length}
        </Text>

        {/* LISTA DE USUÁRIOS */}
        {lista.map((u) => (
          <View key={u.id} style={s.userCard}>
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
              <Pressable
                style={s.action}
                onPress={() => setEditar(u)}
              >
                <Ionicons
                  name="pencil-outline"
                  size={20}
                  color={colors.purple}
                />
                <Text style={s.actionText}>Editar</Text>
              </Pressable>

              {u.id !== user.id && (
                <Pressable
                  style={s.action}
                  onPress={() => setRemover(u)}
                >
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color={colors.purple}
                  />
                  <Text style={s.actionText}>Remover</Text>
                </Pressable>
              )}
            </View>
          </View>
        ))}

        {lista.length === 0 && (
          <Text style={s.empty}>
            Nenhum usuário encontrado.
          </Text>
        )}
      </ScrollView>

      {/* EDIÇÃO DE USUÁRIO */}
      <EditarPerfilModal
        visible={!!editar}
        user={editar ?? {
          phone: '',
          email: '',
          password: '',
          role: 'usuario',
        }}
        canEditRole={user.role === 'administrador' && editar?.id !== user.id}
        askCurrentPassword={editar?.id === user.id}
        roleOnly={user.role === 'administrador' && editar?.id !== user.id}
        onClose={() => setEditar(null)}
        onSave={(dados) => {
          updateUser(dados, editar.id);
          setEditar(null);
        }}
      />

      {/* REMOÇÃO DE USUÁRIO */}
      <RemoverUsuarioModal
        user={remover}
        onClose={() => setRemover(null)}
        onConfirm={() => {
          removeUser(remover.id);
          setRemover(null);
        }}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },

  sub: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.black,
    marginTop: 14,
  },

  big: {
    backgroundColor: colors.purple,
    alignItems: 'center',
    paddingVertical: 24,
    marginVertical: 20,
  },

  bigNum: {
    fontFamily: fonts.title,
    fontSize: 40,
    color: colors.white,
  },

  bigLbl: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.white,
  },

  card: {
    borderWidth: 1,
    borderColor: colors.green,
    padding: 14,
    marginBottom: 20,
  },

  h: {
    fontFamily: fonts.title,
    fontSize: 20,
    color: colors.black,
  },

  bold: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.black,
  },

  small: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.black,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  track: {
    flex: 1,
    height: 14,
  },

  bar: {
    height: 14,
    backgroundColor: colors.purple,
  },

  count: {
    width: 28,
    textAlign: 'right',
    fontFamily: fonts.title,
    fontSize: 20,
    color: colors.purple,
  },

  listCount: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.black,
    marginTop: 18,
    marginBottom: 16,
  },

  userCard: {
    borderWidth: 1,
    borderColor: colors.green,
    padding: 14,
    marginBottom: 20,
  },

  ini: {
    width: 36,
    fontFamily: fonts.title,
    fontSize: 14,
    color: colors.purple,
    marginRight: 14,
  },

  name: {
    fontFamily: fonts.body,
    fontSize: 20,
    color: colors.black,
  },

  role: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.purple,
    marginLeft: 12,
  },

  divider: {
    height: 1,
    backgroundColor: colors.black + '66',
    marginVertical: 12,
  },

  action: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },

  actionText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.purple,
    marginLeft: 8,
  },

  empty: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.black,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});
