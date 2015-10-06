import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import auth from '../reducers/auth';
import {selectedUsersPage, usersByPage} from '../reducers/users';
import {selectedReposPage, reposByPage, repoTableSize} from '../reducers/repos';

const reducer = combineReducers(
  {
    auth, 
  	selectedUsersPage, 
  	usersByPage,
  	selectedReposPage, 
  	reposByPage,
    repoTableSize,
  }
);

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);

/**
 * Creates a preconfigured store for this example.
 */
export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}