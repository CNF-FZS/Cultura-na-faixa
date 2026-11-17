import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import ModalCard from '../../components/ModalCard';
import Field from '../../components/Field';
import Button from '../../components/Button';


import { colors, fonts } from '../../theme';
import { ROLE_LABEL } from '../../context/AuthContext';
const ROLES = ['usuario', 'expositor', 'administrador'];


export default function EditarPerfilModal({ visible, user, canEditRole = false, onSave, onClose }) {
  const [draft, setDraft] = useState({ phone: '', email: '', password: '', role: user.role });

  useEffect(() => {
    if (visible) {
      setDraft({ phone: user.phone, email: user.email, password: user.password, role: user.role });
    }
  }, [visible]);

  const set = (key) => (value) => setDraft((d) => ({ ...d, [key]: value }));

  const salvar = () => {
    const { role, ...resto } = draft;
    onSave(canEditRole ? draft : resto); // só envia o role quando permitido
  };

  return (
    <ModalCard visible={visible} onClose={onClose} icon="pencil-outline" title="Editar">
      <Field label="Telefone" value={draft.phone} onChangeText={set('phone')} keyboardType="phone-pad" />
      <Field label="E-mail" value={draft.email} onChangeText={set('email')} keyboardType="email-address" />
      <Field label="Senha" secure value={draft.password} onChangeText={set('password')} />

      {canEditRole && (
        <>
          <Text style={s.roleLabel}>Tipo de conta</Text>
          <View style={s.roleRow}>
            {ROLES.map((r) => (
              <Pressable
                key={r}
                style={[s.roleBtn, draft.role === r && s.roleBtnOn]}
                onPress={() => set('role')(r)}
              >
                <Text style={[s.roleText, draft.role === r && s.roleTextOn]}>{ROLE_LABEL[r]}</Text>
              </Pressable>
            ))}
          </View>
        </>
      )}

      <Button label="Salvar" onPress={salvar} style={{ marginTop: 8 }} />
      <Button label="Cancelar" variant="outline" onPress={onClose} style={{ marginTop: 12 }} />
    </ModalCard>
  );
}

const s = StyleSheet.create({
  roleLabel: { fontFamily: fonts.bold, fontSize: 14, color: colors.black, marginTop: 8, marginBottom: 8 },
  roleRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  roleBtn: { flex: 1, alignItems: 'center', paddingVertical: 12, paddingHorizontal: 4, borderWidth: 1, borderColor: colors.green },
  roleBtnOn: { backgroundColor: colors.purple, borderColor: colors.purple },
  roleText: { fontFamily: fonts.body, fontSize: 13, color: colors.black },
  roleTextOn: { fontFamily: fonts.bold, color: colors.white },
});