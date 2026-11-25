// Tela "Filtre seu evento" (quando, região, categoria), aberta como modal.
import { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../../theme';
import { REGIONS, CATEGORIES, WHEN } from '../../data/events';
import Chip from '../../components/Chip';
import { DEFAULT_FILTERS } from './filterEvents';

function Group({ title, icon, options, value, onSelect, helper }) {
  return (
    <View>
      <View style={s.groupHead}>
        {icon && (
          <Ionicons
            name={icon}
            size={24}
            color={colors.black}
            style={{ marginRight: 10 }}
          />
        )}

        <Text style={s.groupTitle}>{title}</Text>
      </View>

      <View style={s.wrap}>
        {options.map((o) => {
          const selected =
            o === 'Todas' ? value.length === 0 : value.includes(o);

          return (
            <Chip
              key={o}
              label={o}
              selected={selected}
              onPress={() => onSelect(o)}
              style={s.chip}
            />
          );
        })}
      </View>

      {helper ? <Text style={s.helper}>{helper}</Text> : null}
    </View>
  );
}

export default function FiltrosModal({
  visible,
  filters,
  onApply,
  onClose,
  onClear,
}) {
  // Rascunho: só vale quando a pessoa toca em "Aplicar filtros".
  const [draft, setDraft] = useState(filters);

  useEffect(() => {
    if (visible) {
      setDraft(filters);
    }
  }, [visible, filters]);

  // Permite selecionar e desmarcar várias opções.
  const pick = (key) => (value) => {
    setDraft((d) => {
      const current = d[key] || [];

      // "Todas" limpa as seleções daquele grupo.
      if (value === 'Todas') {
        return { ...d, [key]: [] };
      }

      // Se a opção já estiver selecionada, desmarca.
      if (current.includes(value)) {
        return {
          ...d,
          [key]: current.filter((item) => item !== value),
        };
      }

      // Caso contrário, adiciona à seleção.
      return {
        ...d,
        [key]: [...current.filter((item) => item !== 'Todas'), value],
      };
    });
  };

  const whenHelper =
    draft.when.length > 0
      ? draft.when.map((period) => WHEN[period].helper).join(' • ')
      : null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <SafeAreaProvider>
        <SafeAreaView style={s.screen}>
          <ScrollView
            contentContainerStyle={s.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={s.header}>
              <Text style={s.title}>Filtre seu evento</Text>

              <Pressable
                onPress={onClose}
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel="Fechar filtros"
              >
                <Ionicons name="close" size={30} color={colors.black} />
              </Pressable>
            </View>

            <Text style={s.intro}>
              Combine as opções e encontre sua próxima parada cultural.
            </Text>

            <Group
              title="Quando?"
              icon="calendar-outline"
              options={Object.keys(WHEN)}
              value={draft.when}
              onSelect={pick('when')}
              helper={whenHelper}
            />

            <View style={s.divider} />

            <Group
              title="Em qual região?"
              options={REGIONS}
              value={draft.region}
              onSelect={pick('region')}
            />

            <View style={s.divider} />

            <Group
              title="O que procura?"
              options={CATEGORIES}
              value={draft.category}
              onSelect={pick('category')}
            />

            <Pressable
              style={s.apply}
              onPress={() => onApply(draft)}
              accessibilityRole="button"
            >
              <Text style={s.applyText}>Aplicar filtros</Text>
            </Pressable>

            <Pressable
              style={s.clear}
              onPress={onClear}
              accessibilityRole="button"
            >
              <Text style={s.clearText}>Limpar filtros</Text>
            </Pressable>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },

  content: {
    padding: 24,
    paddingBottom: 32,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontFamily: fonts.title,
    fontSize: 28,
    color: colors.black,
  },

  intro: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    color: colors.black,
    marginTop: 22,
    marginBottom: 28,
  },

  groupHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  groupTitle: {
    fontFamily: fonts.body,
    fontSize: 20,
    color: colors.black,
  },

  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  chip: {
    marginRight: 10,
    marginBottom: 7,
  },

  helper: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.black,
    marginTop: 10,
  },

  divider: {
    height: 1,
    backgroundColor: colors.green,
    marginVertical: 24,
  },

  apply: {
    height: 52,
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },

  applyText: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.white,
  },

  clear: {
    alignItems: 'center',
    padding: 14,
    marginTop: 8,
  },

  clearText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.purple,
  },
});

