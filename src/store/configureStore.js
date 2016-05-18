import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import auth from '../reducers/auth';
import { selectedUsersPage, usersByPage } from '../reducers/users';
import { selectedReposPage, reposByPage, repoTableSize } from '../reducers/repos';

const logger = createLogger();
const rootReducer = combineReducers(
  {
    auth,
    selectedUsersPage,
    usersByPage,
    selectedReposPage,
    reposByPage,
    repoTableSize,
    
    routing: routerReducer
  }
);

const initialState = {};

export default function configureStore() {
  let store;
  
  if(module.hot){
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware, logger),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
  }else{
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware), f=>f
    ));
  }
  
  return store;
}