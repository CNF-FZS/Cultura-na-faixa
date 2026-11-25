
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  AppState,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts } from '../theme';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useEvents } from '../context/EventsContext';

// Converte a data e o horário do evento para um objeto Date local.
function getEventDateTime(event) {
  let date = event.day;
  let time = event.form?.startTime || '00:00';

  // A data do formulário, quando disponível, está no formato DD/MM/YYYY.
  if (event.form?.startDate) {
    const [day, month, year] = event.form.startDate.split('/');
    date = `${year}-${month}-${day}`;
  }

  if (!date) return null;

  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);

  if (!year || !month || !day) return null;

  return new Date(year, month - 1, day, hour || 0, minute || 0);
}

// Formata a data para exibição.
function formatEventDate(date) {
  const meses = [
    'janeiro', 'fevereiro', 'março', 'abril',
    'maio', 'junho', 'julho', 'agosto',
    'setembro', 'outubro', 'novembro', 'dezembro',
  ];

  return `${date.getDate()} de ${meses[date.getMonth()]}`;
}

function getNotificationMessage(event, date) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const diaEvento = new Date(date);
  diaEvento.setHours(0, 0, 0, 0);

  const diferenca = Math.round(
    (diaEvento - hoje) / (1000 * 60 * 60 * 24)
  );

  if (diferenca === 0) {
    return `O evento ${event.title} acontece hoje!`;
  }

  if (diferenca === 1) {
    return `Seu evento favorito ${event.title} acontece amanhã!`;
  }

  return `Não se esqueça de ${event.title}! Seu evento acontece em ${diferenca} dias.`;
}

export default function EventNotification() {
  const { user, notificationsEnabled } = useAuth();
  const { favs } = useFavorites();
  const { events } = useEvents();
  const insets = useSafeAreaInsets();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [visible, setVisible] = useState(false);

  const animatedY = useRef(new Animated.Value(-180)).current;
  const appState = useRef(AppState.currentState);

  // Procura o próximo evento favoritado que ainda não começou.
  const findNextEvent = useCallback(() => {
    if (!user || !notificationsEnabled || !favs?.size) {
      return null;
    }

    const agora = new Date();

    const proximosEventos = events
      .filter((event) => favs.has(String(event.id)))
      .map((event) => ({
        event,
        dateTime: getEventDateTime(event),
      }))
      .filter(({ dateTime }) => dateTime && dateTime > agora)
      .sort((a, b) => a.dateTime - b.dateTime);

    return proximosEventos[0] || null;
  }, [user, notificationsEnabled, favs, events]);

  // Exibe o aviso com animação.
  const showNotification = useCallback(() => {
    if (!notificationsEnabled || !user) {
      setVisible(false);
      setSelectedEvent(null);
      return;
    }

    const next = findNextEvent();

    if (!next) {
      setVisible(false);
      setSelectedEvent(null);
      return;
    }

    setSelectedEvent(next);
    setVisible(true);

    animatedY.setValue(-180);

    Animated.spring(animatedY, {
      toValue: 0,
      useNativeDriver: true,
      tension: 65,
      friction: 10,
    }).start();
  }, [
    animatedY,
    findNextEvent,
    notificationsEnabled,
    user,
  ]);

  // Fecha a notificação.
  const dismissNotification = useCallback(() => {
    Animated.timing(animatedY, {
      toValue: -180,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      setSelectedEvent(null);
    });
  }, [animatedY]);

  // Exibe ao abrir o app e novamente quando ele volta ao primeiro plano.
  useEffect(() => {
    showNotification();

    const subscription = AppState.addEventListener(
      'change',
      (nextState) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextState === 'active'
        ) {
          showNotification();
        }

        appState.current = nextState;
      }
    );

    return () => subscription.remove();
  }, [showNotification]);

  // Permite arrastar a notificação para cima.
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        gesture.dy < -8 &&
        Math.abs(gesture.dy) > Math.abs(gesture.dx),

      onPanResponderMove: (_, gesture) => {
        animatedY.setValue(Math.min(0, gesture.dy));
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy < -50) {
          dismissNotification();
        } else {
          Animated.spring(animatedY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 65,
            friction: 10,
          }).start();
        }
      },
    })
  ).current;

  if (!visible || !selectedEvent) return null;

  const { event, dateTime } = selectedEvent;

  return (
    <View
      pointerEvents="box-none"
      style={[s.overlay, { top: insets.top + 8 }]}
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          s.notification,
          { transform: [{ translateY: animatedY }] },
        ]}
      >
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Ionicons
              name="calendar"
              size={19}
              color={colors.white}
            />
            <Text style={s.headerTitle}>Lembrete de evento</Text>
          </View>

          <Pressable
            onPress={dismissNotification}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Fechar notificação"
          >
            <Ionicons name="close" size={23} color={colors.white} />
          </Pressable>
        </View>

        <Text style={s.message}>
          {getNotificationMessage(event, dateTime)}
        </Text>

        <View style={s.footer}>
          <Ionicons
            name="time-outline"
            size={15}
            color={colors.white}
          />
          <Text style={s.date}>
            {formatEventDate(dateTime)}
          </Text>
        </View>

        <Text style={s.hint}>
          Deslize para cima para dispensar
        </Text>
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 999,
    elevation: 20,
  },

  notification: {
    backgroundColor: colors.purple,
    padding: 16,
    //borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTitle: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.white,
    marginLeft: 8,
  },

  message: {
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.white,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  date: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.white,
    marginLeft: 6,
  },

  hint: {
    fontFamily: fonts.body,
    fontSize: 10,
    color: '#FFFFFFBB',
    marginTop: 10,
  },
});
