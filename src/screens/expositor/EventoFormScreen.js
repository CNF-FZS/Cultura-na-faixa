// src/screens/expositor/EventoFormScreen.js
// Formulário de "Adicionar evento" e "Editar evento" (o mesmo; a edição recebe o parâmetro id).
import { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../../theme';
import { CATEGORIES, REGIONS } from '../../data/events';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventsContext';
import Header from '../../components/Header';
import Field from '../../components/Field';
import Select from '../../components/Select';
import Button from '../../components/Button';
import { AGES, COVERS, EMPTY_FORM, buildEvent, validate } from './eventoUtils';

export default function EventoFormScreen({ route, navigation }) {
  const { user } = useAuth();
  const { events, addEvent, updateEvent } = useEvents();
  const base = events.find((e) => e.id === route.params?.id);
  const [f, setF] = useState(() =>
    base
      ? { ...EMPTY_FORM, title: base.title, artist: base.artist ?? '', description: base.description ?? '', category: base.category, region: base.region, placeName: base.placeName ?? '', ...base.form }
      : EMPTY_FORM
  );
  const [cover, setCover] = useState(base?.image ?? null);
  const [erro, setErro] = useState('');

  const set = (k) => (v) => setF((x) => ({ ...x, [k]: v }));
  const T = (k, label, extra) => <Field label={label} value={f[k]} onChangeText={set(k)} {...extra} />;
  const S = (k, label, options, extra) => <Select label={label} value={f[k]} options={options} onChange={set(k)} {...extra} />;
  // Upload real ainda não existe: tocar alterna entre as imagens de exemplo.
  const trocarCapa = () => setCover(COVERS[(COVERS.indexOf(cover) + 1) % COVERS.length]);

  const salvar = () => {
    const msg = validate(f);
    if (msg) return setErro(msg);
    const ev = buildEvent(f, cover ?? COVERS[0]);
    base ? updateEvent(base.id, ev) : addEvent(ev);
    navigation.goBack();
  };

  const data = { right: 'calendar-outline', placeholder: 'dd/mm/aaaa', style: s.half };
  const hora = { right: 'time-outline', placeholder: 'hh:mm', style: s.half };

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Header label={user?.role === 'administrador' ? 'Administrador' : 'Expositor'} title={base ? 'Editar evento' : 'Adicionar evento'} onBack={() => navigation.goBack()} />
        {base && <Text style={s.sub}>{base.title} · {base.dateLong?.split(', ')[1]}</Text>}
        <View style={s.info}>
          <Text style={s.infoText}>Todos os eventos cadastrados no Cultura na Faixa devem ter entrada gratuita. Campos com * são obrigatórios.</Text>
        </View>

        <Text style={s.h}>Sobre o evento</Text>
        {T('title', 'Título do evento *', { placeholder: 'Ex.: Roda do Encontro' })}
        {T('artist', 'Artista ou coletivo', { placeholder: 'Nome da pessoa ou do grupo' })}
        {T('description', 'Descrição curta *', { multiline: true, maxLength: 500, placeholder: 'Conte o que o público vai encontrar', helper: 'Até 500 caracteres.' })}
        {S('category', 'Categoria *', CATEGORIES.slice(1), { placeholder: 'Selecione uma categoria', helper: 'Show, Dança, Exposição, Teatro ou Cinema.' })}
        <Text style={s.label}>Imagem de capa</Text>
        <Pressable onPress={trocarCapa} accessibilityRole="button" style={{ marginBottom: 8 }}>
          {cover ? (
            <>
              <Image source={cover} style={s.cover} />
              <Text style={s.link}>Trocar imagem</Text>
            </>
          ) : (
            <View style={s.upload}>
              <Ionicons name="image-outline" size={28} color={colors.purple} />
              <Text style={s.uploadTitle}>Adicionar fotografia</Text>
              <Text style={s.uploadText}>JPG ou PNG · até 5 MB</Text>
            </View>
          )}
        </Pressable>

        <View style={s.divider} />
        <Text style={s.h}>Quando acontece</Text>
        <Text style={s.hint}>Horário local de São Paulo (Brasília).</Text>
        <View style={s.row}>{T('startDate', 'Data de início *', data)}{T('startTime', 'Hora de início *', hora)}</View>
        <View style={s.row}>{T('endDate', 'Data de fim', data)}{T('endTime', 'Hora de fim', hora)}</View>

        <View style={s.divider} />
        <Text style={s.h}>Endereço do espaço</Text>
        <Text style={s.hint}>Informe o endereço completo do espaço.</Text>
        {T('placeName', 'Nome do local *', { placeholder: 'Nome do espaço cultural' })}
        {T('cep', 'CEP *', { placeholder: '00000-000', keyboardType: 'numbers-and-punctuation' })}
        {T('street', 'Rua, avenida ou praça *', { placeholder: 'Logradouro' })}
        <View style={s.row}>{T('number', 'Número *', { placeholder: 'Número', style: s.half })}{T('complement', 'Complemento', { placeholder: 'Opcional', style: s.half })}</View>
        {T('district', 'Bairro *', { placeholder: 'Nome do bairro' })}
        <View style={s.row}>{T('city', 'Cidade *', { style: { flex: 1 } })}{T('uf', 'UF *', { style: { width: 80 }, maxLength: 2, autoCapitalize: 'characters' })}</View>
        {S('region', 'Região *', REGIONS.slice(1), { placeholder: 'Selecione a região', helper: 'Centro, Zona Norte, Zona Sul, Zona Leste ou Zona Oeste.' })}
        {T('transport', 'Transportes próximos', { multiline: true, placeholder: 'Estações, linhas e distância a pé' })}

        <View style={s.divider} />
        <Text style={s.h}>Acesso</Text>
        {S('age', 'Faixa etária *', AGES, { placeholder: 'Selecione a classificação' })}
        {T('accessibility', 'Acessibilidade', { multiline: true, placeholder: 'Descreva os recursos disponíveis', helper: 'Deixe em branco se não houver informações confirmadas.' })}
        <View style={s.free}>
          <Ionicons name="checkmark-circle-outline" size={28} color={colors.purple} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={s.freeTitle}>Entrada gratuita</Text>
            <Text style={s.freeText}>Obrigatória para todos os eventos do Cultura na Faixa.</Text>
          </View>
        </View>
        {T('entry', 'Orientações de entrada', { placeholder: 'Ex.: retirada de ingresso na bilheteria' })}

        <View style={s.divider} />
        <Text style={s.h}>Links externos</Text>
        <Text style={s.hint}>Opcionais. Use endereços completos com https://.</Text>
        {T('linkSignup', 'Link de inscrição', { right: 'link-outline', placeholder: 'https://', keyboardType: 'url', helper: 'Preencha se o evento exigir cadastro antecipado.' })}
        {T('linkInfo', 'Link para mais informações', { right: 'link-outline', placeholder: 'https://', keyboardType: 'url' })}

        {erro ? <Text style={s.erro}>{erro}</Text> : null}
        <Button label={base ? 'Salvar alterações' : 'Adicionar evento'} onPress={salvar} />
        <Button label="Cancelar e voltar" variant="outline" onPress={() => navigation.goBack()} style={{ marginTop: 12 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 },
  sub: { fontFamily: fonts.body, fontSize: 14, color: colors.black, marginBottom: 12 },
  info: { borderWidth: 1, borderColor: colors.purple, backgroundColor: colors.purple + '12', padding: 14, marginVertical: 12 },
  infoText: { fontFamily: fonts.body, fontSize: 13, lineHeight: 19, color: colors.purple },
  h: { fontFamily: fonts.title, fontSize: 22, color: colors.black, marginVertical: 14 },
  hint: { fontFamily: fonts.body, fontSize: 13, color: colors.black, marginTop: -8, marginBottom: 16 },
  label: { fontFamily: fonts.bold, fontSize: 13, color: colors.black, marginBottom: 8 },
  row: { flexDirection: 'row', gap: 16 },
  half: { flex: 1 },
  divider: { height: 1, backgroundColor: colors.green, marginVertical: 14 },
  cover: { width: '100%', height: 112 },
  link: { fontFamily: fonts.bold, fontSize: 13, color: colors.purple, marginTop: 8 },
  upload: { height: 100, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.purple, alignItems: 'center', justifyContent: 'center' },
  uploadTitle: { fontFamily: fonts.bold, fontSize: 14, color: colors.purple, marginTop: 6 },
  uploadText: { fontFamily: fonts.body, fontSize: 12, color: colors.black, marginTop: 2 },
  free: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, marginBottom: 20 },
  freeTitle: { fontFamily: fonts.body, fontSize: 15, color: colors.purple },
  freeText: { fontFamily: fonts.body, fontSize: 13, color: colors.black, marginTop: 2 },
  erro: { fontFamily: fonts.bold, fontSize: 14, color: colors.black, marginBottom: 12 },
});
