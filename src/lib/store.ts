import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cryptoPriceReducer from '@/lib/state/cryptoPrice/cryptoPrice'
import platformReducer from './state/platform/platform'
import showModal from './state/showModal'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  cryptoPrice: cryptoPriceReducer,
  platform: platformReducer,
  showModal
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return (
    configureStore({
      reducer: {persistedReducer},
      devTools: process.env.NODE_ENV !== 'production',
    })
  )
}
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']