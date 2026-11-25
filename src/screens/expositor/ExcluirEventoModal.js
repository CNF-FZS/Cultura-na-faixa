// Modal "Excluir este evento?": mostra o evento e pede confirmação antes de remover.
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';
import ModalCard from '../../components/ModalCard';
import Button from '../../components/Button';

export default function ExcluirEventoModal({ event, onClose, onConfirm }) {
  return (
    <ModalCard visible={!!event} onClose={onClose} icon="trash-outline" title="Excluir este evento?">
      <Text style={s.text}>Ele sairá da descoberta e das listas de favoritos. Esta ação não pode ser desfeita.</Text>
      {event && (
        <View style={s.item}>
          <Image source={event.image} style={s.thumb} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={s.name}>{event.title}</Text>
            <Text style={s.small}>{event.dateShort ?? event.date}</Text>
            <Text style={s.small}>{event.venue}</Text>
          </View>
        </View>
      )}
      <Button label="Cancelar" variant="outline" onPress={onClose} />
      <Button label="Excluir evento" onPress={onConfirm} style={{ marginTop: 12 }} />
    </ModalCard>
  );
}

const s = StyleSheet.create({
  text: { fontFamily: fonts.body, fontSize: 15, lineHeight: 22, color: colors.black },
  item: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, marginVertical: 24 },
  thumb: { width: 58, height: 58, borderRadius: 12 },
  name: { fontFamily: fonts.body, fontSize: 16, color: colors.black },
  small: { fontFamily: fonts.body, fontSize: 12, color: colors.black, marginTop: 4 },
});
