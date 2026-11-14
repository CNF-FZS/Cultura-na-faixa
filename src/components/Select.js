// src/components/Select.js
// Lista suspensa: tocar no campo abre as opções logo abaixo. Opções: textos ou { value, label }.
import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';

export default function Select({ label, value, options, placeholder, helper, onChange, style }) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => (o.value ?? o) === value);
  const text = current ? current.label ?? current : null;

  return (
    <View style={[s.wrap, style]}>
      {label ? <Text style={s.label}>{label}</Text> : null}
      <Pressable onPress={() => setOpen((o) => !o)} style={s.box} accessibilityRole="button">
        <Text style={[s.value, !text && { color: colors.black + '99' }]}>{text ?? placeholder}</Text>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={20} color={colors.black} />
      </Pressable>
      {open &&
        options.map((o) => {
          const v = o.value ?? o;
          const on = v === value;
          return (
            <Pressable key={v} onPress={() => { onChange(v); setOpen(false); }} style={[s.opt, on && s.optOn]}>
              <Text style={[s.optText, on && { color: colors.white }]}>{o.label ?? o}</Text>
            </Pressable>
          );
        })}
      {helper ? <Text style={s.helper}>{helper}</Text> : null}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { marginBottom: 20 },
  label: { fontFamily: fonts.bold, fontSize: 13, color: colors.black, marginBottom: 8 },
  box: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 52, paddingHorizontal: 14, borderWidth: 1, borderColor: colors.green, backgroundColor: colors.white },
  value: { fontFamily: fonts.body, fontSize: 15, color: colors.black },
  opt: { padding: 14, borderWidth: 1, borderTopWidth: 0, borderColor: colors.green },
  optOn: { backgroundColor: colors.purple },
  optText: { fontFamily: fonts.body, fontSize: 15, color: colors.black },
  helper: { fontFamily: fonts.body, fontSize: 13, color: colors.black, marginTop: 8 },
});
