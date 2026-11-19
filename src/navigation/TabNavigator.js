// src/navigation/TabNavigator.js
// Barra de abas inferior: Início, Busca, Favoritos e Perfil.
/*import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';
import MenuScreen from '../screens/menu/MenuScreen';
import BuscaScreen from '../screens/busca/BuscaScreen';
import FavoritosScreen from '../screens/favoritos/FavoritosScreen';
import PerfilStack from './PerfilStack';

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
        tabBarLabel: ({ focused, color, children }) => (
          <Text style={{ fontFamily: focused ? fonts.bold : fonts.body, fontSize: 12, color }}>
            {children}
          </Text>
        ),
      })}
    >
      { adicionar o title: inicio para não desaparecer o icone /}
      <Tab.Screen name="Explorar" component={MenuScreen} options={{ title: 'Início' }} />
      <Tab.Screen name="Busca" component={BuscaScreen} />
      <Tab.Screen name="Favoritos" component={FavoritosScreen} />
      <Tab.Screen name="Perfil" component={PerfilStack} />
    </Tab.Navigator>
  );
}*/


import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '../theme';
import MenuScreen from '../screens/menu/MenuScreen';
import BuscaScreen from '../screens/busca/BuscaScreen';
import FavoritosScreen from '../screens/favoritos/FavoritosScreen';
import PerfilStack from './PerfilStack';

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

        tabBarIcon: ({ color }) => (
          <Ionicons
            name={ICONS[route.name]}
            size={26}
            color={color}
          />
        ),

        tabBarLabel: ({ focused, color, children }) => (
          <Text
            style={{
              fontFamily: focused ? fonts.bold : fonts.body,
              fontSize: 12,
              color,
            }}
          >
            {children}
          </Text>
        ),
      })}
    >
      <Tab.Screen
        name="Explorar"
        component={MenuScreen}
        options={{ title: 'Início' }}
      />

      <Tab.Screen
        name="Busca"
        component={BuscaScreen}
      />

      <Tab.Screen
        name="Favoritos"
        component={FavoritosScreen}
      />

      <Tab.Screen
        name="Perfil"
        component={PerfilStack}
      />
    </Tab.Navigator>
  );
}
