import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';

// Import store and navigation
import { store, persistor } from './src/store';
import { RootNavigator } from './src/navigation';
import { COLORS } from './src/constants';

// Loading component for PersistGate
import LoadingScreen from './src/screens/LoadingScreen';

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        console.log('App: Preparing app resources');
        
        // Artificially delay for 2 seconds to give time for assets to load
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn('Error loading app resources:', e);
      } finally {
        // Tell the application to render
        await SplashScreen.hideAsync();
        console.log('App: Splash screen hidden, showing app');
      }
    }

    prepare();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#ffcb05' }}>
      <Provider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <SafeAreaProvider style={{ backgroundColor: '#ffcb05' }}>
            <PaperProvider>
              <StatusBar style="light" backgroundColor="#ffcb05" />
              <RootNavigator />
            </PaperProvider>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
