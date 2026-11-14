// src/hooks/useRequireLogin.js
// Uso: requireLogin(() => ação). Se for visitante, abre o Login em vez de executar a ação.
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function useRequireLogin() {
  const { user } = useAuth();
  const navigation = useNavigation();
  return (action) => (user ? action() : navigation.navigate('Login'));
}
