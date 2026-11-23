// Campo de busca com botão de limpar e botão que abre os filtros.
import { View, TextInput, Pressable, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../../theme';

export default function SearchBar({ value, onChangeText, onOpenFilters, placeholder = 'Digite para buscar' }) {
  return (
    <View style={s.box}>
      <Ionicons name="search-outline" size={24} color={colors.purple} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.black + '99'}
        returnKeyType="search"
        accessibilityLabel="Buscar eventos"
        style={s.input}
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText('')} hitSlop={10} style={s.clear} accessibilityLabel="Limpar busca">
          <Ionicons name="close" size={22} color={colors.black} />
        </Pressable>
      )}
      {onOpenFilters && <Pressable onPress={onOpenFilters} style={s.filterBtn} accessibilityRole="button" accessibilityLabel="Abrir filtros">
        <Ionicons name="options-outline" size={24} color={colors.white} />
      </Pressable>}
    </View>
  );
}

const s = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingLeft: 14,
    paddingRight: 12,
    borderWidth: 1,
    borderColor: colors.green,
    backgroundColor: colors.white,
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.black,
    ...Platform.select({ web: { outlineStyle: 'none' } }),
  },
  clear: { marginRight: 14 },
  filterBtn: {
    width: 45,
    height: 42,
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
