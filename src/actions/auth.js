import 'isomorphic-fetch';
import {checkStatus, parseJSON} from './utils';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function loginRequest(user) {
  return {
    type: LOGIN_REQUEST,
    user: user
  };
}

function loginSuccess(user, payload) {
  return {
    type: LOGIN_SUCCESS,
    user: payload.user,
    role: payload.role
  };
}

function loginFailure(user, error) {
  return {
    type: LOGIN_FAILURE,
    user: user,
    error: error
  };
}

export function login(user, password) {
  return dispatch => {
    dispatch(loginRequest(user));

    return fetch('/api/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: user,
        password: password,
      })
    }).then(checkStatus)
      .then(parseJSON)
      .then(json => dispatch(loginSuccess(user, json)))
      .catch((error) => {
        const response = error.response;
        if (response === undefined) {
          dispatch(loginFailure(user, error));
        } else {
          parseJSON(response)
            .then( (json) => {
              error.status = response.status;
              error.statusText = response.statusText;
              error.message = json.message;
              dispatch(loginFailure(user, error));
            });
        }
      });
  };
}

function logoutRequest(user) {
  return {
    type: LOGOUT_REQUEST,
    user
  };
}

function logoutSuccess(user, payload) {
  return {
    type: LOGOUT_SUCCESS,
    user,
    payload
  };
}

function logoutFailure(user, error) {
  return {
    type: LOGOUT_FAILURE,
    user,
    error
  };
}

export function logout(user) {
  return dispatch => {
    dispatch(logoutRequest(user));

    return fetch('/api/logout', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: user
      })
    }).then(checkStatus)
      .then(parseJSON)
      .then(json => dispatch(logoutSuccess(user, json)))
      .catch((error) => {
        const response = error.response;
        if (response === undefined) {
          dispatch(logoutFailure(user, error));
        } else {
          parseJSON(response)
            .then((json) => {
              error.status = response.status;
              error.statusText = response.statusText;
              error.message = json.message;
              dispatch(logout(user, error));
            });
        }
      });
  };
}
