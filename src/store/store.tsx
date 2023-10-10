import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ApiCall from '../api/api';
import { userApiSlice } from '../api/userApi';
import { getApiSlice } from '../api/apiGet';
import usersReducer from '../api/userSlice';
import postReducer from '../api/postReducer';
import languageReducer from '../api/languageSlice';
import reverseGeocodeReducer from '../api/locationSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user', 'reverseGeocode'],
};

// Destructure apiSlice and userApiSlice from their respective modules
const { apiSlice } = ApiCall();

const rootReducer = combineReducers({
  user: usersReducer,
  language: languageReducer,
  reverseGeocode: reverseGeocodeReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer, // Add userApiSlice reducer
  [getApiSlice.reducerPath]: getApiSlice.reducer,
  posts: postReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(apiSlice.middleware, userApiSlice.middleware, getApiSlice.middleware),
  devTools: true,
});

let persistor = persistStore(store);

const Store = {
  store,
  persistor,
};

export default Store;
