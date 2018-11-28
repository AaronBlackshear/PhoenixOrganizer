import { createStore, applyMiddleware, combineReducers } from 'redux'

import promiseMiddleware from 'redux-promise-middleware'

import userReducer from './reducers/userReducer'
import calendarReducer from './reducers/calendarReducer'

// export default store;
export default
  createStore(
    combineReducers({ userReducer, calendarReducer }), applyMiddleware(promiseMiddleware())
  );
