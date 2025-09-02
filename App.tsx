import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import store and navigation
import { store, persistor } from './src/store';
import { RootNavigator } from './src/navigation';
import { COLORS } from './src/constants';

// Loading component for PersistGate
import LoadingScreen from './src/screens/LoadingScreen';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <SafeAreaProvider>
            <PaperProvider>
              <StatusBar style="dark" backgroundColor={COLORS.white} />
              <RootNavigator />
            </PaperProvider>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
