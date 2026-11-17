// src/screens/expositor/EventoFormScreen.js
// Formulário de "Adicionar evento" e "Editar evento" (o mesmo; a edição recebe o parâmetro id).
import { useState, useRef } from 'react'; // ALTERAÇÃO (CALENDÁRIO): useRef adicionado
import { View, Text, Image, ScrollView, Pressable, StyleSheet, Platform } from 'react-native'; // ALTERAÇÃO (CALENDÁRIO): Platform adicionado
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
//import { AGES, COVERS, EMPTY_FORM, REQUIRED, buildEvent, validate } from './eventoUtils'; // ALTERAÇÃO (BORDA VERMELHA): REQUIRED adicionado
import {
  AGES,
  COVERS,
  DEFAULT_COVER,
  EMPTY_FORM,
  REQUIRED,
  buildEvent,
  validate
} from './eventoUtils';

// ALTERAÇÃO (CALENDÁRIO): import do calendário nativo (celular)
import DateTimePicker from '@react-native-community/datetimepicker';

// ALTERAÇÃO (CALENDÁRIO): funções de conversão de data
const pad = (n) => String(n).padStart(2, '0');
const fmt = (d) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
const parse = (str) => {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(str ?? '');
  return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null;
};
// dd/mm/aaaa <-> aaaa-mm-dd (formato do input de data do navegador)
const toISO = (str) => {
  const d = parse(str);
  return d ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` : '';
};
const fromISO = (iso) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso ?? '');
  return m ? `${m[3]}/${m[2]}/${m[1]}` : '';
};

// ALTERAÇÃO (HORA): máscara de hora. "1800" -> "18:00" (só números, o ":" entra sozinho)
// Para horas antes das 10, digite com o zero na frente (ex.: 0930 -> 09:30)
const maskHora = (txt) => {
  const n = (txt ?? '').replace(/\D/g, '').slice(0, 4);
  if (n.length <= 2) return n;
  let h = n.slice(0, 2);
  let m = n.slice(2);
  if (+h > 23) h = '23';
  if (m.length === 2 && +m > 59) m = '59';
  return `${h}:${m}`;
};


// API CEP
// ALTERAÇÃO (CEP): máscara de CEP. "01310100" -> "01310-100" (só números, o "-" entra sozinho)
const maskCep = (txt) => {
  const n = (txt ?? '').replace(/\D/g, '').slice(0, 8);
  return n.length > 5 ? `${n.slice(0, 5)}-${n.slice(5)}` : n;
};



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
  const [mostrarErros, setMostrarErros] = useState(false); // ALTERAÇÃO (BORDA VERMELHA): vira true quando tenta salvar com erro
  const [cepMsg, setCepMsg] = useState(''); // ALTERAÇÃO (CEP): mensagem de busca ("Buscando...", "CEP não encontrado")
  const [picker, setPicker] = useState(null); // 'startDate' | 'endDate' | null  // ALTERAÇÃO (CALENDÁRIO)
  const webRefs = useRef({}); // inputs de data usados só na web  // ALTERAÇÃO (CALENDÁRIO)





  const set = (k) => (v) => setF((x) => ({ ...x, [k]: v }));

  // ALTERAÇÃO (BORDA VERMELHA): true se o campo é obrigatório, está vazio e o usuário já tentou salvar
  const vazio = (k) => mostrarErros && REQUIRED.includes(k) && !String(f[k] ?? '').trim();


  const T = (k, label, extra) => <Field label={label} value={f[k]} onChangeText={set(k)} error={vazio(k)} {...extra} />;
  const S = (k, label, options, extra) => <Select label={label} value={f[k]} options={options} onChange={set(k)} error={vazio(k)} {...extra} />;

  // ALTERAÇÃO (HORA + BORDA VERMELHA NO INPUT): campo de hora com máscara hh:mm e borda de erro
  const H = (k, label) => (
    <Field label={label} value={f[k]} onChangeText={(v) => set(k)(maskHora(v))} error={vazio(k)} {...hora} />
  );

  // CONST CEP
  const buscarCep = async (cep) => {
    const n = cep.replace(/\D/g, '');
    if (n.length !== 8) return setCepMsg('');
    setCepMsg('Buscando endereço...');
    try {
      const r = await fetch(`https://viacep.com.br/ws/${n}/json/`);
      const d = await r.json();
      if (d.erro) return setCepMsg('CEP não encontrado. Preencha o endereço manualmente.');
      // só substitui se a API trouxe o dado (CEPs gerais de cidade podem vir sem rua/bairro)
      setF((x) => ({
        ...x,
        street: d.logradouro || x.street,
        district: d.bairro || x.district,
        city: d.localidade || x.city,
        uf: d.uf || x.uf,
      }));
      setCepMsg('');
    } catch {
      setCepMsg('Não foi possível buscar o CEP. Preencha o endereço manualmente.');
    }
  };

  // ALTERAÇÃO (CEP): campo de CEP com máscara 00000-000 e busca automática
  const C = () => (
    <Field
      label="CEP *"
      value={f.cep}
      onChangeText={(v) => { const m = maskCep(v); set('cep')(m); buscarCep(m); }}
      error={vazio('cep')}
      placeholder="00000-000"
      keyboardType="number-pad"
      maxLength={9}
      helper={cepMsg || undefined}
    />
  );



  // TESTE
  // ALTERAÇÃO (CALENDÁRIO): aplica a data escolhida (usado pelo celular e pela web)
  const aplicarData = (k, date) => {
    set(k)(fmt(date));
    // se a data de início passar da data de fim, limpa a data de fim
    if (k === 'startDate') {
      const fim = parse(f.endDate);
      if (fim && fim < date) set('endDate')('');
    }
  };

  // Celular: resposta do calendário nativo
  const onPick = (event, date) => {
    const k = picker;
    setPicker(null);
    if (event.type === 'dismissed' || !date) return;
    aplicarData(k, date);
  };

  // Campo de data: toque abre o calendário (o teclado não aparece)
  // (a borda vermelha da data vem do T, que já aplica o "vazio(k)")
  const D = (k, label) => {
    const campo = (
      <View pointerEvents="none">
        {T(k, label, { right: 'calendar-outline', placeholder: 'dd/mm/aaaa' })}
      </View>
    );

    // Web: usa o seletor de data do navegador
    if (Platform.OS === 'web') {
      const abrir = () => {
        const el = webRefs.current[k];
        if (el?.showPicker) el.showPicker();
        else el?.focus();
      };
      return (
        <Pressable style={s.half} onPress={abrir} accessibilityRole="button">
          {campo}
          <input
            ref={(el) => { webRefs.current[k] = el; }}
            type="date"
            tabIndex={-1}
            value={toISO(f[k])}
            min={k === 'endDate' ? toISO(f.startDate) || undefined : undefined}
            onChange={(e) => {
              const d = parse(fromISO(e.target.value));
              if (d) aplicarData(k, d);
            }}
            style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 1, opacity: 0, pointerEvents: 'none' }}
          />
        </Pressable>
      );
    }

    // Celular: abre o DateTimePicker nativo
    return (
      <Pressable style={s.half} onPress={() => setPicker(k)} accessibilityRole="button">
        {campo}
      </Pressable>
    );
  };

  // TESTE TERMINA

  // Upload real ainda não existe: tocar alterna entre as imagens de exemplo.
  const trocarCapa = () => setCover(COVERS[(COVERS.indexOf(cover) + 1) % COVERS.length]);

  const salvar = () => {
    const msg = validate(f);
    if (msg) { setMostrarErros(true); return setErro(msg); } // ALTERAÇÃO (BORDA VERMELHA): liga as bordas vermelhas (antes: if (msg) return setErro(msg);)
    const ev = buildEvent(f, cover ?? DEFAULT_COVER);
    base ? updateEvent(base.id, ev) : addEvent(ev);
    navigation.goBack();
  };

  // const data = { right: 'calendar-outline', placeholder: 'dd/mm/aaaa', style: s.half };
  // ALTERAÇÃO (HORA): adicionados keyboardType 'number-pad' e maxLength 5
  const hora = { right: 'time-outline', placeholder: 'hh:mm', style: s.half, keyboardType: 'number-pad', maxLength: 5 };

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

        {/* ALTERAÇÃO (CALENDÁRIO + HORA): D(...) abre o calendário e H(...) aplica a máscara hh:mm */}
        <View style={s.row}>{D('startDate', 'Data de início *')}{H('startTime', 'Hora de início *')}</View>
        <View style={s.row}>{D('endDate', 'Data de fim')}{H('endTime', 'Hora de fim')}</View>

        {/* ALTERAÇÃO (CALENDÁRIO): calendário nativo, só aparece fora da web */}
        {Platform.OS !== 'web' && picker && (
          <DateTimePicker
            value={parse(f[picker]) ?? new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            minimumDate={picker === 'endDate' ? parse(f.startDate) ?? undefined : undefined}
            onChange={onPick}
          />
        )}

        <View style={s.divider} />
        <Text style={s.h}>Endereço do espaço</Text>
        <Text style={s.hint}>Informe o endereço completo do espaço.</Text>
        {T('placeName', 'Nome do local *', { placeholder: 'Nome do espaço cultural' })}
        {/* {T('cep', 'CEP *', { placeholder: '00000-000', keyboardType: 'numbers-and-punctuation' })} */}
        {C()}
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
  // ALTERAÇÃO (BORDA VERMELHA): estilos da borda (transparente por padrão, vermelha quando há erro)
  box: { borderWidth: 1.5, borderColor: 'transparent', padding: 6 },
  boxErro: { borderColor: '#D32F2F' },
});