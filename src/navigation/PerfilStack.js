// Telas que abrem dentro da aba Perfil, mantendo a barra de abas visível (Área de Eventos, Usuários, Relatórios).
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PerfilScreen from '../screens/perfil/PerfilScreen';
import EventosScreen from '../screens/expositor/EventosScreen';
import UsuariosScreen from '../screens/admin/UsuariosScreen';
import RelatoriosScreen from '../screens/admin/RelatoriosScreen';

const Stack = createNativeStackNavigator();

export default function PerfilStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PerfilHome" component={PerfilScreen} />
      <Stack.Screen name="AreaEventos" component={EventosScreen} />
      <Stack.Screen name="Usuarios" component={UsuariosScreen} />
      <Stack.Screen name="Relatorios" component={RelatoriosScreen} />
    </Stack.Navigator>
  );
}
