// Linha de filtros por categoria da tela inicial.
import { ScrollView, StyleSheet } from 'react-native';
import { FILTERS } from '../data/events';
import Chip from './Chip';

export default function Filters({ active, onChange }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filters}>
      {FILTERS.map((f) => (
        <Chip key={f} label={f} selected={f === active} onPress={() => onChange(f)} style={s.chip} />
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  filters: { flexGrow: 0, marginBottom: 20 },
  chip: { marginRight: 10 },
});
