// src/navigation/RootNavigator.js
// Navegação principal: sem login mostra só o Login; com login mostra as abas e as telas que abrem por cima delas.
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import TabNavigator from './TabNavigator';
import LoginScreen from '../screens/login/LoginScreen';
import EmBreveScreen from '../screens/EmBreveScreen';

const Stack = createNativeStackNavigator();

// As telas "EmBreve" são provisórias; cada uma será trocada pela tela real.
export default function RootNavigator() {
  const { user } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen name="AreaEventos" component={EmBreveScreen} />
          <Stack.Screen name="Usuarios" component={EmBreveScreen} />
          <Stack.Screen name="Relatorios" component={EmBreveScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
