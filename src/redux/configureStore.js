import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import test from './modules/test'

const loggerMiddleware = createLogger(); // initialize logger

const createStoreWithMiddleware = applyMiddleware(loggerMiddleware)(createStore); // apply logger to redux

const reducer = combineReducers({
  test,
  //
});

const configureStore = initialState => createStoreWithMiddleware(reducer, initialState);
export default configureStore;
