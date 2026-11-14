// src/screens/admin/RemoverUsuarioModal.js
// Modal "Remover usuário?": mostra a pessoa e pede confirmação antes de remover.
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';
import { ROLE_LABEL, initials } from '../../context/AuthContext';
import ModalCard from '../../components/ModalCard';
import Button from '../../components/Button';

export default function RemoverUsuarioModal({ user, onClose, onConfirm }) {
  return (
    <ModalCard visible={!!user} onClose={onClose} icon="person-remove-outline" title="Remover usuário?">
      <Text style={s.text}>
        {user?.name.split(' ')[0]} perderá o acesso à plataforma e sua lista de favoritos será removida. Esta ação não pode ser desfeita.
      </Text>
      {user && (
        <View style={s.item}>
          <Text style={s.ini}>{initials(user.name)}</Text>
          <View style={{ flex: 1 }}>
            <Text style={s.name}>{user.name}</Text>
            <Text style={s.small}>{user.email}</Text>
            <Text style={s.role}>{ROLE_LABEL[user.role]} · Desde {user.since}</Text>
          </View>
        </View>
      )}
      <Button label="Cancelar" variant="outline" onPress={onClose} />
      <Button label="Remover usuário" onPress={onConfirm} style={{ marginTop: 12 }} />
    </ModalCard>
  );
}

const s = StyleSheet.create({
  text: { fontFamily: fonts.body, fontSize: 15, lineHeight: 22, color: colors.black },
  item: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, marginVertical: 24 },
  ini: { width: 44, fontFamily: fonts.title, fontSize: 14, color: colors.purple, marginRight: 12 },
  name: { fontFamily: fonts.body, fontSize: 17, color: colors.black },
  small: { fontFamily: fonts.body, fontSize: 12, color: colors.black, marginTop: 4 },
  role: { fontFamily: fonts.body, fontSize: 12, color: colors.purple, marginTop: 4 },
});
