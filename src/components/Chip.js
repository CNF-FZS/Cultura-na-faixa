// Botão de filtro: texto roxo, fundo roxo quando selecionado.
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';

export default function Chip({ label, selected = false, onPress, style, accessibilityLabel }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ selected }}
      style={[s.chip, selected && s.on, style]}
    >
      <Text style={[s.text, selected && { color: colors.white }]}>{label}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  chip: { paddingHorizontal: 12, paddingVertical: 9 },
  on: { backgroundColor: colors.purple },
  text: { fontFamily: fonts.bold, fontSize: 14, color: colors.purple },
});
