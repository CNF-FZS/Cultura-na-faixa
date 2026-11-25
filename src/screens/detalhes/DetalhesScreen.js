
import React, { useRef } from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Linking,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '../../theme';
import { useEvents } from '../../context/EventsContext';
import { useFavorites } from '../../context/FavoritesContext';

import Button from '../../components/Button';
import useRequireLogin from '../../hooks/useRequireLogin';

import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

import EventShareCard from '../../components/EventShareCard';

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
  },

  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  topTitle: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.black,
  },

  image: {
    width: '100%',
    height: 245,
  },

  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    minHeight: 36,
  },

  tag: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.purple,
    paddingHorizontal: 12,
  },

  saved: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.green,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 6,
  },

  savedText: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.purple,
    marginLeft: 6,
  },

  titleInline: {
    fontFamily: fonts.title,
    fontSize: 32,
    color: colors.black,
    marginTop: 14,
  },

  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },

  heart: {
    width: 36,
    height: 36,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },

  shareButton: {
    width: 36,
    height: 36,
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },

  artist: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.purple,
    marginTop: 12,
  },

  desc: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    color: colors.black,
    marginTop: 16,
  },

  line: {
    height: 1,
    backgroundColor: colors.black + '66',
    marginVertical: 24,
  },

  info: {
    flexDirection: 'row',
    marginBottom: 24,
  },

  infoTitle: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.black,
    marginBottom: 6,
  },

  infoText: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: colors.black,
  },

  note: {
    paddingHorizontal: 16,
    marginTop: 8,
  },

  noteTitle: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.purple,
    marginBottom: 6,
  },

  noteText: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: colors.purple,
  },

  more: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginTop: 10,
  },

  moreText: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.purple,
    marginLeft: 8,
  },

  hiddenShareCard: {
    position: 'absolute',
    left: -1000,
    top: 0,
  },
});

function Info({ icon, title, lines = [] }) {
  const validLines = lines.filter(
    (line) => line !== null && line !== undefined && line !== ''
  );

  if (validLines.length === 0) return null;

  return (
    <View style={s.info}>
      <Ionicons
        name={icon}
        size={24}
        color={colors.purple}
        style={{ marginRight: 16 }}
      />

      <View style={{ flex: 1 }}>
        <Text style={s.infoTitle}>{title}</Text>

        {validLines.map((line, index) => (
          <Text key={`${line}-${index}`} style={s.infoText}>
            {line}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default function DetalhesScreen({ route, navigation }) {
  const { events } = useEvents();
  const { isFavorite, toggle } = useFavorites();
  const requireLogin = useRequireLogin();

  const shareCardRef = useRef(null);

  const e = events.find((x) => x.id === route.params.id);

  if (!e) return null;

  const fav = isFavorite(e.id);

  // Compartilha o cartão do evento como imagem PNG.
  const compartilhar = async () => {
    try {
      const uri = await captureRef(shareCardRef, {
        format: 'png',
        quality: 1,
        result: Platform.OS === 'web' ? 'data-uri' : 'tmpfile',
      });

      const nomeArquivo = `cultura-na-faixa-${e.id}.png`;

      // COMPARTILHAMENTO NA WEB
      if (Platform.OS === 'web') {
        const resposta = await fetch(uri);
        const blob = await resposta.blob();

        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = nomeArquivo;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 1000);

        window.alert(
          'Imagem do evento baixada com sucesso! Agora você pode compartilhá-la.'
        );

        return;
      }

      // COMPARTILHAMENTO NO ANDROID
      const disponivel = await Sharing.isAvailableAsync();

      if (!disponivel) {
        Alert.alert(
          'Compartilhamento indisponível',
          'Este dispositivo não oferece suporte ao compartilhamento.'
        );
        return;
      }

      await Sharing.shareAsync(uri, {
        mimeType: 'image/png',
        dialogTitle: 'Compartilhar evento',
        UTI: 'public.png',
      });
    } catch (error) {
      if (
        error?.name === 'AbortError' ||
        error?.message?.toLowerCase().includes('cancel')
      ) {
        return;
      }

      console.error('Erro ao compartilhar evento:', error);

      if (Platform.OS === 'web') {
        window.alert(
          'Não foi possível gerar a imagem do evento. Verifique o console.'
        );
      } else {
        Alert.alert(
          'Erro ao compartilhar',
          'Não foi possível preparar a imagem do evento.'
        );
      }
    }
  };

  const endereco = Array.isArray(e.addressLines)
    ? e.addressLines.filter(Boolean)
    : e.address
      ? [e.address]
      : [];

  const links = e.links || {};

  return (
    <SafeAreaView style={s.screen}>
      {/* Cartão utilizado para gerar a imagem de compartilhamento */}
      <View pointerEvents="none" style={s.hiddenShareCard}>
        <EventShareCard ref={shareCardRef} event={e} />
      </View>

      <ScrollView contentContainerStyle={s.content}>
        {/* Cabeçalho */}
        <View style={s.top}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={colors.purple}
            />

            <Text style={[s.topTitle, { marginLeft: 8 }]}>
              VOLTAR
            </Text>
          </Pressable>

          <Text style={s.topTitle}>DETALHES DO EVENTO</Text>
        </View>

        {/* Imagem principal */}
        <Image
          source={e.image}
          style={s.image}
          resizeMode="cover"
        />

        {/* Categoria e status de favorito */}
        <View style={s.tags}>
          <Text style={s.tag}>
            {(e.category || '').toUpperCase()}
          </Text>

          {fav && (
            <View style={s.saved}>
              <Ionicons
                name="heart"
                size={14}
                color={colors.purple}
              />

              <Text style={s.savedText}>SALVO</Text>
            </View>
          )}
        </View>

        {/* Título */}
        <Text style={s.titleInline}>
          {e.title}
        </Text>

        {/* Ações */}
        <View style={s.actions}>
          <Pressable
            style={s.heart}
            onPress={() => requireLogin(() => toggle(e.id))}
          >
            <Ionicons
              name={fav ? 'heart' : 'heart-outline'}
              size={21}
              color={colors.purple}
            />
          </Pressable>

          <Pressable
            style={s.shareButton}
            onPress={compartilhar}
          >
            <Ionicons
              name="share-social-outline"
              size={20}
              color={colors.white}
            />
          </Pressable>
        </View>

        {/* Artista */}
        {e.artist ? (
          <Text style={s.artist}>
            {e.artist}
          </Text>
        ) : null}

        {/* Descrição */}
        {e.description ? (
          <Text style={s.desc}>
            {e.description}
          </Text>
        ) : null}

        <View style={s.line} />

        {/* Informações do evento */}
        <Info
          icon="calendar-outline"
          title="Data e horário"
          lines={[
            e.dateLong,
            e.time,
          ]}
        />

        <Info
          icon="location-outline"
          title="Local"
          lines={[
            e.placeName || e.venue,
            ...endereco,
          ]}
        />

        <Info
          icon="bus-outline"
          title="Como chegar"
          lines={e.transport || []}
        />

        <Info
          icon="people-outline"
          title="Classificação etária"
          lines={
            Array.isArray(e.age)
              ? e.age
              : e.age
                ? [e.age]
                : []
          }
        />

        <Info
          icon="accessibility-outline"
          title="Acessibilidade"
          lines={
            Array.isArray(e.accessibility)
              ? e.accessibility
              : e.accessibility
                ? [e.accessibility]
                : []
          }
        />

        {/* Inscrição */}
        {e.signup ? (
          <View style={s.note}>
            <Text style={s.noteTitle}>
              Inscrição
            </Text>

            <Text style={s.noteText}>
              {e.signup}
            </Text>
          </View>
        ) : null}

        {links.signup ? (
          <Button
            label="Inscrever-se gratuitamente ↗"
            onPress={() => Linking.openURL(links.signup)}
            style={{ marginTop: 28 }}
          />
        ) : null}

        {/* Links adicionais */}
        {links.info ? (
          <Pressable
            style={s.more}
            onPress={() => Linking.openURL(links.info)}
          >
            <Ionicons
              name="open-outline"
              size={18}
              color={colors.purple}
            />

            <Text style={s.moreText}>
              Mais informações sobre o evento
            </Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
