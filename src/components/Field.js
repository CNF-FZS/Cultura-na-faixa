// src/components/Field.js
// Campo de texto com rótulo, texto de ajuda e (para senha) botão de mostrar/ocultar.
import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';

export default function Field({ label, helper, right, secure = false, showLabel = false, style, ...input }) {
  const [hidden, setHidden] = useState(secure);
  const big = !!input.multiline; // campo de texto longo
  // Com o texto "Mostrar" (login) o ícone mostra a ação; sem ele, mostra o estado.
  const icon = hidden === showLabel ? 'eye-outline' : 'eye-off-outline';

  return (
    <View style={[s.wrap, style]}>
      {label ? <Text style={s.label}>{label}</Text> : null}
      <View style={[s.box, big && s.boxBig]}>
        <TextInput
          autoCapitalize="none"
          placeholderTextColor={colors.black + '99'}
          {...input}
          secureTextEntry={hidden}
          style={[s.input, big && s.inputBig]}
        />
        {right ? <Ionicons name={right} size={20} color={colors.black} /> : null}
        {secure && (
          <Pressable
            onPress={() => setHidden((h) => !h)}
            hitSlop={10}
            style={s.eye}
            accessibilityLabel={hidden ? 'Mostrar senha' : 'Ocultar senha'}
          >
            <Ionicons name={icon} size={22} color={showLabel ? colors.purple : colors.black} />
            {showLabel && <Text style={s.eyeText}>{hidden ? 'Mostrar' : 'Ocultar'}</Text>}
          </Pressable>
        )}
      </View>
      {helper ? <Text style={s.helper}>{helper}</Text> : null}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { marginBottom: 20 },
  label: { fontFamily: fonts.bold, fontSize: 13, color: colors.black, marginBottom: 8 },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.green,
    backgroundColor: colors.white,
  },
  input: {
    flex: 1,
    height: 50,
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.black,
    ...Platform.select({ web: { outlineStyle: 'none' } }),
  },
  boxBig: { height: 'auto', minHeight: 110, alignItems: 'flex-start', paddingVertical: 12 },
  inputBig: { height: 'auto', minHeight: 84, textAlignVertical: 'top' },
  eye: { flexDirection: 'row', alignItems: 'center', marginLeft: 8 },
  eyeText: { fontFamily: fonts.bold, fontSize: 12, color: colors.purple, marginLeft: 6 },
  helper: { fontFamily: fonts.body, fontSize: 13, color: colors.black, marginTop: 8 },
});
