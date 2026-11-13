// src/components/Button.js
// Botão largo do app: roxo (primary) ou com borda verde (outline), com ícone opcional.
import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';

export default function Button({ label, onPress, variant = 'primary', icon, disabled, style }) {
  const primary = variant === 'primary';
  const color = primary ? colors.white : colors.black;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={[s.btn, primary ? s.primary : s.outline, disabled && { opacity: 0.5 }, style]}
    >
      <Text style={[s.text, { color }]}>{label}</Text>
      {icon ? <Ionicons name={icon} size={20} color={color} style={{ marginLeft: 10 }} /> : null}
    </Pressable>
  );
}

const s = StyleSheet.create({
  btn: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  primary: { backgroundColor: colors.purple },
  outline: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.green },
  text: { fontFamily: fonts.body, fontSize: 16 },
});
