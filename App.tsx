import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import { Platform } from 'react-native';

function App() {
  return (
    <Provider store={store}>
      {Platform.OS === 'web' ? (
        <div style={{ height: '100vh', width: '100vw' }}>
          <AppNavigator />
        </div>
      ) : (
        <AppNavigator />
      )}
    </Provider>
  );
}

export default App;
