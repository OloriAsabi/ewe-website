import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Store from './store/store';
// import { colors, breakpoints, typography } from './theme';
import { setLanguage } from './api/languageSlice';

// Initialize your Redux store and dispatch actions here, if needed.
Store.store.dispatch(setLanguage('yo'));

const container = document.getElementById('root')!; 
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={Store.store}>
      <PersistGate loading={null} persistor={Store.persistor}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
