// src/components/Header.js
// Topo das telas internas: logo à esquerda e o tipo de conta (Usuário, Expositor...) à direita.
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';

export default function Header({ label }) {
  return (
    <View style={s.row}>
      <Image source={require('../../assets/logo.png')} style={s.logo} accessibilityLabel="Cultura na Faixa" />
      {label ? <Text style={s.label}>{label}</Text> : null}
    </View>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { width: 141, height: 70, resizeMode: 'contain' },
  label: { fontFamily: fonts.bold, fontSize: 13, color: colors.purple },
});
