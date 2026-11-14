// src/navigation/RootNavigator.js
// Telas principais. O app abre nas abas (visitante pode navegar); Login, Cadastro e formulários abrem por cima.
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import LoginScreen from '../screens/login/LoginScreen';
import CadastroScreen from '../screens/cadastro/CadastroScreen';
import DetalhesScreen from '../screens/detalhes/DetalhesScreen';
import EventoFormScreen from '../screens/expositor/EventoFormScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="Detalhes" component={DetalhesScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      <Stack.Screen name="AdicionarEvento" component={EventoFormScreen} />
      <Stack.Screen name="EditarEvento" component={EventoFormScreen} />
    </Stack.Navigator>
  );
}
