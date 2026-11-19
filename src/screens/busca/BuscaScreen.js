// src/screens/busca/BuscaScreen.js
// Aba Busca: campo de busca, filtros ativos e lista de resultados.
/*import { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts } from '../../theme';
import { WHEN } from '../../data/events';
import { useEvents } from '../../context/EventsContext';
import Chip from '../../components/Chip';
import EventCard from '../../components/EventCard';
import SearchBar from './SearchBar';
import FiltrosModal from './FiltrosModal';
import { DEFAULT_FILTERS, filterEvents } from './filterEvents';

export default function BuscaScreen() {
  const { events } = useEvents();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [open, setOpen] = useState(false);

  const active = ['when', 'region', 'category'].filter((k) => filters[k] !== DEFAULT_FILTERS[k]);
  const results = useMemo(() => filterEvents(events, query, filters), [events, query, filters]);
  const hasActive = query.trim() !== '' || active.length > 0;

  const n = results.length;
  const count = n === 0 ? 'Nenhum evento encontrado' : `${n} ${n === 1 ? 'evento encontrado' : 'eventos encontrados'}`;

  const clearAll = () => {
    setQuery('');
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <SafeAreaView style={s.screen} edges={['top']}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text style={s.title}>Encontre seu evento</Text>
        <Text style={s.subtitle}>Busque por evento, pessoa, local ou endereço.</Text>

        <SearchBar value={query} onChangeText={setQuery} onOpenFilters={() => setOpen(true)} />

        {active.length > 0 && (
          <View style={s.chips}>
            {active.map((k) => (
              <Chip
                key={k}
                label={`${filters[k]} ×`}
                accessibilityLabel={`Remover filtro ${filters[k]}`}
                onPress={() => setFilters({ ...filters, [k]: DEFAULT_FILTERS[k] })}
              />
            ))}
          </View>
        )}

        <View style={s.resultsRow}>
          <Text style={s.count}>{count}</Text>

          {filters.when.length > 0 ? (
            <Text style={s.range}>
              {filters.when
                .map((period) => WHEN[period].short)
                .join(' • ')}
            </Text>
          ) : null}
        </View>

        {results.map((e) => (
          <EventCard key={e.id} event={e} showPrice={false} />
        ))}

        <View style={s.note}>
          <Text style={s.noteTitle}>Seu próximo encontro com a cidade</Text>
          <Text style={s.noteText}>
            Todos os eventos do Cultura na Faixa são gratuitos. Alguns podem pedir inscrição antecipada.
          </Text>
        </View>

        {hasActive && (
          <Pressable onPress={clearAll} style={s.clearBtn} accessibilityRole="button">
            <Text style={s.clearText}>Limpar filtros e ver todos os eventos</Text>
          </Pressable>
        )}
      </ScrollView>

      <FiltrosModal
        visible={open}
        filters={filters}
        onClose={() => setOpen(false)}
        onApply={(f) => {
          setFilters(f);
          setOpen(false);
        }}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  content: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 32 },
  title: { fontFamily: fonts.title, fontSize: 28, color: colors.black },
  subtitle: { fontFamily: fonts.body, fontSize: 16, color: colors.black, marginTop: 20, marginBottom: 20 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 },
  resultsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18, marginBottom: 20 },
  count: { fontFamily: fonts.body, fontSize: 15, color: colors.black },
  range: { fontFamily: fonts.body, fontSize: 14, color: colors.black },
  note: { paddingHorizontal: 16, marginTop: 14 },
  noteTitle: { fontFamily: fonts.body, fontSize: 15, color: colors.purple, marginBottom: 8 },
  noteText: { fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.purple },
  clearBtn: { alignItems: 'center', paddingVertical: 8, marginTop: 28 },
  clearText: { fontFamily: fonts.bold, fontSize: 14, color: colors.purple },
});*/

// src/screens/busca/BuscaScreen.js
// Aba Busca: campo de busca, filtros ativos e lista de resultados.

import { useMemo, useState } from 'react';

import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts } from '../../theme';
import { WHEN } from '../../data/events';
import { useEvents } from '../../context/EventsContext';

import Chip from '../../components/Chip';
import EventCard from '../../components/EventCard';

import SearchBar from './SearchBar';
import FiltrosModal from './FiltrosModal';

import {
  DEFAULT_FILTERS,
  filterEvents,
} from './filterEvents';

export default function BuscaScreen() {
  const { events } = useEvents();

  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [open, setOpen] = useState(false);

  // Identifica quais grupos possuem filtros selecionados.
  const active = ['when', 'region', 'category'].filter(
    (key) => filters[key].length > 0
  );

  // Aplica a pesquisa e os filtros aos eventos.
  const results = useMemo(
    () => filterEvents(events, query, filters),
    [events, query, filters]
  );

  // Verifica se existe alguma pesquisa ou filtro ativo.
  const hasActive = query.trim() !== '' || active.length > 0;

  // Quantidade de resultados encontrados.
  const n = results.length;

  const count =
    n === 0
      ? 'Nenhum evento encontrado'
      : `${n} ${n === 1 ? 'evento encontrado' : 'eventos encontrados'}`;

  // Limpa a pesquisa e todos os filtros selecionados.
  const clearAll = () => {
    setQuery('');

    setFilters({
      when: [],
      region: [],
      category: [],
    });
  };

  // Remove individualmente uma opção selecionada.
  const removeFilter = (key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: current[key].filter((item) => item !== value),
    }));
  };

  return (
    <SafeAreaView style={s.screen} edges={['top']}>
      <ScrollView
        contentContainerStyle={s.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={s.title}>
          Encontre seu evento
        </Text>

        <Text style={s.subtitle}>
          Busque por evento, pessoa, local ou endereço.
        </Text>

        <SearchBar
          value={query}
          onChangeText={setQuery}
          onOpenFilters={() => setOpen(true)}
        />

        {/* Mostra individualmente os filtros selecionados. */}
        {active.length > 0 && (
          <View style={s.chips}>
            {active.flatMap((key) =>
              filters[key].map((value) => (
                <Chip
                  key={`${key}-${value}`}
                  label={`${value} ×`}
                  accessibilityLabel={`Remover filtro ${value}`}
                  onPress={() => removeFilter(key, value)}
                />
              ))
            )}
          </View>
        )}

        {/* Quantidade de resultados e períodos selecionados. */}
        <View style={s.resultsRow}>
          <Text style={s.count}>
            {count}
          </Text>

          {filters.when.length > 0 ? (
            <Text style={s.range}>
              {filters.when
                .map((period) => WHEN[period].short)
                .join(' • ')}
            </Text>
          ) : null}
        </View>

        {/* Lista de eventos encontrados. */}
        {results.map((e) => (
          <EventCard
            key={e.id}
            event={e}
            showPrice={false}
          />
        ))}

        <View style={s.note}>
          <Text style={s.noteTitle}>
            Seu próximo encontro com a cidade
          </Text>

          <Text style={s.noteText}>
            Todos os eventos do Cultura na Faixa são gratuitos.
            Alguns podem pedir inscrição antecipada.
          </Text>
        </View>

        {/* Botão para limpar a pesquisa e os filtros. */}
        {hasActive && (
          <Pressable
            onPress={clearAll}
            style={s.clearBtn}
            accessibilityRole="button"
          >
            <Text style={s.clearText}>
              Limpar filtros e ver todos os eventos
            </Text>
          </Pressable>
        )}
      </ScrollView>

      {/* Modal de seleção dos filtros. */}
      <FiltrosModal
        visible={open}
        filters={filters}
        onClose={() => setOpen(false)}
        onApply={(f) => {
          setFilters(f);
          setOpen(false);
        }}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },

  title: {
    fontFamily: fonts.title,
    fontSize: 28,
    color: colors.black,
  },

  subtitle: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.black,
    marginTop: 20,
    marginBottom: 20,
  },

  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },

  resultsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 20,
  },

  count: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.black,
  },

  range: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.black,
  },

  note: {
    padding: 20,
    marginTop: 14,
    borderWidth: 1,
    borderColor: colors.purple,
  },

  noteTitle: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.purple,
    marginBottom: 8,
  },

  noteText: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.purple,
  },

  clearBtn: {
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 28,
  },

  clearText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.purple,
  },
});
