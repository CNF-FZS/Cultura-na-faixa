// src/navigation/TabNavigator.js
// Barra de abas inferior: Explorar, Busca, Favoritos e Perfil.
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';
import MenuScreen from '../screens/menu/MenuScreen';
import BuscaScreen from '../screens/busca/BuscaScreen';
import FavoritosScreen from '../screens/favoritos/FavoritosScreen';
import PerfilScreen from '../screens/perfil/PerfilScreen';

const Tab = createBottomTabNavigator();

const ICONS = {
  Explorar: 'home',
  Busca: 'search-outline',
  Favoritos: 'heart',
  Perfil: 'person',
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.purple,
        tabBarInactiveTintColor: colors.black,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.green,
        },
        tabBarIcon: ({ color }) => <Ionicons name={ICONS[route.name]} size={26} color={color} />,
        tabBarLabel: ({ focused, color }) => (
          <Text style={{ fontFamily: focused ? fonts.bold : fonts.body, fontSize: 12, color }}>
            {route.name}
          </Text>
        ),
      })}
    >
      <Tab.Screen name="Explorar" component={MenuScreen} />
      <Tab.Screen name="Busca" component={BuscaScreen} />
      <Tab.Screen name="Favoritos" component={FavoritosScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
