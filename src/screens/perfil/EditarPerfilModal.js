import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import ModalCard from '../../components/ModalCard';
import Field from '../../components/Field';
import Button from '../../components/Button';

import { colors, fonts } from '../../theme';
import { ROLE_LABEL } from '../../context/AuthContext';

const ROLES = ['usuario', 'expositor', 'administrador'];

export default function EditarPerfilModal({
  visible,
  user,
  canEditRole = false,
  askCurrentPassword = true,
  roleOnly = false,
  onSave,
  onClose
}) {
  const [draft, setDraft] = useState({
    phone: '',
    email: '',
    atual: '',
    nova: '',
    role: user.role
  });

  const [erroAtual, setErroAtual] = useState(false);
  const [erroNova, setErroNova] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (visible) {
      setDraft({
        phone: user.phone ?? '',
        email: user.email ?? '',
        atual: '',
        nova: '',
        role: user.role
      });

      setErroAtual(false);
      setErroNova(false);
      setMsg('');
    }
  }, [visible, user]);

  const set = (key) => (value) => {
    setDraft((d) => ({ ...d, [key]: value }));
  };

  const salvar = () => {
    // Administração: envia somente o tipo de conta.
    if (roleOnly) {
      if (canEditRole) {
        onSave({ role: draft.role });
      }
      return;
    }

    const { role, atual, nova, ...resto } = draft;

    if (askCurrentPassword && (atual || nova) && atual !== user.password) {
      setErroAtual(true);
      setMsg('Senha atual incorreta.');
      return;
    }

    if (
      nova &&
      (nova.length < 8 || !/[A-Za-z]/.test(nova) || !/\d/.test(nova))
    ) {
      setErroNova(true);
      setMsg('A nova senha precisa ter pelo menos 8 caracteres, com letras e números.');
      return;
    }

    const dados = nova
      ? { ...resto, password: nova }
      : resto;

    onSave(canEditRole ? { ...dados, role } : dados);
  };

  return (
    <ModalCard
      visible={visible}
      onClose={onClose}
      icon="pencil-outline"
      title="Editar"
    >
      {!roleOnly && (
        <>
          <Field
            label="Telefone"
            value={draft.phone}
            onChangeText={set('phone')}
            keyboardType="phone-pad"
          />

          <Field
            label="E-mail"
            value={draft.email}
            onChangeText={set('email')}
            keyboardType="email-address"
          />

          {askCurrentPassword && (
            <Field
              label="Senha atual"
              secure
              placeholder="Digite sua senha atual"
              value={draft.atual}
              onChangeText={(v) => {
                set('atual')(v);
                setErroAtual(false);
                setMsg('');
              }}
              error={erroAtual}
            />
          )}

          <Field
            label="Nova senha"
            secure
            placeholder="Digite a nova senha"
            value={draft.nova}
            onChangeText={(v) => {
              set('nova')(v);
              setErroNova(false);
              setMsg('');
            }}
            error={erroNova}
          />

          {msg ? <Text style={s.erro}>{msg}</Text> : null}
        </>
      )}

      {canEditRole && (
        <>
          <Text style={s.roleLabel}>Tipo de conta</Text>

          <View style={s.roleRow}>
            {ROLES.map((r) => (
              <Pressable
                key={r}
                style={[
                  s.roleBtn,
                  draft.role === r && s.roleBtnOn
                ]}
                onPress={() => set('role')(r)}
              >
                <Text
                  style={[
                    s.roleText,
                    draft.role === r && s.roleTextOn
                  ]}
                >
                  {ROLE_LABEL[r]}
                </Text>
              </Pressable>
            ))}
          </View>
        </>
      )}

      <Button
        label="Salvar"
        onPress={salvar}
        style={{ marginTop: 8 }}
      />

      <Button
        label="Cancelar"
        variant="outline"
        onPress={onClose}
        style={{ marginTop: 12 }}
      />
    </ModalCard>
  );
}

const s = StyleSheet.create({
  roleLabel: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.black,
    marginTop: 8,
    marginBottom: 8
  },
  roleRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8
  },
  roleBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.green
  },
  roleBtnOn: {
    backgroundColor: colors.purple,
    borderColor: colors.purple
  },
  roleText: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.black
  },
  roleTextOn: {
    fontFamily: fonts.bold,
    color: colors.white
  },
  erro: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: '#D32F2F',
    marginBottom: 12
  }
});
