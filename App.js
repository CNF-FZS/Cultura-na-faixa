// App.js
// Ponto de entrada: carrega as fontes e monta os provedores (login, favoritos) e a navegação.
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useFonts, Lato_400Regular, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato';
import { colors } from './src/theme';
import { AuthProvider } from './src/context/AuthContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { EventsProvider } from './src/context/EventsContext';
import RootNavigator from './src/navigation/RootNavigator';

const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: colors.white } };

export default function App() {
  const [loaded, error] = useFonts({ Lato_400Regular, Lato_700Bold, Lato_900Black });
  if (error) console.error('Erro ao carregar fontes:', error);
  if (!loaded && !error) return null;

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <EventsProvider>
          <FavoritesProvider>
            <NavigationContainer theme={theme}>
              <StatusBar style="dark" />
              <RootNavigator />
            </NavigationContainer>
          </FavoritesProvider>
        </EventsProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
