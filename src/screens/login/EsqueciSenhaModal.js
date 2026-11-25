// Modal "Redefinir Senha": pede o e-mail e confirma o envio (simulado).
import { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';
import ModalCard from '../../components/ModalCard';
import Field from '../../components/Field';
import Button from '../../components/Button';

export default function EsqueciSenhaModal({ visible, onClose }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const close = () => {
    setSent(false);
    setEmail('');
    onClose();
  };

  return (
    <ModalCard visible={visible} onClose={close} icon="lock-closed" title="Redefinir Senha">
      <Text style={s.text}>
        {sent
          ? 'Se esse e-mail estiver cadastrado, você vai receber um link para criar uma nova senha.'
          : 'Informe o e-mail para redefinir sua senha'}
      </Text>
      {!sent && (
        <>
          <Field placeholder="Seu e-mail" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <Button label="Enviar" disabled={!email.trim()} onPress={() => setSent(true)} />
        </>
      )}
      <Button label={sent ? 'Fechar' : 'Cancelar'} variant="outline" onPress={close} style={{ marginTop: 12 }} />
    </ModalCard>
  );
}

const s = StyleSheet.create({
  text: { fontFamily: fonts.body, fontSize: 15, color: colors.black, marginBottom: 24 },
});
