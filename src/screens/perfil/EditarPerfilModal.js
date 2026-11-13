// src/screens/perfil/EditarPerfilModal.js
// Modal "Editar": altera telefone, e-mail e senha da conta.
import { useEffect, useState } from 'react';
import ModalCard from '../../components/ModalCard';
import Field from '../../components/Field';
import Button from '../../components/Button';

export default function EditarPerfilModal({ visible, user, onSave, onClose }) {
  const [draft, setDraft] = useState({ phone: '', email: '', password: '' });

  useEffect(() => {
    if (visible) setDraft({ phone: user.phone, email: user.email, password: user.password });
  }, [visible]);

  const set = (key) => (value) => setDraft((d) => ({ ...d, [key]: value }));

  return (
    <ModalCard visible={visible} onClose={onClose} icon="pencil-outline" title="Editar">
      <Field label="Telefone" value={draft.phone} onChangeText={set('phone')} keyboardType="phone-pad" />
      <Field label="E-mail" value={draft.email} onChangeText={set('email')} keyboardType="email-address" />
      <Field label="Senha" secure value={draft.password} onChangeText={set('password')} />
      <Button label="Salvar" onPress={() => onSave(draft)} style={{ marginTop: 8 }} />
      <Button label="Cancelar" variant="outline" onPress={onClose} style={{ marginTop: 12 }} />
    </ModalCard>
  );
}
