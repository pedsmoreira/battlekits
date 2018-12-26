import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';

// Marker - from './modules/

const loggerMiddleware = createLogger(); // initialize logger

const createStoreWithMiddleware = applyMiddleware(loggerMiddleware)(createStore); // apply logger to redux

const reducer = combineReducers({
  // Marker - Reducers will to here
});

const configureStore = initialState => createStoreWithMiddleware(reducer, initialState);
export default configureStore;
