// src/components/Header.js
// Topo das telas: logo, tipo de conta à direita e (opcional) seta de voltar com título.
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';

export default function Header({ label, title, onBack }) {
  return (
    <View>
      <View style={s.row}>
        <Image source={require('../../assets/logo.png')} style={s.logo} accessibilityLabel="Cultura na Faixa" />
        {label ? <Text style={s.label}>{label}</Text> : null}
      </View>
      {title ? (
        <View style={s.titleRow}>
          {onBack && (
            <Pressable onPress={onBack} hitSlop={12} accessibilityLabel="Voltar">
              <Ionicons name="arrow-back" size={26} color={colors.purple} />
            </Pressable>
          )}
          <Text style={[s.title, onBack && { marginLeft: 12 }]}>{title}</Text>
        </View>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { width: 141, height: 70, resizeMode: 'contain' },
  label: { fontFamily: fonts.bold, fontSize: 13, color: colors.purple },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12, marginBottom: 8 },
  title: { fontFamily: fonts.title, fontSize: 28, color: colors.black },
});
