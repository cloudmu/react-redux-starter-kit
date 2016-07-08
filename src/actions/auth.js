import 'isomorphic-fetch';
import { ID_TOKEN,
        callApi,
        setIdToken,
        removeIdToken,
        decodeUserProfile } from '../utils/utils';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function loginRequest(user) {
  return {
    type: LOGIN_REQUEST,
    user,
  };
}

function loginSuccess(payload) {
  const idToken = payload[ID_TOKEN];
  setIdToken(idToken);
  const profile = decodeUserProfile(idToken);
  return {
    type: LOGIN_SUCCESS,
    user: profile.user,
    role: profile.role,
  };
}

function loginFailure(error) {
  removeIdToken();
  return {
    type: LOGIN_FAILURE,
    error,
  };
}

export function login(user, password) {
  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user,
      password,
    }),
  };

  return callApi('/api/login', config, loginRequest(user), loginSuccess, loginFailure);
}

function logoutRequest(user) {
  removeIdToken();
  return {
    type: LOGOUT_REQUEST,
    user,
  };
}

function logoutSuccess(user) {
  removeIdToken();
  return {
    type: LOGOUT_SUCCESS,
    user,
  };
}

function logoutFailure(user, error) {
  return {
    type: LOGOUT_FAILURE,
    user,
    error,
  };
}

export function logout(user) {
  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user,
    }),
  };

  return callApi('/api/logout', config, logoutRequest, logoutSuccess, logoutSuccess);
}
