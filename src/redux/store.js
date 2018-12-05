import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './reducers/userReducer'
import calendarReducer from './reducers/calendarReducer'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  userReducer,
  calendarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(promiseMiddleware()));
export const persistor = persistStore(store);
