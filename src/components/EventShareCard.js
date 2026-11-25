import React, { forwardRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { colors, fonts } from '../theme';

const EventShareCard = forwardRef(({ event }, ref) => {
  if (!event) return null;

  const data = event.dateLong || event.dateShort || event.day || '';
  const horario = event.time || event.form?.startTime || '';
  const local = event.placeName || event.venue || 'Local a confirmar';

  const endereco = Array.isArray(event.addressLines)
    ? event.addressLines.filter(Boolean).join(' · ')
    : event.address || '';

  return (
    <View ref={ref} collapsable={false} style={styles.card}>
      {/* Cabeçalho da marca */}
        <View style={styles.header}>
        <Image
            source={require('../../assets/logo-cultura-na-faixa.png')}
            style={styles.logo}
            resizeMode="contain"
        />

        <View style={styles.freeTag}>
            <Text style={styles.freeTagText}>GRÁTIS</Text>
        </View>
        </View>

      {/* Imagem principal */}
      <View style={styles.imageContainer}>
        <Image
          source={event.image}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.imageOverlay}>
          <Text style={styles.category}>
            {(event.category || 'EVENTO').toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Informações principais */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={3}>
          {event.title}
        </Text>

        {event.artist ? (
          <Text style={styles.artist} numberOfLines={1}>
            {event.artist}
          </Text>
        ) : null}

        <View style={styles.divider} />

        {/* Data e horário */}
        <View style={styles.infoRow}>
          <View style={styles.iconBlock}>
            <Text style={styles.iconText}>01</Text>
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>DATA E HORÁRIO</Text>
            <Text style={styles.infoValue}>{data}</Text>
            <Text style={styles.infoSecondary}>{horario}</Text>
          </View>
        </View>

        {/* Localização */}
        <View style={styles.infoRow}>
          <View style={styles.iconBlock}>
            <Text style={styles.iconText}>02</Text>
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>LOCAL</Text>
            <Text style={styles.infoValue}>{local}</Text>
            {endereco ? (
              <Text style={styles.infoSecondary}>{endereco}</Text>
            ) : null}
          </View>
        </View>
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <View style={styles.footerLine} />
        <Text style={styles.footerText}>
          DESCUBRA A CULTURA DA SUA CIDADE.
        </Text>
        <Text style={styles.footerBrand}>
          CULTURA NA FAIXA
        </Text>
      </View>
    </View>
  );
});

export default EventShareCard;

const styles = StyleSheet.create({
  card: {
    width: 360,
    height: 640,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },

  header: {
  height: 76,
  backgroundColor: colors.white,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 22,
  },

  freeTag: {
    backgroundColor: colors.green,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  freeTagText: {
    color: colors.black,
    fontFamily: fonts.title,
    fontSize: 11,
    letterSpacing: 1,
  },

  imageContainer: {
    width: '100%',
    height: 230,
    backgroundColor: '#E5E5E5',
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: colors.green,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },

  category: {
    color: colors.black,
    fontFamily: fonts.title,
    fontSize: 11,
    letterSpacing: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 17,
  },

  title: {
    color: colors.purple,
    fontFamily: fonts.title,
    fontSize: 23,
    lineHeight: 28,
  },

  artist: {
    color: colors.black,
    fontFamily: fonts.body,
    fontSize: 13,
    marginTop: 5,
  },

  divider: {
    height: 2,
    backgroundColor: colors.green,
    marginVertical: 13,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 13,
  },

  iconBlock: {
    width: 34,
    height: 34,
    backgroundColor: colors.purple,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  iconText: {
    color: colors.white,
    fontFamily: fonts.title,
    fontSize: 12,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    color: colors.green,
    fontFamily: fonts.title,
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 3,
  },

  infoValue: {
    color: colors.black,
    fontFamily: fonts.bold,
    fontSize: 13,
    lineHeight: 18,
  },

  infoSecondary: {
    color: '#666666',
    fontFamily: fonts.body,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 2,
  },

  footer: {
    height: 65,
    backgroundColor: colors.purple,
    justifyContent: 'center',
    paddingHorizontal: 22,
  },

  footerLine: {
    width: 42,
    height: 3,
    backgroundColor: colors.green,
    marginBottom: 6,
  },

  footerText: {
    color: colors.white,
    fontFamily: fonts.body,
    fontSize: 9,
    letterSpacing: 1,
  },

  footerBrand: {
    color: colors.green,
    fontFamily: fonts.title,
    fontSize: 10,
    letterSpacing: 1,
    marginTop: 2,
  },

  logo: {
  width: 190,
  height: 55,
  resizeMode: 'contain',
  },
});
