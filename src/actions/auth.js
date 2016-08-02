import 'isomorphic-fetch';

import { ID_TOKEN,
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
  /******  Uncomment the following rest call if you have a real backend server **************/
  // const config = {
  //   method: 'post',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     user,
  //     password,
  //   }),
  // };

  // return callApi('/api/login', config, loginRequest(user), loginSuccess, loginFailure);
  /*******************************************************************************************/
  
  /******  After porting to create-react-app, the backend server was removed, *****************/
  /******  So instead we will call the mockup API on the client side.          ****************/
  return callMockupLoginApi(user, password, loginRequest(user), loginSuccess, loginFailure);
}

function callMockupLoginApi(user, password, request, onRequestSuccess, onRequestFailure) {
  return dispatch => {
    dispatch(request);

    window.setTimeout(() => {
      if (user==='admin' && password==='password') {
        // this id_token would have been generated on the server side.
        const payload = {
          "id_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE0NzAwOTQ3MDEsImV4cCI6MTQ3MDA5NTAwMX0.7dXzsGZXDISFShKK9E_Al6AF3aInnWoYh1C8DaWJsk0"
        };
        dispatch(onRequestSuccess(payload));
      } else {
        const error = {
          message: 'Bad user/password'
        };
        dispatch(onRequestFailure(error));
      }
    }, 500); // simulate async login
  }
}

function logoutRequest(user) {
  removeIdToken();
  return {
    type: LOGOUT_REQUEST,
    user,
  };
}

function logoutSuccess(payload) {
  removeIdToken();
  return {
    type: LOGOUT_SUCCESS,
    user: payload.user,
  };
}

function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    error,
  };
}

export function logout(user) {
  /****************  Uncomment following if there is a real backend server  ************/
  // const config = {
  //   method: 'post',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     user,
  //   }),
  // };

  // return callApi('/api/logout', config, logoutRequest, logoutSuccess, logoutFailure);
  /*************************************************************************************** */

  /******  After porting to create-react-app, the backend server was removed, *****************/
  /******  So instead we will call the mockup API on the client side.          ****************/
  return callMockupLogoutApi(user, logoutRequest(user), logoutSuccess, logoutFailure);
}

function callMockupLogoutApi(user, request, onRequestSuccess, onRequestFailure) {
  return dispatch => {
    dispatch(request);

    window.setTimeout(() => {
      if (Math.random()>0.1) {
        const payload = {};
        dispatch(onRequestSuccess(payload));
      } else {
        const error = {
          message: 'Unknown server error when logging out'
        };
        dispatch(onRequestFailure(error));
      }
    }, 500); // simulate async logout
  }
}
