// Caixa branca centralizada sobre fundo roxo translúcido. Base dos modais (Editar, Redefinir senha...).
import { Modal, View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';

export default function ModalCard({ visible, onClose, icon, title, children }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={s.overlay}>
        <ScrollView contentContainerStyle={s.center} keyboardShouldPersistTaps="handled">
          <View style={s.card}>
            {icon ? <Ionicons name={icon} size={28} color={colors.purple} /> : null}
            <Text style={s.title}>{title}</Text>
            {children}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(50, 20, 112, 0.5)' },
  center: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  card: { backgroundColor: colors.white, padding: 24 },
  title: { fontFamily: fonts.title, fontSize: 26, color: colors.black, marginTop: 12, marginBottom: 12 },
});
